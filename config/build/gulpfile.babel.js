// Basics
import gulp from 'gulp'
import path from 'path'

// Preprocessors
import pug from 'gulp-pug'
import sass from 'gulp-ruby-sass'
import babel from 'gulp-babel'

// Minifiers & SEO
import cleanHTML from 'gulp-html-minifier'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import sitemap from 'gulp-sitemap'

// Multimedia
import image from 'gulp-image'
import imageResize from 'gulp-image-resize'
import changed from 'gulp-changed'
import parallel from 'concurrent-transform'
import os from 'os'

// Utilities
import chalk from 'chalk'
import child_process from 'child_process'

// Constants
const src = '../../src/',
      build = '../../docs/',
      siteUrl = 'https://balazsorban.com'


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

// SEO
gulp.task('sitemap', () => {
    gulp.src(['../../index.html','../../{code,photo}/**/*.html'], {
            read: false
        })
        .pipe(sitemap({
            siteUrl,
            mappings: [{
              pages: 'index.html',
              priority: 1.0,
              // changefreq: 'monthly',
              lastmod: (file) => {
                let cmd = 'git log -1 --format=%cI "' + file.relative + '"'
                return child_process.execSync(cmd, {
                  cwd: file.base
                }).toString().trim()
              }
            },{
              pages: '*/index.html',
              priority: 0.8
              // changefreq: 'weekly'
            },{
              pages: '**/*.html',
              priority: 0.5
              // changefreq: 'weekly'
            }
          ]
        }))
        .pipe(gulp.dest(build))
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
    .forEach((message) => gutil.log('Jekyll: ' + message))
}
  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

// Open browser
gulp.task('open', () => {
  gulp.src(__filename)
  .pipe(open({uri: 'https://balazsorban.com'}))
})


// ----------------Bundled tasks---------------- //


gulp.task('default', ['es6','sass','pug','sitemap'])

module.exports = gulp
