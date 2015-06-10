var gulp = require('gulp');
var hb = require('gulp-hb');
var data = require('gulp-data');
var extname = require('gulp-extname');
var htmlmin = require('gulp-htmlmin');
var config = require('../config').hb;

gulp.task('hb', function () {
  return gulp
    .src(config.src)
      .pipe(hb({
        data: config.data,
        partials: config.partials,
        helpers: config.helpers,
        debug: true
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(extname())

    .pipe(gulp.dest(config.dist));
});