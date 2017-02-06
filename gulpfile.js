var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var browserSync = require('browser-sync').create();
var nodemon = require('nodemon');

gulp.task('default', ['serve']);

gulp.task("webpack", function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('serve', ['webpack', 'nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:8088",
    });

    gulp.watch(['views/**/*', 'public/**/*', 'server.js'], browserSync.reload);
    gulp.watch('app/**/*', ['webpack'], browserSync.reload);
});


gulp.task('nodemon', function (cb) {

  var started = false;

  let stream = nodemon({
    script: 'server.js',
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', function () {
    console.log('restarted!')
  })
  .on('crash', function() {
    console.error('Application has crashed!\n')
     stream.emit('restart', 10)
  });

  return stream;
});
