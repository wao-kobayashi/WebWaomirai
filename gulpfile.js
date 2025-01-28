const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass')); // sassを最新に更新
const browserSync = require('browser-sync').create();
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');

// 変更ファイルのみPugコンパイル
function compilePug() {
    return gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
        .pipe(plumber())
        //newer プラグインは、出力先（dist）にあるファイルを比較対象として、
        //変更があったファイルのみを再処理します。これにより、変更のないファイルの処理を省略して効率化が図れます。
        .pipe(newer({
            dest: './',
            ext: '.html'
        }))
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
}

// 全pugファイルを強制的にコンパイル
function compileAllPug() {
    return gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
}

function compileAllScss() {
  return gulp.src('src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./static/css/sass'))
      .pipe(browserSync.stream());
}

// Browser Sync設定
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000,
        open: true
    });
    done();
}

// ファイル監視
function watchFiles() {
   // パーシャルファイルが変更された場合は全ファイルをコンパイル
   // パーシャルは"_"のこと
   // (done)はタスク終了を通知する、gulpが提供する関数
    gulp.watch('src/pug/**/_*.pug', function(done) {
        gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
            .pipe(plumber()) //エラーが発生した場合にGulpのタスクが強制的に停止するのを防止する
            .pipe(pug())
            .pipe(gulp.dest('./'))
            .pipe(browserSync.stream());
        done();
    });

    // 通常のpugファイルは変更されたファイルのみコンパイル
  gulp.watch(['src/pug/**/*.pug', '!src/pug/**/_*.pug'], compilePug);
  gulp.watch(['src/sass/**/*.scss'], compileAllScss);
}

// デフォルトタスク（変更検知）
exports.default = gulp.series(
    compilePug,compileAllScss,
    gulp.parallel(browserSyncInit, watchFiles)
);

// 全コンパイルタスク
exports.build = gulp.series(compileAllPug);