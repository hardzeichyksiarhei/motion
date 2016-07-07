'use strict';

var
    gulp         = require('gulp'),
    watch        = require('gulp-watch'),
    prefixer     = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    rigger       = require('gulp-rigger'),
    cssmin       = require('gulp-minify-css'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    rimraf       = require('rimraf'),
    browserSync  = require('browser-sync'),
    rename       = require('gulp-rename'),
    critical     = require('critical'),
    reload       = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        php: 'build/php/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        php: 'src/php/*.php'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        php: 'build/php/**/*.php'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_template"
};

gulp.task('html:build', function () {
   gulp.src(path.src.html)
       .pipe(rigger())
       .pipe(gulp.dest(path.build.html))
       .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
   gulp.src(path.src.js)
       .pipe(rigger())
       .pipe(uglify())
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(gulp.dest(path.build.js))
       .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
   gulp.src([path.src.style, 'src/style/skins/*.scss'])
       .pipe(sass().on('error', sass.logError))
       .pipe(prefixer({ browsers: ['last 5 versions'] }))
       .pipe(cssmin())
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(gulp.dest(path.build.css))
       .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
   gulp.src(path.src.img)
       .pipe(imagemin({
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           use: [pngquant()],
           interlaced: true
       }))
       .pipe(gulp.dest(path.build.img))
       .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('php:build', function() {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'php:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);