var gulp = require('gulp');
var wrap = require('gulp-wrap-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var accord = require('gulp-accord');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var autoprefixer = require('autoprefixer-stylus');

gulp.task('clean', function(cb) {
    del(['dist/*[.js, .css]']);
    return cb();
});

gulp.task('style', ['clean'], function(file) {
  var styleShareButton = gulp
    .src('lib/styles.styl')
    .pipe(accord('stylus', {
      use: autoprefixer()
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dist('dist/'));
});

gulp.task('script', ['clean'], function(file) {
    var umdShareButton = gulp
        .src('lib/index.js')
        .pipe(babel())
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
gulp.task('default', ['build']);
