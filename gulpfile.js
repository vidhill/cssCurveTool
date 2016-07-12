/**
 * Created by davidhill on 11/07/2016.
 */

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util')
    ;

    var browserifyOpts = {
        entries: ['src/js/app.js'],
        debug: true,
        cache: {},
        packageCache: {},
        plugin: [watchify]
    };

    var b = browserify(browserifyOpts);

    b.transform('babelify', { presets: [ 'es2015' ] } );
    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', gutil.log); // output build logs to terminal

    var b2 = browserify(browserifyOpts2);


    function bundle(){
        return b.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist/js'));
    }

    gulp.task("watchjs", bundle);


    gulp.task("html", () => {
        return gulp.src("src/*.html")
            .pipe(gulp.dest("dist"));
    });

    gulp.task('default', ['html']);