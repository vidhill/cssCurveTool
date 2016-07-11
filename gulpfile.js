/**
 * Created by davidhill on 11/07/2016.
 */

var gulp = require('gulp'),
    babel = require('gulp-babel')
    ;

    gulp.task("js", () => {
        return gulp.src("src/js/*.js")
            .pipe(babel())
            .pipe(gulp.dest("dist/js"));
    });

    gulp.task("html", () => {
        return gulp.src("src/*.html")
            .pipe(gulp.dest("dist"));
    });

    gulp.task('default', ['js', 'html']);

    gulp.task('watch', () => {
        var watcher = gulp.watch('src/js/*.js', ['js']);


    });