const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const rollup = require('gulp-better-rollup')
const rollupPluginCommonjs = require('rollup-plugin-commonjs')
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve')
const babel = require('gulp-babel')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const cssnano = require('cssnano')

// Compile CSS task ---------------------
// --------------------------------------

const scss = () => {
  return gulp.src('app/assets/scss/app.scss')
    .pipe(sass({ includePaths: 'src/' }))
    // minify css add vendor prefixes and normalize to compiled css
    .pipe(postcss([
      autoprefixer,
      cssnano
    ]))
    .pipe(gulp.dest('app/public/assets/styles/'))
}

scss.displayName = 'Compile : SCSS'

// Compile js task for preview ----------
// --------------------------------------
const js = async (done) => {
  const dmFrontendSrc = 'src/digitalmarketplace/'
  const srcFiles = dmFrontendSrc + 'all.js'
  let destPath = 'app/public/assets/javascript/'
  const preparingToPublish = (process.env.DMTASK || 'development').trim().toLowerCase() === 'preparing'

  if (preparingToPublish) {
    destPath = 'package/digitalmarketplace/'
  }

  await gulp.src([
    srcFiles,
    '!' + dmFrontendSrc + '**/*.test.js'
  ])
    .pipe(rollup({
      plugins: [
        // determine module entry points from either 'module' or 'main' fields in package.json
        rollupPluginNodeResolve({
          mainFields: ['module', 'main']
        }),
        // gulp rollup runs on nodeJS so reads modules in commonJS format
        // this adds node_modules to the require path so it can find the GOVUK Frontend modules
        rollupPluginCommonjs({
          include: 'node_modules/**'
        })
      ]
    }, {
      // Used to set the `window` global and UMD/AMD export name.
      name: 'DMGOVUKFrontend',
      // UMD allows the published bundle to work in CommonJS and in the browser.
      format: 'umd'
    }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulpif(preparingToPublish,
      rename({
        basename: 'digitalmarketplace-govuk-frontend',
        extname: '.js'
      })
    ))
    .pipe(gulp.dest(destPath))

  await done()
}

js.displayName = 'Compile : JavaScript'

module.exports = {
  scss,
  js
}
