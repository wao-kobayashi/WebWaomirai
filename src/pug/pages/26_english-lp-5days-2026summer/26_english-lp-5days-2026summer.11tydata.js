// このフォルダ内に変更する
module.exports = {
  permalink: (data) => {
    const base = "5days-challenge-2026summer";
    // filePathStem 
    const name = data.page.filePathStem.split("/").pop(); // index, loycus, a-finished ...
    // index はフォルダ直下、その他は 名前/index.html （デフォルト挙動を踏襲）
    return name === "index" ? `${base}/index.html` : `${base}/${name}/index.html`;
  },
};
