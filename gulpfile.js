const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function server() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
}

function copy() {
    return src('./dev/js/**/*.js')
        .pipe(dest('./public/js/'))
        .pipe(browserSync.stream())
}

function html() {
    return src(['./dev/*.html'])
        .pipe(dest('./public/'))
        .pipe(browserSync.stream())
}

function scss() {
    return src('./dev/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./public/css/'))
        .pipe(browserSync.stream())
}

function watching() {
    watch('./dev/scss/**/*.scss', scss);
    watch('./dev/js/**/*.js', copy);
    watch('./dev/*.html', html);
};

exports.watching = watching;
exports.server = server;
exports.html = html;

exports.default = parallel(html, server, watching);