/* Notes:
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', ['copyicon', 'sass', 'vendorstyles', 'hb', 'images', 'utils', 'javascript', 'browserSync'], function() {
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.hb.src, ['hb']);
  gulp.watch(config.javascript.src, ['javascript']);
});
