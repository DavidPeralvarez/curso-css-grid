/* Dependencias */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concatcss = require('gulp-concat-css'),
    browserSync = require('browser-sync').create();

/* Tareas
1- Añadir vendor prefixes
2- Concatenar
3- Ejecutar la tarea al guardar
4- Recargar automáticamente el navegador
*/

gulp.task('servir', ['estilos'], function(){
  browserSync.init({
    open: false,
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/*.css', ['estilos']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('estilos', function(){
  return  gulp.src('./src/*.css')
          .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            grid: true
          }))
          .pipe(concatcss('style.css'))
          .pipe(gulp.dest('./dist'))
          .pipe(browserSync.stream())
});

gulp.task('default',['servir']);
