const pump = require('pump');
const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');


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