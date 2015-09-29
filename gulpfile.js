var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var accord = require('gulp-accord');
var minifyCss = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var del = require('del');
var autoprefixer = require('autoprefixer-stylus');
var axis = require('axis');
var poststylus = require('poststylus');
var postcssSVG = require('postcss-svg');

gulp.task('clean', function() {
    del(['dist/*[.js, .css]']);
});

gulp.task('style', ['clean'], function() {
  var styleShareButton = gulp
    .src('src/share-button.styl')
    .pipe(accord('stylus', {
      use: [
        autoprefixer(),
        axis(),
        poststylus([postcssSVG({ paths: ['./src/svg' ]})])
      ]
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
        .src(['src/share-button.js'], { read: false })
        .pipe(browserify({
          transform: ['babelify'],
          standalone: 'ShareButton'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['script', 'style']);
gulp.task('default', ['build']);
