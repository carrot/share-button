var gulp = require('gulp');
var wrap = require('gulp-wrap-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var accord = require('gulp-accord');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var del = require('del');
var autoprefixer = require('autoprefixer-stylus');
var axis = require('axis');

gulp.task('clean', function() {
    del(['dist/*[.js, .css]']);
});

gulp.task('style', ['clean'], function() {
  var styleShareButton = gulp
    .src('src/styles.styl')
    .pipe(accord('stylus', {
      use: [autoprefixer(), axis()]
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('script', ['clean'], function() {
    var umdShareButton = gulp
        .src(['src/polyfills.js', 'src/shareUtils.js', 'src/shareButton.js'])
        .pipe(babel({ blacklist: [] }))
        .pipe(concat('ShareButton.js'))
        .pipe(wrap({
        	namespace: 'ShareButton',
            exports: 'ShareButton'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('polyfill', function() {
  var umdShareButton = gulp
      .src([
        'node_modules/babel-core/browser-polyfill.js',
        'src/polyfills.js',
        'src/shareUtils.js',
        'src/shareButton.js'
      ])
      .pipe(babel({ blacklist: [] }))
      .pipe(concat('ShareButton-polyfill.js'))
      .pipe(wrap({
        namespace: 'ShareButton',
          exports: 'ShareButton'
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(uglify())
      .pipe(rename({
          suffix: '.min'
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['script', 'style']);
gulp.task('production', ['script', 'polyfill', 'style']);
gulp.task('default', ['build']);
