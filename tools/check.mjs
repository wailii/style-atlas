#!/usr/bin/env node
// 完整性检查：每种风格是否都有参考页、规格、标准截图、目录项，规格小节是否齐全，脚本有没有语法错。
//   node tools/check.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const G = join(ROOT, "gallery");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const SECTIONS = ["## 直接抄", "## 一眼认出", "## 颜色", "## 字体", "## 真图怎么处理", "## 动效", "## 组件", "## 换到别的东西上", "## 容易做坏", "## 参考实现"];
let bad = 0;
const fail = (m) => { bad++; console.log("✗", m); };

const pages = readdirSync(G).filter((f) => /^s-.*\.html$/.test(f)).map((f) => f.slice(2, -5));
const skill = read("SKILL.md"), stylesJs = read("gallery/styles.js");
for (const id of pages) {
  if (!existsSync(join(ROOT, "styles", `${id}.md`))) fail(`${id}: 缺 styles/${id}.md`);
  else {
    const md = read(`styles/${id}.md`);
    for (const s of SECTIONS) if (!md.includes(s)) fail(`${id}: 规格缺「${s.slice(3)}」`);
    if (!/出处：/.test(md)) fail(`${id}: 规格缺出处`);
  }
  if (!existsSync(join(G, "shots", `${id}.png`))) fail(`${id}: 缺标准截图 gallery/shots/${id}.png（跑 node tools/snap.mjs ${id}）`);
  if (!stylesJs.includes(`id: "${id}"`)) fail(`${id}: gallery/styles.js 里没有这一项`);
  if (!new RegExp(`\\|\\s*${id}\\s*\\|`).test(skill)) fail(`${id}: SKILL.md 目录表里没有这一行`);
  const html = readFileSync(join(G, `s-${id}.html`), "utf8");
  for (const m of html.matchAll(/src="([^"]+\.js)"/g)) if (!/^https?:/.test(m[1]) && !existsSync(join(G, m[1]))) fail(`${id}: 引用的 ${m[1]} 不存在`);
}
for (const f of readdirSync(G).filter((f) => /^v-.*\.html$/.test(f))) {
  const html = readFileSync(join(G, f), "utf8");
  for (const m of html.matchAll(/src="([^"]+\.js)"/g)) if (!/^https?:/.test(m[1]) && !existsSync(join(G, m[1]))) fail(`${f}: 引用的 ${m[1]} 不存在`);
  if (!/window\.seek\s*=/.test(html)) fail(`${f}: 视频页没有 window.seek`);
  if (!existsSync(join(G, "shots")) || !readdirSync(join(G, "shots")).some((x) => x.startsWith(f.replace(/\.html$/, "-")))) fail(`${f}: 缺标准帧 shots/${f.replace(/\.html$/, "")}-<t>.png`);
}
for (const f of readdirSync(join(ROOT, "styles"))) if (!pages.includes(f.replace(/\.md$/, ""))) fail(`styles/${f} 没有对应的参考页`);
for (const f of ["gallery/common.js", "gallery/engines.js", "gallery/styles.js", "tools/snap.mjs"]) {
  try { execFileSync(process.execPath, ["--check", join(ROOT, f)], { stdio: "pipe" }); } catch (e) { fail(`${f} 语法错：${String(e.stderr).split("\n")[0]}`); }
}
const ver = existsSync(join(ROOT, "VERSION")) ? read("VERSION").trim() : "?";
if (!read("CHANGELOG.md").includes(`## ${ver}`)) fail(`CHANGELOG.md 里没有当前版本 ${ver}`);
console.log(bad ? `\n${bad} 处问题` : `✓ ${pages.length} 种风格齐全，版本 ${ver}`);
process.exit(bad ? 1 : 0);
