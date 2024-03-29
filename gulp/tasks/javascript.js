var gulp = require('gulp');
var config = require('../config').javascript;
var browserSync  = require('browser-sync');

gulp.task('javascript', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({stream:true}));
});