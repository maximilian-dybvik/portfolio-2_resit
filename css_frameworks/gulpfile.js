'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

// Copy HTML files fo dist folder
gulp.task('copyHtml', callback => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
  callback();
});

// Copy JS files to dist folder
gulp.task('copyJs', callback => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist'));
  callback();
});

// Copy asset files to dist folder
gulp.task('copyAssets', callback => {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images'));
  callback();
});

// Transpile SASS to CSS with sourcemaps
gulp.task('sass', callback => {
  gulp.src('./src/sass/**/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'))
    .on('error', sass.logError);
  callback();
});

// Transpile SASS to CSS without sourcemaps
gulp.task('sass-build', callback => {
  gulp.src('./src/sass/**/*.{sass,scss}')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'))
    .on('error', sass.logError);
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
  gulp.watch('./src/js/**/*.js', gulp.series('copyJs'));
  gulp.watch('./src/sass/**/*.{sass,scss}', gulp.series('sass'));
  gulp.watch('./src/**/*', browserSync.reload)
  callback();
});

// Build project for distibution
gulp.task('build', gulp.series('copyHtml', 'copyJs', 'sass-build'));

// Start, watches files for changes and transpiles Sass
gulp.task('start', gulp.series('copyHtml', 'copyJs', 'copyAssets', 'sass'));

// Default task
gulp.task('default', gulp.series('start', 'watch', 'serve'));