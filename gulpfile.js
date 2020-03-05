const { src, dest, series, watch } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const ts = require('gulp-typescript');
const header = require('gulp-header');

function toGas() {
  return browserify('./build/js/main.js')
    .transform('babelify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(header('global=this;function doPost(){}')) // GAS上で動かすために必要 gasifyが@slack/web-apiと競合したのでgasifyの欲しい機能をこれで代用
    .pipe(dest('./build/gas'));
}

function tsCompile() {
  let tsProject = ts.createProject('tsconfig.json');
  return src(['src/**/*.ts'])
    .pipe(tsProject())
    .pipe(dest('./build/js/'));
}

exports.build = series(tsCompile, toGas);