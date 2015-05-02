var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var styleguide = require('sc5-styleguide');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var reload = browserSync.reload;

var config = {
  version: pkg.version,
  source: pkg.config.source,
  port: pkg.config.port,
  hostname: process.env.HOSTNAME || pkg.config.hostname,
};
var SassOptions = {
    sourcemap: true,
    style: "expanded"
};


gulp.task('scripts', function () {
  return gulp.src(config.source + 'js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream:true}));
});

gulp.task('fonts', function () {
  return gulp.src(config.source + 'fonts/*.**')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(reload({stream:true}));
});

gulp.task('css', function () {
  return gulp
    .src(config.source + 'css/import.scss')
    .pipe(sass(SassOptions))
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}));
});

gulp.task('minify-css', function () {
  return gulp.src( 'dist/css/*.css')
    .pipe(minifyCss())
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(gulp.dest('dist/css'))
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

gulp.task('deploy-to-github', function () {
  return gulp.src(config.source + '*.html')
  .pipe(gulp.dest(''));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(config.source + 'js/**', ['scripts']);
  gulp.watch(config.source + 'css/**/*.scss', ['css']);
  gulp.watch(config.source + '*.html', ['html', 'css', 'scripts']);
  gulp.watch(config.source + 'images/**', ['images']);

  browserSync.init({
    server: "./dist",
    port: config.port
  });
});

gulp.task('default', ['watch']);
gulp.task('deploy', ['deploy-to-github']);