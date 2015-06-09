var gulp 				= require('gulp');
var runSequence 		= require('run-sequence');

gulp.task('build', function(cb){
   runSequence('iconFont', 'sass', 'vendorstyles', 'images', 'markup', 'html', cb);
});