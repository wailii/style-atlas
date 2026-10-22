// 风格引擎：各参考页里可复用的核心画法。依赖 common.js（coverCanvas / lumaOf / hex / rnd / halftoneCanvas / inkCanvas / thresholdCanvas / loadImage）。
// 用法：在 common.js 之后引入，再按需取：const { papercut, inkBloom } = Engines;
// 每个函数的参数和效果见 ENGINES.md。尺寸一律取元素的布局尺寸（offsetWidth / clientWidth），旋转、缩放不影响。
const Engines = (() => {
const NS = "http://www.w3.org/2000/svg";

// ── 缓动 ──
// Manim 的 smooth：两头慢中间快
const smooth = (t) => { const s = 1 - t; return t * t * t * (10 * s * s + 5 * s * t + t * t); };
const smoothLinear = (n = 40) => `linear(${Array.from({ length: n }, (_, i) => smooth(i / (n - 1)).toFixed(4)).join(",")})`;

// 风格专用常量
const BLUE = (r, g, b) => 1 - r / 255;
const PINK = (r, g, b) => (1 - g / 255) * 0.9;
const RAMP = [[48, 63, 160], [24, 160, 220], [40, 190, 140], [240, 200, 40], [230, 70, 50]];
const ramp = (t) => { t = Math.max(0, Math.min(0.999, t)) * (RAMP.length - 1); const i = Math.floor(t), f = t - i, a = RAMP[i], b = RAMP[i + 1]; return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`; };
const COS = Math.cos(Math.PI / 6), SIN = 0.5;
const P = (x, y, z, s, ox, oy) => [ox + (x - y) * COS * s, oy + (x + y) * SIN * s - z * s];
let fid = 0;
function defsEl() {
  let d = document.getElementById("defs") || document.getElementById("sa-defs");
  if (!d) { d = document.createElementNS(NS, "svg"); d.id = "sa-defs"; d.setAttribute("width", 0); d.setAttribute("height", 0); d.style.position = "absolute"; document.body.prepend(d); }
  return d;
}

// ── 弹簧：闭式解 → CSS linear()（极简变形） ──
function springCurve(stiffness = 220, damping = 24, mass = 1) {
  const w0 = Math.sqrt(stiffness / mass), z = damping / (2 * Math.sqrt(stiffness * mass)), wd = w0 * Math.sqrt(Math.max(1e-6, 1 - z * z));
  const f = (t) => 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
  let T = 0.2; while (T < 4 && Math.abs(1 - f(T)) + Math.abs(f(T + 0.01) - f(T)) * 50 > 0.002) T += 0.02;
  const pts = Array.from({ length: 48 }, (_, i) => f((i / 47) * T).toFixed(4)); pts[47] = 1;
  return { easing: `linear(${pts.join(",")})`, ms: Math.round(T * 1000) };
}

// ── 手画线：三版轮换 + 一笔笔画出（线稿，需要 rough.js） ──
function sketchy(svg, make, { delay = 0, dur = 700, boil = true } = {}) {
  const rc = rough.svg(svg), g = document.createElementNS(NS, "g");
  g.classList.add("rs");
  for (let k = 0; k < (boil ? 3 : 1); k++) { const n = make(rc, 7 + k * 31); n.classList.add("v" + k); g.appendChild(n); }
  svg.appendChild(g);
  const ps = [...g.querySelectorAll(".v0 path")];
  ps.forEach((p) => { const L = p.getTotalLength() + 2; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
  setTimeout(() => {
    ps.forEach((p, i) => { p.style.transition = `stroke-dashoffset ${dur / ps.length * 1.6}ms ease-in-out ${(i * dur) / ps.length / 1.4}ms`; p.style.strokeDashoffset = 0; });
    setTimeout(() => { ps.forEach((p) => { p.style.strokeDasharray = ""; p.style.transition = ""; }); g.classList.add("live"); }, dur * 1.25 + 60);
  }, delay);
  return g;
}

// ── 撕边纸片 + 网点照片（纸拼贴） ──
function tornPoly(w, h, amp = 2.4, step = 5, seed = 1, edges = [1, 1, 1, 1]) {
  const pts = []; let k = seed * 13;
  const j = (on) => (on ? rnd(k++) * amp : 0);
  for (let x = 0; x <= w; x += step) pts.push([x, j(edges[0])]);
  for (let y = 0; y <= h; y += step) pts.push([w - j(edges[1]), y]);
  for (let x = w; x >= 0; x -= step) pts.push([x, h - j(edges[2])]);
  for (let y = h; y >= 0; y -= step) pts.push([j(edges[3]), y]);
  return pts;
}
function tear(el, amp, seed, edges, step = 5) {
  const w = el.offsetWidth, h = el.offsetHeight;
  el.style.clipPath = `polygon(${tornPoly(w, h, amp, step, seed, edges).map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(",")})`;
}
function halftoneCutout(cv, img, { cell = 5.2, rim = 7, seed = 3, scale = 2, gamma = 0.9, from = 0.06, to = 0.95, rimAmp = 3, innerAmp = 1.6 } = {}) {
  const S = scale, W = Math.round(cv.offsetWidth), H = Math.round(cv.offsetHeight);
  cv.width = W * S; cv.height = H * S;
  const x = cv.getContext("2d"); x.scale(S, S);
  const path = (pts) => { x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath(); };
  path(tornPoly(W, H, rimAmp, 4, seed)); x.fillStyle = "#fbf8f0"; x.fill();
  x.save();
  path(tornPoly(W - rim * 2, H - rim * 2, innerAmp, 4, seed + 5).map(([a, b]) => [a + rim, b + rim])); x.clip();
  x.fillStyle = "#efe8d8"; x.fillRect(0, 0, W, H);
  const ht = halftoneCanvas(img, W, H, { cell, angle: 45, ink: "#15120e", scale: S, gamma, from, to });
  x.drawImage(ht, 0, 0, W, H);
  x.restore();
}

// ── 孔版双色分版（孔版印刷） ──
function risoPlate(img, w, h, chan, { cell = 4.6, angle = 15, ink, scale = 2, gamma = 1 }) {
  const src = coverCanvas(img, w, h), d = src.getContext("2d").getImageData(0, 0, w, h).data;
  const out = document.createElement("canvas"); out.width = w * scale; out.height = h * scale;
  const x = out.getContext("2d"); x.scale(scale, scale); x.fillStyle = ink;
  const a = (angle * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a), R = Math.hypot(w, h);
  for (let v = -R; v < R; v += cell) for (let u = -R; u < R; u += cell) {
    const px = w / 2 + u * ca - v * sa, py = h / 2 + u * sa + v * ca;
    if (px < -cell || py < -cell || px > w + cell || py > h + cell) continue;
    const i = ((Math.min(h - 1, Math.max(0, py | 0))) * w + Math.min(w - 1, Math.max(0, px | 0))) * 4;
    const dens = Math.pow(Math.max(0, Math.min(1, chan(d[i], d[i + 1], d[i + 2]))), gamma);
    const r = (cell / 2) * Math.sqrt(dens) * 1.2;
    if (r < 0.3) continue;
    x.beginPath(); x.arc(px, py, r, 0, 7); x.fill();
  }
  return out;
}
async function riso(box, src, cell) {
  const img = await loadImage(src), w = Math.round(box.clientWidth), h = Math.round(box.clientHeight);
  const b = risoPlate(img, w, h, BLUE, { cell, angle: 15, ink: "#0078bf", gamma: 1.1 });
  const p = risoPlate(img, w, h, PINK, { cell, angle: 75, ink: "#ff48b0", gamma: 1.1 });
  b.className = "B"; p.className = "P";
  box.append(b, p);
}

// ── 程序剪窗花（窗花剪纸） ──
function papercut(size, seed = 1, { folds = 8, rim = true, color = "#d2231e" } = {}) {
  const c = document.createElement("canvas"); c.width = c.height = size; const x = c.getContext("2d");
  const R = size / 2, cx = R, cy = R, A = Math.PI / folds;
  x.fillStyle = color; x.beginPath(); x.arc(cx, cy, R * 0.98, 0, 7); x.fill();
  const cut = document.createElement("canvas"); cut.width = cut.height = size; const k = cut.getContext("2d");
  k.translate(cx, cy); k.beginPath(); k.moveTo(0, 0); k.arc(0, 0, R, 0, A); k.closePath(); k.clip(); k.fillStyle = "#000";
  const r = (i) => rnd(seed * 97 + i);
  // 一圈圈往外：月牙、小圆、水滴、锯齿
  let i = 0;
  for (let ring = 0.16; ring < 0.9; ring += 0.12 + r(i++) * 0.05) {
    const t = r(i++), rr = R * ring, a = A * (0.35 + r(i++) * 0.4), px = Math.cos(a) * rr, py = Math.sin(a) * rr, s = R * (0.035 + r(i++) * 0.04);
    if (t < 0.3) { k.beginPath(); k.arc(px, py, s * 1.3, 0, 7); k.fill(); k.globalCompositeOperation = "destination-out"; k.beginPath(); k.arc(px + s * 0.7, py, s * 1.2, 0, 7); k.fill(); k.globalCompositeOperation = "source-over"; }
    else if (t < 0.55) { k.beginPath(); k.arc(px, py, s, 0, 7); k.fill(); }
    else if (t < 0.8) { k.save(); k.translate(px, py); k.rotate(a); k.beginPath(); k.moveTo(-s * 2, 0); k.quadraticCurveTo(0, -s * 1.3, s * 1.6, 0); k.quadraticCurveTo(0, s * 1.3, -s * 2, 0); k.fill(); k.restore(); }
    else { k.save(); k.rotate(0); k.beginPath(); const n = 5; for (let j = 0; j <= n; j++) { const aa = (A * j) / n, r1 = rr + (j % 2 ? s * 1.4 : 0); j ? k.lineTo(Math.cos(aa) * r1, Math.sin(aa) * r1) : k.moveTo(Math.cos(aa) * r1, Math.sin(aa) * r1); } for (let j = n; j >= 0; j--) { const aa = (A * j) / n; k.lineTo(Math.cos(aa) * (rr - s * 0.6), Math.sin(aa) * (rr - s * 0.6)); } k.fill(); k.restore(); }
    // 扇区边上细缝，展开后连成放射线
    k.fillRect(rr - s * 0.3, -0.8, s * 1.6, 1.6);
  }
  if (rim) for (let j = 0; j < 3; j++) { const aa = (A * (j + 0.5)) / 3; k.beginPath(); k.arc(Math.cos(aa) * R * 0.99, Math.sin(aa) * R * 0.99, R * 0.06, 0, 7); k.fill(); }
  x.globalCompositeOperation = "destination-out";
  for (let f = 0; f < folds; f++) for (const m of [1, -1]) { x.save(); x.translate(cx, cy); x.rotate(f * 2 * A); x.scale(1, m); x.drawImage(cut, -cx, -cy); x.restore(); }
  x.globalCompositeOperation = "source-over";
  return c;
}
function cornerCut(size) {
  const c = papercut(size * 2, 7, { folds: 6 }), o = document.createElement("canvas"); o.width = o.height = size;
  o.getContext("2d").drawImage(c, -size, -size); return o;
}

// ── 玻璃折射（液态玻璃，Chromium） ──
function glassFilter(w, h, { r = 24, bezel = 18, lens = false, scale = 38 } = {}) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const x = c.getContext("2d"), id = x.createImageData(w, h);
  for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
    let dx = 0, dy = 0;
    if (lens) { const ux = (px - w / 2) / (w / 2), uy = (py - h / 2) / (h / 2), d = Math.hypot(ux, uy); if (d < 1) { const k = Math.pow(d, 1.6) * 0.9; dx = -ux * k; dy = -uy * k; } }
    else {
      const cx = Math.min(Math.max(px, r), w - r), cy = Math.min(Math.max(py, r), h - r);
      const vx = px - cx, vy = py - cy, inner = Math.hypot(vx, vy);
      const edge = r - inner, ex = Math.min(px, w - px), ey = Math.min(py, h - py), dist = inner > 0 ? edge : Math.min(ex, ey);
      if (dist < bezel && dist >= 0) {
        const k = Math.pow(1 - dist / bezel, 2);
        let nx, ny; if (inner > 0) { nx = vx / inner; ny = vy / inner; } else if (ex < ey) { nx = px < w / 2 ? -1 : 1; ny = 0; } else { nx = 0; ny = py < h / 2 ? -1 : 1; }
        dx = nx * k; dy = ny * k;
      }
    }
    const i = (py * w + px) * 4; id.data[i] = 128 + dx * 127; id.data[i + 1] = 128 + dy * 127; id.data[i + 2] = 128; id.data[i + 3] = 255;
  }
  x.putImageData(id, 0, 0);
  const name = "g" + fid++;
  defsEl().insertAdjacentHTML("beforeend", `<filter id="${name}" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feImage href="${c.toDataURL()}" x="0" y="0" width="${w}" height="${h}" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="${scale}" xChannelSelector="R" yChannelSelector="G"/></filter>`);
  return name;
}
function makeGlass(el, opts = {}) {
  const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
  const n = glassFilter(w, h, { r: opts.r ?? Math.min(parseFloat(getComputedStyle(el).borderRadius) || 24, h / 2), ...opts });
  el.style.setProperty("--bf", `url(#${n}) blur(${opts.blur ?? 5}px) saturate(1.7)`);
}

// ── 点云（点云测绘） ──
function cloudFrom(img, cols, rows) {
  const c = coverCanvas(img, cols, rows), L = lumaOf(c), pts = [];
  let lo = 1, hi = 0; for (const v of L) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const z = 1 - (L[y * cols + x] - lo) / Math.max(0.05, hi - lo);
    pts.push({ x: x / (cols - 1) - 0.5, y: y / (rows - 1) - 0.5, z, col: ramp(z) });
  }
  return pts;
}
function cloudFromPath(d, n = 40) {
  const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d");
  x.fillStyle = "#fff"; x.fillRect(0, 0, 64, 64); x.strokeStyle = "#000"; x.lineWidth = 7; x.lineCap = "round"; x.lineJoin = "round"; x.filter = "blur(2px)"; x.stroke(new Path2D(d));
  return cloudFrom(c, n, n);
}
function renderCloud(ctx, W, H, pts, { yaw, pitch = 1.0, scale, zs = 0.35, reveal = 1, size = 1.3 }) {
  ctx.clearRect(0, 0, W, H);
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), out = [];
  for (const p of pts) {
    if (p.x + 0.5 > reveal) continue;
    const X = p.x * scale, Y = p.y * scale * 0.62, Z = p.z * scale * zs;
    const x1 = X * cy - Y * sy, y1 = X * sy + Y * cy;
    const sx = W / 2 + x1, syy = H * 0.58 + y1 * cp - Z * sp * 1.1;
    out.push([sx, syy, y1, p.col]);
  }
  out.sort((a, b) => a[2] - b[2]);
  for (const [x, y, , col] of out) { ctx.fillStyle = col; ctx.fillRect(x, y, size, size); }
  return out;
}

// ── 水墨晕开、笔触、圆相（水墨） ──
function inkBloom(cv, img, { cx = 0.5, cy = 0.45, dur = 2200, delay = 0, feather = 0.18, round = false } = {}) {
  const S = 2, W = Math.round(cv.offsetWidth * S), H = Math.round(cv.offsetHeight * S);
  cv.width = W; cv.height = H;
  const ink = inkCanvas(img, W, H, { levels: 5, blur: 3, soft: 3 }), x = cv.getContext("2d");
  const edge = document.createElement("canvas"); edge.width = W; edge.height = H; const e = edge.getContext("2d");
  const t0 = performance.now() + delay, R = Math.hypot(W, H) * 0.62, seed = Math.random() * 10;
  (function frame(now) {
    const t = Math.min(1, Math.max(0, (now - t0) / dur)), k = 1 - Math.pow(1 - t, 2.4);
    e.clearRect(0, 0, W, H);
    const g = e.createRadialGradient(W * cx, H * cy, 0, W * cx, H * cy, R * k + 1);
    g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(Math.max(0, 1 - feather - 0.02), "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)");
    e.fillStyle = g; e.beginPath();
    for (let i = 0; i <= 72; i++) { const a = (i / 72) * Math.PI * 2, n = 1 + 0.12 * Math.sin(a * 5 + seed) + 0.07 * Math.sin(a * 11 + seed * 2); const rr = R * k * n; i ? e.lineTo(W * cx + Math.cos(a) * rr, H * cy + Math.sin(a) * rr) : e.moveTo(W * cx + Math.cos(a) * rr, H * cy + Math.sin(a) * rr); }
    e.fill();
    // 四周留白：图片本身也做柔边
    e.globalCompositeOperation = "destination-in";
    if (round) {
      e.save(); e.translate(W / 2, H / 2); e.scale(W / H, 1);
      const v = e.createRadialGradient(0, 0, 0, 0, 0, H / 2); v.addColorStop(0, "#000"); v.addColorStop(0.55, "#000"); v.addColorStop(1, "rgba(0,0,0,0)");
      e.fillStyle = v; e.fillRect(-H, -H, H * 2, H * 2); e.restore();
    } else {
      const v = e.createLinearGradient(0, 0, 0, H); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(0.18, "#000"); v.addColorStop(0.78, "#000"); v.addColorStop(1, "rgba(0,0,0,0)");
      e.fillStyle = v; e.fillRect(0, 0, W, H);
    }
    e.globalCompositeOperation = "source-in"; e.drawImage(ink, 0, 0);
    e.globalCompositeOperation = "source-over";
    x.clearRect(0, 0, W, H); x.drawImage(edge, 0, 0);
    if (t < 1) requestAnimationFrame(frame);
  })(performance.now());
}
function brushPath(w, h, { seed = 1, thick = 9, tilt = 0 } = {}) {
  const n = 40, top = [], bot = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, x = 4 + t * (w - 8), y = h / 2 + Math.sin(t * 3.2 + seed) * 2.2 + tilt * (t - 0.5);
    const k = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.15)), 0.55) * (1 - t * 0.35), r = (thick / 2) * k * (0.85 + rnd(seed * 31 + i) * 0.3);
    top.push([x, y - r]); bot.push([x, y + r * 0.8]);
  }
  return "M" + top.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L") + " L" + bot.reverse().map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L") + " Z";
}
function ensoPath(seed = 2) {
  const n = 90, R = 33, cx = 38, cy = 38, outer = [], inner = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = -2.1 + t * Math.PI * 1.86, w = 7 * Math.pow(1 - t, 0.5) * (0.8 + rnd(seed + i) * 0.35) + 0.6;
    const rr = R + Math.sin(t * 5 + seed) * 1.2;
    outer.push([cx + Math.cos(a) * (rr + w / 2), cy + Math.sin(a) * (rr + w / 2)]);
    inner.push([cx + Math.cos(a) * (rr - w / 2), cy + Math.sin(a) * (rr - w / 2)]);
  }
  return "M" + outer.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L") + " L" + inner.reverse().map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L") + " Z";
}

// ── 点阵字、像素图标、精灵（像素） ──
function pxText(text, { size = 12, color = "#2b2b45", scale = 2, maxW = 999, lineH, weight = 600, align = "left" } = {}) {
  const font = `${weight} ${size}px "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif`;
  const m = document.createElement("canvas").getContext("2d"); m.font = font;
  const lines = []; let cur = "";
  for (const ch of text) { if (m.measureText(cur + ch).width > maxW && cur) { lines.push(cur.trim()); cur = ch.trim(); } else cur += ch; }
  if (cur) lines.push(cur.trim());
  lineH = lineH || size + 3;
  const W = Math.ceil(Math.max(...lines.map((l) => m.measureText(l).width))) + 1, H = lines.length * lineH + 1;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d"); x.font = font; x.textBaseline = "top"; x.fillStyle = color;
  lines.forEach((l, i) => x.fillText(l, align === "right" ? W - m.measureText(l).width : 0, i * lineH + 1));
  const id = x.getImageData(0, 0, W, H);
  for (let i = 3; i < id.data.length; i += 4) id.data[i] = id.data[i] > 105 ? 255 : 0;
  x.putImageData(id, 0, 0);
  c.style.width = W * scale + "px"; c.style.height = H * scale + "px";
  return c;
}
function pxIcon(d, { n = 16, color = "#2b2b45", scale = 3, lw = 2.2, vb = 24 } = {}) {
  const c = document.createElement("canvas"); c.width = c.height = n;
  const x = c.getContext("2d"); x.scale(n / vb, n / vb); x.strokeStyle = color; x.lineWidth = lw * (vb / n) * 0.9; x.lineCap = "square"; x.lineJoin = "miter";
  x.stroke(new Path2D(d));
  const id = x.getImageData(0, 0, n, n); for (let i = 3; i < id.data.length; i += 4) id.data[i] = id.data[i] > 90 ? 255 : 0; x.putImageData(id, 0, 0);
  c.style.width = c.style.height = n * scale + "px"; c.className = "icon";
  return c;
}
function sprite(rows, colors, scale = 3) {
  const c = document.createElement("canvas"); c.width = rows[0].length; c.height = rows.length;
  const x = c.getContext("2d");
  rows.forEach((r, y) => [...r].forEach((ch, xx) => { if (colors[ch]) { x.fillStyle = colors[ch]; x.fillRect(xx, y, 1, 1); } }));
  c.style.width = c.width * scale + "px"; c.style.height = c.height * scale + "px";
  return c;
}

// ── 录像带画质（后室录像） ──
function vhs(img, w, h) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  x.filter = "blur(1.2px) saturate(.75) contrast(1.1) brightness(1.08)"; x.drawImage(coverCanvas(img, w, h), 0, 0); x.filter = "none";
  const id = x.getImageData(0, 0, w, h), d = id.data, o = new Uint8ClampedArray(d), sh = Math.max(2, Math.round(w / 140));
  for (let y = 0; y < h; y++) {
    const jit = rnd(y * 0.37) > 0.985 ? Math.round((rnd(y) - 0.5) * 16) : 0;
    for (let xx = 0; xx < w; xx++) {
      const i = (y * w + xx) * 4, xr = Math.min(w - 1, Math.max(0, xx - sh + jit)), xb = Math.min(w - 1, Math.max(0, xx + sh + jit));
      d[i] = o[(y * w + xr) * 4]; d[i + 2] = o[(y * w + xb) * 4 + 2];
      d[i + 1] = o[(y * w + Math.min(w - 1, Math.max(0, xx + jit))) * 4 + 1];
      if (y % 3 === 0) { d[i] *= 0.9; d[i + 1] *= 0.9; d[i + 2] *= 0.9; }
    }
  }
  x.putImageData(id, 0, 0);
  return c;
}

// ── 等距方块（等距积木） ──
function isoCube(x, y, z, s, ox, oy, col) {
  const p = (a, b, c) => P(a, b, c, s, ox, oy).map((v) => v.toFixed(1)).join(",");
  return `<g class="cb"><polygon points="${p(x, y, z + 1)} ${p(x + 1, y, z + 1)} ${p(x + 1, y + 1, z + 1)} ${p(x, y + 1, z + 1)}" fill="${col[0]}"/><polygon points="${p(x, y + 1, z + 1)} ${p(x + 1, y + 1, z + 1)} ${p(x + 1, y + 1, z)} ${p(x, y + 1, z)}" fill="${col[1]}"/><polygon points="${p(x + 1, y, z + 1)} ${p(x + 1, y + 1, z + 1)} ${p(x + 1, y + 1, z)} ${p(x + 1, y, z)}" fill="${col[2]}"/></g>`;
}

// ── 视频（seek）用：每一帧只由帧号决定 ──
// 帧号：t 秒在 fps 下是第几帧（定格类风格用 12）
const frameAt = (t, fps = 12) => Math.max(0, Math.floor(t * fps + 1e-6));
// 落下：第 f0 帧开始，用 dur 帧从偏移位置一格一格落到位（等于 CSS 的 steps(dur)）；返回这一帧的状态
function dropAt(f, f0, { dur = 6, x = 0, y = -40, r = 0, s = 0.14, fadeTo = 0.2 } = {}) {
  const n = f - f0;
  if (n < 0) return { visible: false, tx: 0, ty: 0, rot: 0, scale: 1, opacity: 0, done: false };
  if (n >= dur) return { visible: true, tx: 0, ty: 0, rot: 0, scale: 1, opacity: 1, done: true };
  const p = n / dur;
  return { visible: true, tx: x * (1 - p), ty: y * (1 - p), rot: r * (1 - p), scale: 1 + s * (1 - p), opacity: Math.min(1, p / fadeTo), done: false };
}
// 定格抖动：每 every 帧重摆一次，幅度 amp 像素、rot 度（390 宽设计空间里的值）
const jitterAt = (f, i, { every = 2, amp = 0.45, rot = 0.25 } = {}) => {
  const k = Math.floor(f / every);
  return { tx: (rnd(k * 7 + i) - 0.5) * 2 * amp, ty: (rnd(k * 3 + i * 5) - 0.5) * 2 * amp, rot: (rnd(k * 11 + i * 3) - 0.5) * 2 * rot };
};

return {
  frameAt, dropAt, jitterAt,
  smooth, smoothLinear, springCurve,
  sketchy,
  tornPoly, tear, halftoneCutout,
  risoPlate, riso, RISO_BLUE: BLUE, RISO_PINK: PINK,
  papercut, cornerCut,
  glassFilter, makeGlass,
  cloudFrom, cloudFromPath, renderCloud, elevationColor: ramp,
  inkBloom, brushPath, ensoPath,
  pxText, pxIcon, sprite,
  vhs,
  isoP: P, isoCube, ISO_COS: COS, ISO_SIN: SIN,
};
})();
