#!/usr/bin/env node
// 用 Chrome 调试协议给页面截图：精确设视口，按真实时间等动画跑完再截。只用 Node 自带的 fetch / WebSocket（Node ≥ 22），不装包。
//
//   node tools/snap.mjs                         截全部参考页 → gallery/shots/<id>.png
//   node tools/snap.mjs lineart riso            只截这几个
//   node tools/snap.mjs --url http://… out.png  截任意网址
//   node tools/snap.mjs --file path/x.html out.png   截本地页面（自动起服务）
// 选项：--w 390 --h 844 --wait 7000 --scale 2
//       --click "选择器"   截图前先点一下（可写多次，按顺序点，每次之后再等 1.2 秒）
//       --eval "seek(3.5)" 截图前先执行一段 JS（可写多次；出错就不存图、退出码 1）
//       --frames "1,4,7.5"  视频页：依次 seek(t) 各截一张，存成 out-1.png、out-4.png…（同一个 Chrome，快）
//       --video out.mp4     视频页：按 --fps（默认 24）逐帧 seek 截图，再用 ffmpeg 合成 MP4；时长取 window.VIDEO.duration 或 --dur
//
// 找不到 Chrome 时设环境变量 CHROME=/path/to/chrome。
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readdirSync, mkdtempSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve, extname, basename } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GAL = join(ROOT, "gallery");
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const clicks = []; for (let i; (i = args.indexOf("--click")) >= 0;) { clicks.push(args[i + 1]); args.splice(i, 2); }
const evals = []; for (let i; (i = args.indexOf("--eval")) >= 0;) { evals.push(args[i + 1]); args.splice(i, 2); }
const framesArg = (() => { const i = args.indexOf("--frames"); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v.split(",").map(Number); })();
let failed = false;
const videoOut = (() => { const i = args.indexOf("--video"); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return resolve(v); })();
const W = +opt("--w", 390), H = +opt("--h", 844), WAIT = +opt("--wait", 7000), SCALE = +opt("--scale", 2);
const urlArg = opt("--url", null), fileArg = opt("--file", null);
const VFPS = +opt("--fps", 24), VDUR = +opt("--dur", 0);

const CHROMES = [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
const chrome = CHROMES.find((p) => existsSync(p));
if (!chrome) { console.error("找不到 Chrome，设 CHROME=/path/to/chrome"); process.exit(1); }

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2" };
function serve(dir) {
  return new Promise((ok) => {
    const s = createServer(async (req, res) => {
      let p = join(dir, decodeURIComponent(new URL(req.url, "http://x").pathname)), body;
      if (p.endsWith("/")) p += "index.html";
      try { body = await readFile(p); } catch { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { "content-type": MIME[extname(p)] || "application/octet-stream" }); res.end(body);
    });
    s.listen(0, "127.0.0.1", () => ok(s));
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let jobs = [];
  let srv = null;
  if (urlArg) jobs.push({ url: urlArg, out: resolve(args[0] || "shot.png") });
  else if (fileArg && videoOut) { srv = await serve(dirname(resolve(fileArg))); jobs.push({ url: `http://127.0.0.1:${srv.address().port}/${basename(fileArg)}`, out: videoOut }); }
  else if (fileArg) { srv = await serve(dirname(resolve(fileArg))); jobs.push({ url: `http://127.0.0.1:${srv.address().port}/${basename(fileArg)}`, out: resolve(args[0] || "shot.png") }); }
  else {
    srv = await serve(GAL); mkdirSync(join(GAL, "shots"), { recursive: true });
    const ids = args.length ? args : readdirSync(GAL).filter((f) => /^s-.*\.html$/.test(f)).map((f) => f.slice(2, -5));
    jobs = ids.map((id) => ({ url: `http://127.0.0.1:${srv.address().port}/s-${id}.html`, out: join(GAL, "shots", `${id}.png`) }));
  }
  const prof = mkdtempSync(join(tmpdir(), "snap-"));
  const port = 9300 + Math.floor(Math.random() * 500);
  let ws = null;
  const proc = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "--no-first-run", "--hide-scrollbars", "--mute-audio", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows", "about:blank"], { stdio: "ignore" });
  try {
  let ver; for (let i = 0; i < 60 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(150); } }
  if (!ver) throw new Error("Chrome 没起来");
  ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
  // 每个请求 30 秒超时，卡住就报错退出（finally 里会收拾 Chrome 和服务）
  const send = (method, params = {}, sessionId) => new Promise((r, j) => {
    const i = ++id, t = setTimeout(() => { pend.delete(i); j(new Error(`${method} 超时`)); }, 30000);
    pend.set(i, (d) => { clearTimeout(t); r(d); });
    ws.send(JSON.stringify({ id: i, method, params, sessionId }));
  });

  // 同时开 4 个标签页，各自按真实时间等
  const run = async (job) => {
    const { result: { targetId } } = await send("Target.createTarget", { url: "about:blank" });
    const { result: { sessionId: s } } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, s);
    await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: SCALE, mobile: false }, s);
    await send("Emulation.setFocusEmulationEnabled", { enabled: true }, s);
    await send("Page.navigate", { url: job.url }, s);
    await sleep(WAIT);
    const evalOk = async (ex) => {
      const r = await send("Runtime.evaluate", { expression: ex, awaitPromise: true }, s);
      const e = r.result?.exceptionDetails;
      if (e) { console.log("✗ 执行出错：", ex, "→", e.exception?.description || e.text); failed = true; return false; }
      await sleep(300); return true;
    };
    let ok = true;
    for (const ex of evals) ok = ok && (await evalOk(ex));
    if (!ok) { await send("Target.closeTarget", { targetId }); return; }
    if (videoOut) {
      const meta = (await send("Runtime.evaluate", { expression: "JSON.stringify(window.VIDEO || null)", returnByValue: true }, s)).result?.result?.value;
      const dur = VDUR || JSON.parse(meta || "null")?.duration;
      if (!dur) { console.log("✗ 不知道时长：页面没有 window.VIDEO.duration，加 --dur 秒数"); failed = true; return; }
      const dir = mkdtempSync(join(tmpdir(), "frames-")), n = Math.round(dur * VFPS);
      for (let i = 0; i < n; i++) {
        const r = await send("Runtime.evaluate", { expression: `seek(${(i / VFPS).toFixed(5)})`, awaitPromise: true }, s);
        if (r.result?.exceptionDetails) { console.log("✗ seek 出错，第", i, "帧"); failed = true; break; }
        const { result } = await send("Page.captureScreenshot", { format: "jpeg", quality: 92 }, s);
        writeFileSync(join(dir, `f${String(i).padStart(5, "0")}.jpg`), Buffer.from(result.data, "base64"));
        if (i % VFPS === 0) process.stdout.write(`\r  第 ${i}/${n} 帧`);
      }
      process.stdout.write("\n");
      await new Promise((ok, bad) => {
        const ff = spawn("ffmpeg", ["-loglevel", "error", "-y", "-framerate", String(VFPS), "-i", join(dir, "f%05d.jpg"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", job.out], { stdio: "inherit" });
        ff.on("error", () => bad(new Error("没找到 ffmpeg")));
        ff.on("exit", (c) => (c === 0 ? ok() : bad(new Error("ffmpeg 失败"))));
      });
      rmSync(dir, { recursive: true, force: true });
      console.log("✓", job.out);
      await send("Target.closeTarget", { targetId }); return;
    }
    if (framesArg) {
      for (const t of framesArg) {
        if (!(await evalOk(`seek(${t})`))) break;
        const { result } = await send("Page.captureScreenshot", { format: "png" }, s);
        const out = job.out.replace(/\.png$/, `-${t}.png`);
        writeFileSync(out, Buffer.from(result.data, "base64")); console.log("✓", out);
      }
      await send("Target.closeTarget", { targetId }); return;
    }
    for (const sel of clicks) {
      await send("Runtime.evaluate", { expression: `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (e) e.click(); return !!e; })()` }, s);
      await sleep(1200);
    }
    const { result } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }, s);
    if (result?.data) { writeFileSync(job.out, Buffer.from(result.data, "base64")); console.log("✓", job.out); } else console.log("✗", job.out);
    await send("Target.closeTarget", { targetId });
  };
  const q = [...jobs];
  await Promise.all(Array.from({ length: Math.min(4, q.length) }, async () => { while (q.length) await run(q.shift()); }));
  } finally {
    try { ws?.close(); } catch {}
    srv?.close();
    proc.kill();
    await new Promise((r) => (proc.exitCode !== null ? r() : proc.once("exit", r)));
    try { rmSync(prof, { recursive: true, force: true }); } catch {}
  }
}
main().then(() => process.exit(failed ? 1 : 0)).catch((e) => { console.error(e); process.exit(1); });
