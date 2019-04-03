const gulp = require('gulp');
var browserSync = require('browser-sync');
var cp          = require('child_process');
const sourcemaps = require('gulp-sourcemaps')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const minify = require('rollup-plugin-babel-minify')


gulp.task('js', () => {
    gulp.src('_mjs/main.js')
      .pipe(sourcemaps.init())
      .pipe(rollup({
        // There is no `input` option as rollup integrates into the gulp pipeline
        plugins: [
          babel({
            presets: [
              [
                'env',
                {
                  modules: false
                }
              ]
            ],
            plugins: [
              "external-helpers",
            ]
          }),
          minify( {
            // Options for babel-minify.
          } )
        ]
      }, {
        // Rollups `sourcemap` option is unsupported. Use `gulp-sourcemaps` plugin instead
        format: 'iife',
      }))
      // inlining the sourcemap into the exported .js file
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('script/'))     
})

// gulp.task('js:watch', function () {
//     gulp.watch('_mjs/**/*.js', ['js']);
// });

// gulp.task('watch', ['js:watch']);

gulp.task('default', ['watch']);

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
var browserSyncRoutes = {
}

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['js', 'jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['js', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site',
            routes: browserSyncRoutes
        }
    });
});

gulp.task('watch', function () {
    gulp.watch([
        './*',
        '_mjs/**/*',
        'script/**/*'
    ], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);