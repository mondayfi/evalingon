var gulp = require('gulp');
var config = require('../config').favicons;

gulp.task('copyfavicons', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dist));
});