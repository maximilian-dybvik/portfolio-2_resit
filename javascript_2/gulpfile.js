'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');

// Copy HTML files fo dist folder
gulp.task('copyHtml', callback => {
  gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist'));
  callback();
});

// Transpile Typescript to Javascript without sourcemaps
gulp.task('ts-build', callback => {
  gulp.src('./src/ts/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'build.app.js'
    }))
    .pipe(gulp.dest('./dist'));
  callback();
});

// Transpile SASS to CSS without sourcemaps
gulp.task('sass-build', callback => {
  gulp.src('./src/sass/**/*.{sass,scss}')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'))
  callback();
});

// Run local server with browser sync
gulp.task('serve', callback => {
  browserSync.init({
    server: './dist',
    files: './src/**/*'
  });
  callback();
});

// Watch files for changes
gulp.task('watch', callback => {
  gulp.watch('./src/*.html', gulp.series('copyHtml'));
  gulp.watch('./src/ts/**/*.ts', gulp.series('ts-build'));
  gulp.watch('./src/sass/**/*.{sass,scss}', gulp.series('sass-build'));
  gulp.watch('./src/**/*', browserSync.reload)
  callback();
});

// Build project for distibution
gulp.task('build', gulp.series('copyHtml', 'ts-build', 'sass-build'));

// Start, watches files for changes and transpiles Sass
gulp.task('start', gulp.series('copyHtml', 'ts-build', 'sass-build'));

// Default task
gulp.task('default', gulp.series('start', 'watch', 'serve'));