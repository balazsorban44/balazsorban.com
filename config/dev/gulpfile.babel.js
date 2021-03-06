// Basics
import gulp from 'gulp'
import path from 'path'

// Preprocessors
import pug from 'gulp-pug'
import sass from 'gulp-ruby-sass'
import babel from 'gulp-babel'

// Multimedia
import image from 'gulp-image'
import imageResize from 'gulp-image-resize'
import changed from 'gulp-changed'
import parallel from 'concurrent-transform'
import os from 'os'

// Utilities
import chalk from 'chalk'
import child from 'child_process'
import gutil from 'gulp-util'
import jshint from 'gulp-jshint'
import livereload from 'gulp-livereload'
import open from 'gulp-open'

// Constants
const src = '../../src/',
      build = '../../docs/'

// ----------------Tasks---------------- //


// Preprocessors
gulp.task('pug', () => {
  gulp.src(path.join(src + 'pug/index.pug'))
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest(build))
  .pipe(livereload({quiet:true}))
})
gulp.task('sass', () => {
  sass(path.join(src + 'sass/main.sass'))
  .on('error', sass.logError)
  .pipe(gulp.dest(path.join(build + 'assets/css')))
  .pipe(livereload({quiet:true}))
})
gulp.task('es6', () => {
  gulp.src(path.join(src + 'js/main.js'))
  .pipe(jshint({
    esversion: 6,
    asi: true,
    unused: true
  }))
  .pipe(jshint.reporter('default'))
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest(path.join(build + 'assets/js')))
  .pipe(livereload({quiet:true}))
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

// Jekyll
gulp.task('jekyll', () => {
const jekyll = child.spawn('jekyll', ['serve','config'],[,'config/dev/_config.yml'])
const jekyllLogger = (buffer) => {
  buffer.toString()
    .split(/\n/)
    .forEach((message) => gutil.log('Jekyll: ' + message));
}
  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

// Open browser
gulp.task('open', () => {
  gulp.src(__filename)
  .pipe(open({uri: 'http://0.0.0.0:4000'}))
})


// ----------------Bundled tasks---------------- //


gulp.task('preprocess', ['sass','pug','es6', 'img', 'img-blog'])
gulp.task('watch', () => {
  livereload.listen({quiet:true})
  gulp.watch(path.join(src + 'img/**/*'), ['img','img-blog'])
  gulp.watch(path.join(build + 'photo/img/original'), ['thumb'])
  gulp.watch(path.join(src + 'sass/**/*.sass'), ['sass'])
  gulp.watch([path.join(src + 'pug/**/*'),path.join(src + 'js/schema.json')], ['pug'])
  gulp.watch(path.join(src + 'js/*.js'), ['es6'])
  livereload.reload({quiet:true})
})
gulp.task('default', ['jekyll','preprocess','watch','open'])

module.exports = gulp
