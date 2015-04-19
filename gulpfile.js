var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss')
var mqpacker = require('css-mqpacker');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var rename = require('gulp-rename');
var simplevars =require('postcss-simple-vars');
var nested = require('postcss-nested');
var postcssImport = require('postcss-import');
var reload = browserSync.reload;

var config = {
  version: pkg.version,
  source: pkg.config.source,
  port: pkg.config.port,
  hostname: process.env.HOSTNAME || pkg.config.hostname,
};


gulp.task('scripts', function () {
  return gulp.src(config.source + 'js/*.css')
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream:true}));
});

gulp.task('css', function () {
  var processors = [
    postcssImport()
    ,simplevars
    ,nested
    ,autoprefixer({browsers: ['last 1 version']})
    ,mqpacker
    ,csswring
  ];
  return gulp
    .src(config.source + 'css/**.css')
    .pipe(postcss(processors))
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}));
});

gulp.task('images', function () {
  return gulp.src(config.source + 'images/**')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html', function () {
  return gulp.src(config.source + '*.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(config.source + 'js/**', ['scripts']);
  gulp.watch(config.source + 'css/**/*.css', ['css']);
  gulp.watch(config.source + '*.html', ['html', 'css', 'scripts']);
  gulp.watch(config.source + 'images/**', ['images']);

  browserSync.init({
    server: "./dist",
    port: config.port
  });
});

