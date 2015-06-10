var gulp       = require('gulp');
var config     = require('../config').utils;

gulp.task('utils', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});