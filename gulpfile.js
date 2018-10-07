var pump = require('pump');
var gulp = require('gulp');
var gulpReplace = require('gulp-replace');
var gulpUglify = require('gulp-uglify');
var gulpRename = require('gulp-rename');


gulp.task('default', function(cb) {
	pump([
		gulp.src('./bowl-debug.js'),
		gulpReplace(/^(\s*debug\s*:\s*)(?:true|false)/m, '$1false'),
		gulpUglify({
			ie8: true,
			output: {
				comments: require('uglify-save-license')
			}
		}),
		gulpRename('bowl.js'),
		gulp.dest('./')
	], cb);
});