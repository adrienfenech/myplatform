/**
 * Created at 09/01/2018
 * By Adrien
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');

const DEV_DIR = 'app';
const DIST_DIR = 'dist';

const server = require('gulp-express');

function runExpress() {
    // Start the server at the beginning of the task
    server.run(['server.js']);
}

gulp.task('default', ['copy-dev-to-dist', 'serve-dist', 'watch']);

gulp.task('build', function(callback) {
    runSequence('copy-dev-to-dist', callback);
});

gulp.task('clean', function() {
    del.sync([DIST_DIR]);
});

gulp.task('serve-dist', ['build'], function() {
    runExpress(DIST_DIR);
});

gulp.task('copy-dev-to-dist', function() {
    return gulp.src(DEV_DIR + '/**')
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch', function() {
    gulp.watch('app/**', ['build']);
});