const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');

gulp.task('sass', () =>
    sass('sass/main.sass')
        .on('error', sass.logError)
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload())
);

gulp.task('pug', () =>
  gulp.src('pug/3-PAGES/**/*.pug')
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest('.'))
    .pipe(livereload())

);

gulp.task('watch', function (){
  livereload.listen();
  livereload.reload();
  gulp.watch('sass/**/*.sass', ['sass']);
  gulp.watch('pug/**/*', ['pug']);
});
