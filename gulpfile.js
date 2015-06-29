var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var accord = require('gulp-accord');
var minifyCss = require('gulp-minify-css');
var browserify = require('gulp-browserify');
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
        .src(['src/shareButton.js'], { read: false })
        .pipe(browserify({
          transform: ['babelify'],
          standalone: 'ShareButton'
        }))
        .pipe(rename('ShareButton.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['script', 'style']);
gulp.task('default', ['build']);
