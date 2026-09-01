// ============================================================
// 専用フォルダ（dist/<名前>/<名前>.css）に書き出したいLPの一覧
//   → 追加したいときは、この配列にファイル名（.scss なし）を1行足すだけ
// ============================================================
const targets = [
  "15_lp-campaign-fr-ref",
  "29_lp-family-2026-08august",
];

// ------------------------------------------------------------
// ここから下は基本さわらなくてOK
// ------------------------------------------------------------
const { execSync } = require("child_process");

// --watch が渡されたら監視モード、なければ本番（圧縮）ビルド
const isWatch = process.argv.includes("--watch");

// 1) src/scss 全体 → dist/css （従来どおり）
const pairs = ["src/scss:dist/css"];

// 2) targets の各LP → dist/<名前>/<名前>.css
for (const name of targets) {
  pairs.push(`src/scss/${name}.scss:dist/${name}/${name}.css`);
}

const opts = isWatch ? "--watch --no-source-map" : "--no-source-map --style=compressed";
const cmd = `sass ${pairs.join(" ")} ${opts}`;

console.log("> " + cmd);
execSync(cmd, { stdio: "inherit" });
