/*!
 * gulp
 * $ npm install del gulp gulp-ruby-sass gulp-autoprefixer gulp-cache gulp-cssnano gulp-imagemin gulp-livereload gulp-minify-css gulp-notify gulp-rename gulp-concat gulp-uglify gulp-jshint gulp-sourcemaps streamqueue --save-dev
*/

// Load plugins
var gulp = require('gulp'),
  del = require('del');
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uncss = require('gulp-uncss'),
  cache = require('gulp-cache'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  sourcemaps = require('gulp-sourcemaps'),
  streamqueue = require('streamqueue'),
  critical = require('critical'),
  inlineCss = require('gulp-inline-css'),
  shell = require('gulp-shell'),
  deployGH = require('gulp-gh-pages'),
  runSequence = require('run-sequence');
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
    .pipe(notify({message: 'Styles task complete'}))
});

// UnCSS
gulp.task('styles-uncss', function () {
  return gulp.src('assets/css')
    .pipe(uncss({
      html: '_site/index.html',
      timeout: 1000
    }))
    .pipe(gulp.dest( '_site/assets/'))
    .pipe(notify({message: 'Styles - UnCSS task complete'}))
});

// Inline Critical CSS
gulp.task('styles-inline', function (cb) {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/brigade-app.min.css'],
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
    dest: '_includes/critical.min.css',
    minify: true,
    extract: false,
    ignore: ['font-face']
  })
});

// Images
gulp.task('images', function () {
  return streamqueue({objectMode: true},
    gulp.src('assets/images/**/*{.jpg,.png,.gif}')
      .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
      // .pipe(notify({message: 'Image minifed'}))
      .pipe(gulp.dest('assets/images/'))
      .pipe(gulp.dest('_site/assets/images/'))
  )
});

// Scripts
gulp.task('scriptconcat', function () {
  return gulp.src([
      'assets/js/vendor/headroom.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('assets/js/'))
    .pipe(notify({message: 'Scripts concated.'}));
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
    .pipe(gulp.dest('_site/assets/js/'))
    .pipe(notify({message: 'Scripts minified.'}));
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
    .pipe(gulp.dest('_site/assets/'))
    .pipe(notify({message: 'Copied all.'}));
});

gulp.task('jekyllb', shell.task(['bundle exec jekyll b']));

gulp.task('deploy-gh-pages', function() {
  return gulp.src('_site/**/*')
    .pipe(deployGH())
    .pipe(notify({message: 'Site deployed to Github Pages.'}));
});
gulp.task('deploy', gulp.series('clean', 'jekyllb', 'styles', 'images', 'scripts',
'copy', 'deploy-gh-pages'), function () {});



// Default task
gulp.task('default', gulp.series('clean', 'styles', 'images'), function () {});

// Watch task
gulp.task('watch', function () {

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', gulp.series('styles'));

  // Watch image files
  gulp.watch('images/**/*.{png,gif,jpg}', gulp.series('images'));

  // Watch js files
  // gulp.watch('assets/js/app.js', gulp.series('scripts'));

  // Create LiveReload server
  livereload.listen();

  // Watch any files in _site, reload on change
  gulp.watch(['_site/assets/**/*']).on('change', livereload.changed);

});
