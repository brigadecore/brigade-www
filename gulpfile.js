// Load plugins
var gulp = require('gulp'),
  del = require('del');
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cache = require('gulp-cache'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  streamqueue = require('streamqueue'),
  sass.compiler = require('node-sass');


// Styles
gulp.task('styles', function () {
  return gulp.src('assets/scss/brigade-app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest( 'assets/css'))
    .pipe(gulp.dest( '_site/assets/css'))
});

// Images
gulp.task('images', function () {
  return streamqueue({objectMode: true},
    gulp.src('assets/images/**/*{.jpg,.png,.gif}')
      .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
      .pipe(gulp.dest('assets/images/'))
      .pipe(gulp.dest('_site/assets/images/'))
  )
});


// Clean
gulp.task('clean', function () {
  return del('_site/assets/', {force: true});
});


// Default task
gulp.task('default', gulp.series('clean', 'styles', 'images'), function () {});

// Watch task
gulp.task('watch', function () {

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', gulp.series('styles'));

  // Watch image files
  gulp.watch('images/**/*.{png,gif,jpg}', gulp.series('images'));

  // Create LiveReload server
  livereload.listen();

  // Watch any files in _site, reload on change
  gulp.watch(['_site/assets/**/*']).on('change', livereload.changed);
});
