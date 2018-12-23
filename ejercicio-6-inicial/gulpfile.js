//1- Añadir vendor prefixes
//2- Concatenar hojas de estilo
//3- Ejecutar funciones al guardar
//4- Recargar automáticamente el navegador

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concatcss = require('gulp-concat-css'),
    browsersync = require('browser-sync').create();

function estilos(done){
  gulp.src('./src/*.css')
      .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        flexbox : true,
        grid : true
      }))
      .pipe(concatcss('style.css'))
      .pipe(gulp.dest('./dist'));
  done();
}

// Recagargar el navegador
function recargar(done){
  browsersync.reload();
  done();
}

// Servir el contenido
function servir(done){
  browsersync.init({
    server : {
      baseDir : "./"
    }
  });
  done();
}

// Observar
function observar(done){
  gulp.watch('./src/*.css',gulp.series(estilos,recargar));
  gulp.watch('./*.html', recargar);
  done();
}

gulp.task('default', gulp.series(estilos, servir, observar));
