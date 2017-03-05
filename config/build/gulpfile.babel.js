// Basics
import gulp from 'gulp'
import path from 'path'

// Preprocessors
import pug from 'gulp-pug'
import sass from 'gulp-ruby-sass'
import babel from 'gulp-babel'

// Minifiers
import cleanHTML from 'gulp-html-minifier'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'

// Multimedia
import image from 'gulp-image'
import imageResize from 'gulp-image-resize'
import changed from 'gulp-changed'
import parallel from 'concurrent-transform'
import os from 'os'

// Utilities
import chalk from 'chalk'

// Constants
const src = '../../src/',
      build = '../../docs/'


// ----------------Tasks---------------- //


// Preprocessors
gulp.task('pug', () => {
  gulp.src(path.join(src + 'pug/index.pug'))
  .pipe(pug())
  .pipe(cleanHTML({minifyJS:true,removeComments:true}))
  .pipe(gulp.dest(build))
})
gulp.task('sass', () => {
  sass(path.join(src + 'sass/main.sass'))
  .on('error', sass.logError)
  .pipe(cleanCSS({debug: true}, (details) => {
    console.log(`
      ${chalk.blue(details.name)} before: ${chalk.red((details.stats.originalSize/1024).toFixed(2))}${chalk.red('kB')}
      ${chalk.blue(details.name)} after: ${chalk.green((details.stats.minifiedSize/1024).toFixed(2))}${chalk.green('kB')}
      `)
    }))
    .pipe(gulp.dest(path.join( build + 'assets/css')))
  })
  gulp.task('es6', () => {
    gulp.src(path.join(src + 'js/main.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest(path.join( build + 'assets/js')))
  })

// Multimedia
gulp.task('img', () => {
  gulp.src(path.join(src + 'img/assets/**/*'))
    .pipe(changed(path.join(build + 'assets/img')))
    .pipe(parallel(
        image(),
        os.cpus().length
    ))
    .pipe(gulp.dest(path.join(build + 'assets/img')))
})
gulp.task('img-blog', () => {
  gulp.src(path.join(src + 'img/photo/*.jpg'))
  .pipe(changed(path.join(build + 'assets/img/original')))
  .pipe(parallel(
      image(),
      os.cpus().length
  ))
  .pipe(gulp.dest(path.join(build + 'photo/img/original')))
})
gulp.task('thumb', () => {
  gulp.src(path.join(build + 'photo/img/original/*.jpg'))
  .pipe(changed(path.join(build + 'assets/img/thumb')))
  .pipe(parallel(
    imageResize({
      width : 640,
      height : 360,
      crop : false,
      upscale : false
    }),
      os.cpus().length
  ))
  .pipe(gulp.dest(path.join(build + 'photo/img/thumb')))
})

// Copy build folder to the root
gulp.task('copy', () => {
    gulp.src([path.join(build + '**/*')], {})
    .pipe(gulp.dest('../..'))
})

// Jekyll
gulp.task('jekyll', () => {
const jekyll = child.spawn('jekyll', ['serve','config'],[,'config/_config.yml'])
const jekyllLogger = (buffer) => {
  buffer.toString()
    .split(/\n/)
    .forEach((message) => gutil.log('Jekyll: ' + message));
}
  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})


// ----------------Bundled tasks---------------- //


gulp.task('default', ['es6','sass','pug','img','img-blog','thumb'])

module.exports = gulp
