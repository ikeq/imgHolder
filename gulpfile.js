var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

gulp.task('default', function () {
  gulp.src('./imgholder-debug.js')
  .pipe(uglify())
  .pipe(rename('imgholder.js'))
  .pipe(gulp.dest('./'))
})
