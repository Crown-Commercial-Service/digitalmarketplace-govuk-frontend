const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const rollup = require('gulp-better-rollup')
const rollupPluginCommonjs = require('rollup-plugin-commonjs')
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve')
const babel = require('gulp-babel')
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

// Compile js task ----------------------
// --------------------------------------
const js = async (done) => {
  const dmFrontendSrc = 'src/digitalmarketplace/'
  const srcFiles = dmFrontendSrc + 'all.js'

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
    .pipe(gulp.dest('app/public/assets/javascript/')) // save copy for review app
    .pipe(gulp.dest('package/digitalmarketplace/')) // save copy for publishing

  await done()
}

js.displayName = 'Compile : JavaScript'

module.exports = {
  scss,
  js
}
