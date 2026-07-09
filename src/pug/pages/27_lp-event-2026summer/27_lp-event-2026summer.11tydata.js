// このフォルダ内の全Pugの出力先を dist/event-2026summer/ に変更する
module.exports = {
  permalink: (data) => {
    const base = "event-2026summer";
    // filePathStem 例: /27_lp-event-2026summer/index, /..../loycus, /..../local/index
    const parts = data.page.filePathStem.split("/").filter(Boolean);
    const name = parts.pop(); // index, loycus ...
    // local/ 配下のファイルはサブフォルダ構造を保持する
    const dir = parts[parts.length - 1] === "local" ? "local/" : "";
    // index はそのディレクトリ直下、その他は 名前/index.html （デフォルト挙動を踏襲）
    return name === "index"
      ? `${base}/${dir}index.html`
      : `${base}/${dir}${name}/index.html`;
  },
};
