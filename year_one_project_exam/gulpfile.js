'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');

// Compile Pug templates into HTML
gulp.task('pugToHTML', callback => {
  gulp.src('./src/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      doctype: 'html',
      pretty: false
    }))
    .pipe(gulp.dest('./dist'));
  callback();
})

// Transpile SASS to CSS without sourcemaps
gulp.task('sassToCSS', callback => {
  gulp.src('./src/sass/**/*.{sass,scss}')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./dist/css'))
  callback();
});

// Copy JS files to dist folder
gulp.task('copyJs', callback => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/js'));
  callback();
});

// Copy assets to dist folder
gulp.task('copyAssets', callback => {
  gulp.src('./src/assets/*')
    .pipe(gulp.dest('./dist/assets'));
  callback();
});

// Watch files for changes
gulp.task('watch', callback => {
  gulp.watch('./src/pug/**/*.pug', gulp.series('pugToHTML'));
  gulp.watch('./src/sass/**/*.{sass,scss}', gulp.series('sassToCSS'));
  gulp.watch('./src/js/**/*.js', gulp.series('copyJs'));
  gulp.watch('./src/assets/**/*', gulp.series('copyAssets'));
  gulp.watch('./src/**/*', browserSync.reload)
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

// Build project for distibution
gulp.task('build', gulp.series('pugToHTML', 'sassToCSS', 'copyJs', 'copyAssets'));

// Default task - Runs build task, starts server and watches for files.
gulp.task('default', gulp.series('build', 'watch', 'serve'));