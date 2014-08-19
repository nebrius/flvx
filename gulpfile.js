/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@theoreticalideations.com> (http://theoreticalideations.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var gulp = require('gulp');
var traceur = require('gulp-traceur');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var del = require('del');

gulp.task('default', ['clean'], function() {
  return gulp.start(['amd', 'amd-min', 'commonjs', 'commonjs-min']);
});

gulp.task('amd', function() {
  return gulp.src('flvx.js')
    .pipe(traceur({
      experimental: true,
      modules: 'amd'
    }))
    .pipe(rename(function (path) {
        path.extname = '.amd.js';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('amd-min', function() {
  return gulp.src('flvx.js')
    .pipe(traceur({
      experimental: true,
      modules: 'amd'
    }))
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.extname = '.amd.min.js';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('commonjs', function() {
  return gulp.src('flvx.js')
    .pipe(traceur({
      experimental: true
    }))
    .pipe(rename(function (path) {
        path.extname = '.commonjs.js';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('commonjs-min', function() {
  return gulp.src('flvx.js')
    .pipe(traceur({
      experimental: true
    }))
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.extname = '.commonjs.min.js';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});
