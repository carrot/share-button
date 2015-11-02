var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var accord = require('gulp-accord');
var browserify = require('gulp-browserify');
var shell = require('gulp-shell');
var del = require('del');
var autoprefixer = require('autoprefixer-stylus');
var axis = require('axis');
var poststylus = require('poststylus');
var postcssSVG = require('postcss-svg');

gulp.task('unbuild', function() {
    del(['dist']);
});

gulp.task('style', function() {
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
    .pipe(shell(
      ['node_modules/.bin/minify --output dist/share-button.min.css dist/share-button.css']
    ))
});

gulp.task('script', function() {
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
