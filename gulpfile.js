const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const beautify = require('gulp-beautify');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./docs"
    },
    port: 3000
  });
  done();
}

function watchFiles() {
  watch("./src/*.sass", sassTranspile);
  watch("./src/*.pug", turnPug);
  watch("./src/*.js", jsUglify);
  watch("./docs/*", browserSyncReload);
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function sassTranspile() {
  return src('./src/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./docs'));
}

function jsUglify() {
  return src('./src/app.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(beautify.js({ indent_size: 2 }))
    .pipe(dest('./docs'));
}

function turnPug() {
  return src('./src/index.pug') 
    .pipe(pug())
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(dest('./docs')); 
}

const monitor = parallel(watchFiles, browserSync);

exports.monitor = monitor;
exports.default = series(turnPug, sassTranspile, jsUglify);
