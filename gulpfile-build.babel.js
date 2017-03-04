import gulp from 'gulp'
import image from 'gulp-image'
import imageResize from 'gulp-image-resize'
import sass from 'gulp-ruby-sass'
import cleanCSS from 'gulp-clean-css'
import pug from 'gulp-pug'
import cleanHTML from 'gulp-html-minifier'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import chalk from 'chalk'
import child from 'child_process'
import gutil from 'gulp-util'

gulp.task('jekyll', () => {
const jekyll = child.spawn('jekyll', ['serve','config'],[,'_build.yml']),
      jekyllLogger = (buffer) => {
  buffer.toString()
    .split(/\n/)
    .forEach((message) => gutil.log('Jekyll: ' + message))
}
  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

gulp.task('img', () => {
  gulp.src('src/img/assets/**/*')
    .pipe(image())
    .pipe(gulp.dest('docs/assets/img'))
})

gulp.task('img-blog', () => {
  gulp.src('src/img/photo/**/*')
    .pipe(image())
    .pipe(gulp.dest('docs/photo/img/original'))
})

gulp.task('thumb', () => {
  gulp.src('docs/photo/img/original/**/*')
    .pipe(imageResize({
      width : 640,
      height : 360,
      crop : false,
      upscale : false
    }))
    .pipe(gulp.dest('docs/photo/img/thumb'))
})

gulp.task('sass', () => {
    sass('src/sass/main.sass')
        .on('error', sass.logError)
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`
              ${chalk.blue(details.name)} before: ${chalk.red((details.stats.originalSize/1024).toFixed(2))}${chalk.red('kB')}
              ${chalk.blue(details.name)} after: ${chalk.green((details.stats.minifiedSize/1024).toFixed(2))}${chalk.green('kB')}`
            )
        }))
        .pipe(gulp.dest('docs/assets/css'))
    })

gulp.task('pug', () => {
  gulp.src('src/pug/3-PAGES/*.pug')
    .pipe(pug())
    .pipe(cleanHTML({minifyJS:true,removeComments:true}))
    .pipe(gulp.dest('docs'))
  })

gulp.task('es6', () => {
  gulp.src('src/js/main.js')
      .pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .pipe(gulp.dest('docs/assets/js'))
})

gulp.task('copy', ['clean'], () => {
    gulp.src(['src/**/*'], {
        base: 'src'
    }).pipe(gulp.dest('.'))
})

gulp.task('default', ['jekyll','es6','sass','pug','img','img-blog','thumb'])

module.exports = gulp
