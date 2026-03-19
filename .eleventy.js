const familyEvents = require('./src/pug/pages/18_lp-family/familyEvents.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('familyEvents', familyEvents);

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