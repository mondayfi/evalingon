var gulp         = require('gulp');
var concat       = require('gulp-concat');
var minifyCSS    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').vendorstyles;

gulp.task('vendorstyles', function () {
  return gulp.src(config.src)
    .pipe(concat('vendor.css'))
    .on('error', handleErrors)
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest(config.dest));
});