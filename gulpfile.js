var gulp = require('gulp');
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
