var gulp = require('gulp');
var sass = require('gulp-sass');
var exec = require('gulp-exec');

gulp.task('compile-styles', function() {
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('precompile-handlebars', function() {
    gulp.src('./app_server/views/precompile/*.handlebars')
        .pipe(exec('handlebars ./app_server/views/precompile -f ./public/js/templates.js'));
});

gulp.task('default', function() {
    gulp.watch('./public/sass/**/*.scss',['compile-styles']);
    gulp.watch('./app_server/views/precompile/*.handlebars',['precompile-handlebars']);
});
