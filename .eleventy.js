const familyEvents = require('./src/pug/pages/18_lp-family/familyEvents.js');
const pageGroups = require('./src/pug/pageList/pageGroups.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('familyEvents', familyEvents);
  // index.pug のページ一覧用（関数そのものを渡すため関数で包む）
  eleventyConfig.addGlobalData('pageGroups', () => pageGroups);
  eleventyConfig.addWatchTarget('./src/pug/pageList/');

  // src/static/img を丸ごと dist/img にコピー
  // eleventyConfig.addPassthroughCopy({ "src/static/img": "img" });
  return {
    dir: {
      input: "src/pug/pages/",  // Pugファイルのディレクトリ
      output: "dist", // Viteと合わせる
      includes: "../_includes/", // 監視はしたいが出力したくないファイル（input基準でパスを指定）
    },
    htmlTemplateEngine: "pug",
    templateFormats: ["pug"]
  };
};