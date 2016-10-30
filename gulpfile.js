var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compile-styles', function() {
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

// var handlebars = require('gulp-handlebars');
//
// gulp.task('compile-handlebars', function() {
//     gulp.src('./app_server/views/precompile/*.handlebars')
//         .pipe(handlebars())
//         .pipe(gulp.dest('./public/js/templates.js'))
// });

gulp.task('default', function() {
    gulp.watch('./public/sass/**/*.scss',['compile-styles']);
    // gulp.watch('./app_server/views/precompile/*.handlebars',['compile-handlebars'])
});
