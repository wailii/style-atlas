// 五个风格共用：数据、图片加载、把真封面处理成各风格的画法
const HOT = (window.HOT && window.HOT.list) || [];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// 截断：不把英文词、数字切成半截
const clip = (s, n) => {
  if (s.length <= n) return s;
  let cut = s.slice(0, n - 1);
  if (/[A-Za-z0-9]/.test(s[n - 1] || "") && /[A-Za-z0-9.]$/.test(cut)) cut = cut.replace(/[A-Za-z0-9.]+$/, "");
  return cut.replace(/[，、,；\s]+$/, "") + "…";
};
const firstLine = (s) => (s || "").split(/\n/)[0];
const heatText = (h) => Math.round(h.heat);
const pad2 = (n) => String(n).padStart(2, "0");
const nowHM = () => { const d = new Date(); return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };

const loadImage = (src) => new Promise((ok, bad) => { const im = new Image(); im.onload = () => ok(im); im.onerror = bad; im.src = src; });

// 按 object-fit: cover 裁到 w×h
function coverCanvas(img, w, h) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const s = Math.max(w / img.width, h / img.height), dw = img.width * s, dh = img.height * s;
  c.getContext("2d").drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  return c;
}
function lumaOf(c) {
  const { width: w, height: h } = c, d = c.getContext("2d").getImageData(0, 0, w, h).data, L = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) L[i] = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
  return L;
}
const hex = (s) => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];

// 线稿：Sobel 描边 + 暗部排线，透明底黑墨
function sketchCanvas(img, w, h, { ink = "#1b1b1b", gain = 3.2, hatch = true, soft = 2 } = {}) {
  const small = coverCanvas(img, Math.round(w / soft), Math.round(h / soft));
  const src = coverCanvas(small, w, h); // 先缩再放，去掉噪点
  const L = lumaOf(src), out = document.createElement("canvas"); out.width = w; out.height = h;
  const ctx = out.getContext("2d"), od = ctx.createImageData(w, h), [r, g, b] = hex(ink);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x;
    const gx = -L[i - w - 1] - 2 * L[i - 1] - L[i + w - 1] + L[i - w + 1] + 2 * L[i + 1] + L[i + w + 1];
    const gy = -L[i - w - 1] - 2 * L[i - w] - L[i - w + 1] + L[i + w - 1] + 2 * L[i + w] + L[i + w + 1];
    let a = Math.min(1, Math.hypot(gx, gy) * gain);
    a = a < 0.18 ? 0 : a;
    if (hatch) {
      const dark = 1 - L[i];
      if (dark > 0.55 && (x + y) % 6 === 0) a = Math.max(a, 0.55);
      if (dark > 0.78 && (x - y + 600) % 6 === 0) a = Math.max(a, 0.5);
    }
    od.data[i * 4] = r; od.data[i * 4 + 1] = g; od.data[i * 4 + 2] = b; od.data[i * 4 + 3] = a * 255;
  }
  ctx.putImageData(od, 0, 0);
  return out;
}

// 半调网点：按亮度在旋转网格上画圆点
function halftoneCanvas(img, w, h, { cell = 6, angle = 45, ink = "#111", paper = null, scale = 2, gamma = 1, from = 0, to = 1 } = {}) {
  const src = coverCanvas(img, w, h), L = lumaOf(src);
  const out = document.createElement("canvas"); out.width = w * scale; out.height = h * scale;
  const ctx = out.getContext("2d");
  if (paper) { ctx.fillStyle = paper; ctx.fillRect(0, 0, out.width, out.height); }
  ctx.fillStyle = ink; ctx.scale(scale, scale);
  const a = (angle * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a), R = Math.hypot(w, h);
  for (let v = -R; v < R; v += cell) for (let u = -R; u < R; u += cell) {
    const x = w / 2 + u * ca - v * sa, y = h / 2 + u * sa + v * ca;
    if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue;
    const xi = Math.min(w - 1, Math.max(0, x | 0)), yi = Math.min(h - 1, Math.max(0, y | 0));
    let dark = 1 - L[yi * w + xi];
    dark = Math.min(1, Math.max(0, (dark - from) / (to - from)));
    dark = Math.pow(dark, gamma);
    const rad = (cell / 2) * Math.sqrt(dark) * 1.15;
    if (rad < 0.25) continue;
    ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
  }
  return out;
}

// 像素化：缩到 cols 宽，按调色板 + 4×4 Bayer 抖动取色
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
function pixelCanvas(img, cols, rows, palette, dither = 0.09) {
  const c = coverCanvas(img, cols, rows), ctx = c.getContext("2d"), id = ctx.getImageData(0, 0, cols, rows), d = id.data;
  const pal = palette.map(hex);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const i = (y * cols + x) * 4, t = (BAYER[(y % 4) * 4 + (x % 4)] / 16 - 0.5) * 255 * dither * 2;
    let best = 0, bd = 1e9;
    for (let k = 0; k < pal.length; k++) {
      const dr = d[i] + t - pal[k][0], dg = d[i + 1] + t - pal[k][1], db = d[i + 2] + t - pal[k][2];
      const dd = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
      if (dd < bd) { bd = dd; best = k; }
    }
    d[i] = pal[best][0]; d[i + 1] = pal[best][1]; d[i + 2] = pal[best][2]; d[i + 3] = 255;
  }
  ctx.putImageData(id, 0, 0);
  return c;
}

// 纸张颗粒：单色噪点平铺图
function grainURL(size = 160, alpha = 0.08, tone = 0) {
  const c = document.createElement("canvas"); c.width = c.height = size;
  const ctx = c.getContext("2d"), id = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    id.data[i * 4] = id.data[i * 4 + 1] = id.data[i * 4 + 2] = tone;
    id.data[i * 4 + 3] = Math.random() * 255 * alpha;
  }
  ctx.putImageData(id, 0, 0);
  return c.toDataURL();
}

// 热度曲线：去掉空值，归一到 w×h
function sparkPts(h, w, hgt, pad = 2) {
  const v = h.spark.filter((x) => x != null);
  if (v.length < 2) return [];
  const lo = Math.min(...v), hi = Math.max(...v);
  return v.map((x, i) => [pad + (i / (v.length - 1)) * (w - pad * 2), hgt - pad - ((x - lo) / Math.max(1, hi - lo)) * (hgt - pad * 2)]);
}

// 每条的关键词（标重点用）和没有封面时画的小图
const KEY = { 1: "Claude Duet", 2: "PHP核心漏洞", 3: "150亿美元", 4: "DeepInfer", 5: "Flint", 6: "合并", 7: "Google Cloud", 8: "168亿美元" };
const DOODLE = {
  5: "M20 20 L8 32 L20 44 M44 20 L56 32 L44 44 M37 14 L27 50",
  6: "M32 6 C43 16 44 32 39 44 L25 44 C20 32 21 16 32 6 Z M25 36 L15 48 L25 45 M39 36 L49 48 L39 45 M28 47 L32 58 L36 47 M28 24 A4 4 0 1 0 36 24 A4 4 0 1 0 28 24",
  7: "M17 46 C6 46 6 31 17 31 C17 19 33 15 37 24 C43 17 56 22 54 33 C62 33 62 46 51 46 Z",
  8: "M8 54 L58 54 M14 54 L14 42 M24 54 L24 36 M34 54 L34 40 M44 54 L44 26 M10 34 L22 26 L32 30 L52 12 M45 12 L52 12 L52 19",
};
const shortTitle = (h) => h.title.replace(/\s+/g, " ");

// 按宽度把标题断成几行（拉丁词不拆开）
function splitLines(text, font, maxW) {
  const ctx = document.createElement("canvas").getContext("2d"); ctx.font = font;
  const toks = text.match(/[A-Za-z0-9.\-]+|\s+|[^A-Za-z0-9.\-\s]/g), out = []; let cur = "";
  for (const t of toks) {
    const nx = cur + t;
    if (ctx.measureText(nx.trim()).width > maxW && cur.trim()) { out.push(cur.trim()); cur = t.trimStart(); } else cur = nx;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// 可重复的伪随机
const rnd = (seed) => { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); };
// 在 fn 运行期间把 Math.random 换成固定种子（做视频时让噪点、纤维等贴图每次一样）
const seeded = (seed, fn) => { const R = Math.random; let st = seed >>> 0; Math.random = () => ((st = (st * 1664525 + 1013904223) >>> 0) / 4294967296); try { return fn(); } finally { Math.random = R; } };

// 纸纤维：短弧线平铺图（纸拼贴、宣纸类的底）
function fiberURL(size = 420, n = 260, dark = "120,100,60", light = "255,255,245") {
  const c = document.createElement("canvas"); c.width = c.height = size;
  const x = c.getContext("2d");
  for (let i = 0; i < n; i++) {
    x.strokeStyle = `rgba(${Math.random() < 0.5 ? dark : light},${0.05 + Math.random() * 0.08})`;
    x.lineWidth = 0.6 + Math.random();
    const px = Math.random() * size, py = Math.random() * size, a = Math.random() * Math.PI, l = 6 + Math.random() * 26;
    x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(a) * l / 2 + 3, py + Math.sin(a) * l / 2 - 3, px + Math.cos(a) * l, py + Math.sin(a) * l); x.stroke();
  }
  return c.toDataURL();
}

// 底栏五个入口
const TAB_NAMES = ["精选", "热点", "日报", "模型", "重置"];
const TAB_ICONS = [
  "M4 6 H20 M4 12 H20 M4 18 H14",
  "M12 3 C16 8 19 11 19 15 C19 19 16 21 12 21 C8 21 5 19 5 15 C5 11 9 10 9 6 C11 8 11 9 12 3 Z",
  "M6 3 H15 L19 7 V21 H6 Z M9 11 H16 M9 15 H16",
  "M5 20 V13 M10 20 V6 M15 20 V10 M20 20 V15",
  "M5 12 A7 7 0 1 0 8 6.5 M4 4 L8 6.5 L5.5 10 M12 8 V12 L15 14",
];
const iconSVG = (i, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${TAB_ICONS[i]}"/></svg>`;
const CN_NUM = ["", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"];
const fontsReady = () => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);

// 色块化：按调色板取最近色、不抖动；可选描黑边（浮世绘、剪影用）
function posterCanvas(img, w, h, palette, { edge = 0, edgeInk = "#1a1a1a", soft = 3 } = {}) {
  const pal = palette.map(hex), src = coverCanvas(coverCanvas(img, Math.round(w / soft), Math.round(h / soft)), w, h);
  const ctx = src.getContext("2d"), id = ctx.getImageData(0, 0, w, h), d = id.data, L = edge ? lumaOf(src) : null;
  for (let i = 0; i < w * h; i++) {
    let best = 0, bd = 1e9;
    for (let k = 0; k < pal.length; k++) { const dr = d[i * 4] - pal[k][0], dg = d[i * 4 + 1] - pal[k][1], db = d[i * 4 + 2] - pal[k][2], dd = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11; if (dd < bd) { bd = dd; best = k; } }
    d[i * 4] = pal[best][0]; d[i * 4 + 1] = pal[best][1]; d[i * 4 + 2] = pal[best][2];
  }
  if (edge) {
    const [er, eg, eb] = hex(edgeInk);
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x, gx = L[i + 1] - L[i - 1], gy = L[i + w] - L[i - w];
      if (Math.hypot(gx, gy) > edge) { d[i * 4] = er; d[i * 4 + 1] = eg; d[i * 4 + 2] = eb; }
    }
  }
  ctx.putImageData(id, 0, 0);
  return src;
}

// 二值：亮度切一刀，两种颜色（剪影、构成主义）
function thresholdCanvas(img, w, h, { cut = 0.5, ink = "#111", paper = null, soft = 2 } = {}) {
  const src = coverCanvas(coverCanvas(img, Math.round(w / soft), Math.round(h / soft)), w, h), L = lumaOf(src);
  const ctx = src.getContext("2d"), id = ctx.createImageData(w, h), [r, g, b] = hex(ink), P = paper && hex(paper);
  for (let i = 0; i < w * h; i++) {
    const on = L[i] < cut;
    if (on) { id.data[i * 4] = r; id.data[i * 4 + 1] = g; id.data[i * 4 + 2] = b; id.data[i * 4 + 3] = 255; }
    else if (P) { id.data[i * 4] = P[0]; id.data[i * 4 + 1] = P[1]; id.data[i * 4 + 2] = P[2]; id.data[i * 4 + 3] = 255; }
  }
  ctx.putImageData(id, 0, 0);
  return src;
}

// ASCII：按亮度挑字符
function asciiRows(img, cols, rows, ramp = " .:-=+*#%@", aspect = 1) {
  const c = coverCanvas(img, cols, rows), L = lumaOf(c), out = [];
  let lo = 1, hi = 0; for (const v of L) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
  const norm = (v) => Math.pow((v - lo) / Math.max(0.05, hi - lo), 1.6);
  for (let y = 0; y < rows; y++) { let s = ""; for (let x = 0; x < cols; x++) s += ramp[Math.min(ramp.length - 1, Math.floor((1 - norm(L[y * cols + x])) * ramp.length))]; out.push(s); }
  return out;
}

// 水墨：灰度分几层墨色，边缘晕开（透明底，叠在宣纸上）
function inkCanvas(img, w, h, { levels = 4, blur = 2.2, ink = "#141414", soft = 3 } = {}) {
  const base = coverCanvas(coverCanvas(img, Math.round(w / soft), Math.round(h / soft)), w, h), L = lumaOf(base);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const x = c.getContext("2d"), id = x.createImageData(w, h), [r, g, b] = hex(ink);
  for (let i = 0; i < w * h; i++) {
    const dark = Math.pow(1 - L[i], 1.25), q = Math.round(dark * levels) / levels;
    id.data[i * 4] = r; id.data[i * 4 + 1] = g; id.data[i * 4 + 2] = b; id.data[i * 4 + 3] = q * 235;
  }
  x.putImageData(id, 0, 0);
  const out = document.createElement("canvas"); out.width = w; out.height = h;
  const o = out.getContext("2d"); o.filter = `blur(${blur}px)`; o.drawImage(c, 0, 0); o.filter = "none"; o.globalAlpha = 0.55; o.drawImage(c, 0, 0);
  return out;
}
