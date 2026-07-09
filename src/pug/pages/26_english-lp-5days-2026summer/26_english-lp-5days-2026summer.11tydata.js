// このフォルダ内の全Pugの出力先を dist/5days-challenge-2026summer/ に変更する
module.exports = {
  permalink: (data) => {
    const base = "5days-challenge-2026summer";
    // filePathStem 例: /26_english-lp-5days-2026summer/index, /..../loycus
    const name = data.page.filePathStem.split("/").pop(); // index, loycus, a-finished ...
    // index はフォルダ直下、その他は 名前/index.html （デフォルト挙動を踏襲）
    return name === "index" ? `${base}/index.html` : `${base}/${name}/index.html`;
  },
};
