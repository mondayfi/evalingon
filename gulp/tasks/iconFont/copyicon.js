var gulp = require('gulp');
var config = require('../../config').iconFonts;

gulp.task('copyicon', function() {
  return gulp.src(config.copysrc)
    .pipe(gulp.dest(config.copydest));
});