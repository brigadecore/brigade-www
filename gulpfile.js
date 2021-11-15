/*!
 * gulp
 * $ npm install del gulp gulp-ruby-sass gulp-autoprefixer gulp-cache gulp-cssnano gulp-imagemin gulp-livereload gulp-minify-css gulp-notify gulp-rename gulp-concat gulp-uglify gulp-jshint gulp-sourcemaps streamqueue --save-dev
*/

// Load plugins
var gulp = require('gulp'),
  del = require('del');
  var sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  uncss = require('gulp-uncss'),
  cssnano = require('gulp-cssnano'),
  livereload = require('gulp-livereload'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  sourcemaps = require('gulp-sourcemaps'),
  critical = require('critical'),
  shell = require('gulp-shell'),
  deployGH = require('gulp-gh-pages');


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

// UnCSS
gulp.task('styles-uncss', function () {
  return gulp.src('assets/css')
    .pipe(uncss({
      html: '_site/index.html',
      timeout: 1000
    }))
    .pipe(gulp.dest( '_site/assets/'))
});

// Inline Critical CSS
gulp.task('styles-inline', function (cb) {
  critical.generate({
    inline: true,
    base: '_site/',
    src: 'index.html',
    css: 'assets/css/brigade-app.min.css',
    target: '_includes/critical.min.css',
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    ignore: ['font-face']
  })
  cb();
});

// Scripts
gulp.task('scriptconcat', function () {
  return gulp.src([
      'assets/js/vendor/jquery.js',
      'assets/js/vendor/headroom.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('assets/js/'))
});
gulp.task('scriptminify', function () {
  return gulp.src([
      'assets/js/vendor.js',
      'assets/js/app.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // .pipe(concat())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(gulp.dest('_site/assets/js/'));
});
gulp.task('scripts', gulp.series('scriptconcat', 'scriptminify'), function () {});


// Clean
gulp.task('clean', function () {
  return del('_site/assets/', {force: true});
});


// Deploy
gulp.task('copy', function () {
  var sourceFiles = ['fonts/**'];
  return gulp.src(sourceFiles)
    .pipe(gulp.dest('_site/assets/'));
});

gulp.task('jekyllb', shell.task(['bundle exec jekyll b']));

gulp.task('deploy-gh-pages', function() {
  return gulp.src('_site/**/*')
    .pipe(deployGH());
});
gulp.task('deploy', gulp.series('clean', 'jekyllb', 'styles', 'scripts',
'copy', 'deploy-gh-pages'), function () {});



// Default task
gulp.task('default', gulp.series('clean', 'styles', 'scripts'), function () {});

// Watch task
gulp.task('watch', function () {

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', gulp.series('styles'));

  // Watch js files
  gulp.watch('assets/js/app.js', gulp.series('scripts'));

  // Create LiveReload server
  livereload.listen();

  // Watch any files in _site, reload on change
  gulp.watch(['_site/assets/**/*']).on('change', livereload.changed);

});