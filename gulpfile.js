const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const del = require('del');


// Delete Files
function clean() {
    return del(['./dist', './temp', 'src/assets/css/app.css']);
}

// compile scss into css
function compileScssForDev() {
    // 1. where is my scss file
    return src('./src/assets/scss/*.scss')
        // 2. pass that file through sass compiler
        .pipe(sass.sync({
            outputStyle: 'expanded',
            sourceComments: true
        }).on('error', sass.logError))
        // 3. where do i save the compiled css
        .pipe(dest('./temp/assets/css/'));
}

// transpile ECMA Script Js into js
function transpileJsForDev() {
    return src('./src/assets/js/*.js')
        .pipe(babel())
        .pipe(dest('./temp/assets/js/'));
}

// up local server and listen changes
function localServer() {
    browserSync.init({
        server: {
            baseDir: ['./src/', 'temp']
        }
    });
    watch(['./src/assets/js/**/*.js'], transpileJsForDev).on('change', browserSync.reload);
    watch(['./src/assets/scss/**/*.scss'], compileScssForDev).on('change', browserSync.reload);
    watch(['./src/*.html']).on('change', browserSync.reload);
    watch(['./src/assets/img/**/*']).on('change', browserSync.reload);
}

exports.serve = series(
    clean,
    compileScssForDev,
    transpileJsForDev,
    localServer
);