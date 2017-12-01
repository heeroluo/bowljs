'use strict';

var gulp = require('gulp'),
	gulpReplace = require('gulp-replace'),
	gulpUglify = require('gulp-uglify'),
	gulpRename = require('gulp-rename');


gulp.task('default', function() {
	gulp.src('./bowl-debug.js')
		.pipe(gulpReplace(/^(\s*debug\s*:\s*)(?:true|false)/m, '$1false'))
		.pipe(gulpUglify({
			preserveComments: 'license'
		}))
		.pipe(gulpRename('bowl.js'))
		.pipe(gulp.dest('./'));
});