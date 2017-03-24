/* Notes:
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch-wp', ['sasswp'], function() {
  gulp.watch(config.sass.src,   ['sasswp']);
});
