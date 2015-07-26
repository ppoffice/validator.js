var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('compress', function() {
  return gulp.src('src/validator.js')
    .pipe(uglify({mangle:true}))
    .pipe(rename('validator.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp.src('src/validator.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['compress', 'copy']);