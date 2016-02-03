var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/client/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function () {
  return gulp
    .src('src/client/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack', 'copy']);

gulp.task('watch', function () {
  watch('src/client/**/*', batch(function (events, done) {
    gulp.start('build', done);
  }));
});

