var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var iconfontCss      = require('gulp-iconfont-css');
var config           = require('../../config').iconFonts;

gulp.task('iconFont', function() {
  return gulp.src(config.src)

    .pipe(iconfontCss({
      fontName: config.options.fontName,
      path: config.template,
      targetPath: config.sassPath,
      fontPath: config.fontPath
    }))
    .pipe(iconfont(config.options))
    .pipe(gulp.dest(config.dest));
});