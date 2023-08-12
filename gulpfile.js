const buildFolder = "./build";
const srcFolder = "./src";

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulp from "gulp";
import {deleteAsync} from "del";
import {create as bsCreate} from 'browser-sync';
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";

import {otfToTtf, ttfToWoff, fontsStyle} from './tasks/fonts.js';
import { svgSprive } from './tasks/svgSprive.js';

global.app = {
    gulp: gulp,
}

const browserSync = bsCreate();
const sass = gulpSass ( dartSass ) ;

const copy = () => {
    return gulp.src('src/files/*.*')
        .pipe(gulp.dest('build'));
}

const watcher = () => {
    gulp.watch(('src/**/*.*'), copy);
    gulp.watch(('src/**/*.scss'), scss);
    gulp.watch(('src/**/*.html'), html);
    gulp.watch(('src/**/*.js'), js);
}

const reset = () => {
    return deleteAsync(('build'));
}

const html = () => {
    return gulp.src("src/**/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('build'))
}

const scss = () => {
    return gulp.src("src/scss/style.scss", {sourcemaps: true})
    .pipe(sass({
        outputStyle: "expanded"
    }))
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream())
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: "build/"
        },
        port: 3000,
        notyfy: false,
    }
)}

const image = () => {
    return gulp.src("src/img/**/*.{svg,png,jpg}")
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream())
}

const js = () => {
    return gulp.src("src/js/app.js")
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream())
}


const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, otfToTtf, html, scss, js, image, svgSprive));
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev)

import ghPages from 'gulp-gh-pages';

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});