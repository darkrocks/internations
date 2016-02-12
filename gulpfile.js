var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var webpack = require('gulp-webpack');
var eslint = require('gulp-eslint');

gulp.task('webpack',  ['lint'], function() {
  return gulp.src('src/client/app/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function () {
  return gulp
    .src('src/client/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('lint', function () {
  return gulp.src(['**/*.js','!node_modules/**','!build/**', '!gulpfile.js'])
    .pipe(eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        'modules': true,
        "jsx": true
      },
      rules: {
        'no-console': 1,
        'no-unused-vars': 1,
        'no-var': 2
      },
      envs: [
        'browser', 'node', 'es6', 'commonjs'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('build', ['webpack', 'copy']);


gulp.task('watch', function () {
  watch('src/client/**/*', batch(function (events, done) {
    gulp.start('build', done);
  }));
});

