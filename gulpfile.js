const gulp = require('gulp');
//Required plugins for gulp tool
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pump = require('pump');
const removeCode = require('gulp-remove-code');

// Task for compile Sass to CSS in src folder
gulp.task('styles', function() {
  gulp
    .src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});


/**
 * Task for Optimizing CSS (minification) files for production
 */
gulp.task('deployStyles', function() {
  gulp
    .src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));

});


/**
 * Task for Optimizing javascript (minification and concatenation) files for production
 */
gulp.task('deployScripts', function(cb) {
  pump([
    gulp.src('src/js/*.js'),
    concat('app.js'),
    uglify(),
    gulp.dest('dist/js')], cb);
});


/**
 * Task for remove jasmine tester and copy html files for production
 */
gulp.task('copy-html', function() {
  gulp
    .src('src/index.html')
    .pipe(removeCode({production: true}))
    .pipe(gulp.dest('dist'));
});


/**
 * Task for copy image files for production
 */
gulp.task('copy-images', function() {
  gulp
    .src('src/img/*')
    .pipe(gulp.dest('dist/img'));
});


/**
 * Task for copy font files for production
 */
gulp.task('copy-fonts', function() {
  gulp
    .src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});


/**
 * Task for using eslint for javascript code syntax and quality check.
 */
gulp.task('lint', function() {
  return (
    gulp.src(['src/js/**/*.js'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
      .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
      .pipe(eslint.failOnError())
  );
});


/**
 * Task for using gulp watch Live-reloading with Browser Sync
 * Watching Sass and html files for changes
 */
gulp.task('watch', ['browserSync','lint','deployStyles','copy-html','copy-images','copy-fonts'], function() {
  gulp.watch('src/sass/**/*.scss', ['deployStyles']);
  gulp.watch('src/js/**/*.js', ['lint']);
  gulp.watch('src/index.html', ['copy-html']);
  gulp.watch('src/img/*', ['copy-images']);
  gulp.watch('src/fonts/*', ['copy-fonts']);
  gulp.watch('src/index.html').on('change', browserSync.reload);
});


/**
 * Task for Browser Sync
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
});


/**
 * Task for Build Final Project for production
 */
gulp.task('build',[
  'styles',
  'deployScripts',
  'deployStyles',
  'copy-images',
  'copy-html',
  'copy-fonts'
]);