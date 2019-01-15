const maps = require('gulp-sourcemaps')
const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const babelify = require('babelify')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const sequence = require('run-sequence')

gulp.task('compile', () => {
    return gulp.src(['./src/application/**/*.js', '!./src/application/vendor/*.js'])
    .pipe( maps.init() )
    .pipe( concat('app.min.js') )
    .pipe( gulp.dest('./dist/application') )
})

gulp.task('html', () => {
    return gulp.src('./src/index.html')
    .pipe( connect.reload() )
})

gulp.task('transfile', () => {
    return browserify({
        entries: ['./dist/application/app.min.js']
    })
    .transform( babelify )
    .bundle()
    .pipe( source('app.min.js') )
    .pipe( gulp.dest('./dist/application') )
});

gulp.task('build', () => sequence('compile', 'transfile'))
gulp.task('connect', () => connect.server({ livereload: true, root: './dist' }))

gulp.task('watch', () => {
    gulp.watch('./src/sass/style.scss', ['sass'])
    gulp.watch('./src/index.html', ['html'])
})

gulp.task('sass', () => {
    return gulp.src('./src/sass/style.scss')
    .pipe( maps.init() )
    .pipe( sass({ expended: true }).on( 'error', sass.logError ) )
    .pipe( maps.write('./') )
    .pipe( gulp.dest('./src/css') )
    .pipe( gulp.dest('./dist/css') )
    .pipe( connect.reload() )
})

gulp.task('default', ['connect', 'watch', 'sass'])