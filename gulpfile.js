'use strict'

const gulp = require('gulp')
const spawn = require('child_process').spawn

gulp.task('lint', (cb) => {
  const cmd = spawn('npm', ['run', 'lint'], { stdio: 'inherit' })
  cmd.on('close', (code) => cb(code))
})

gulp.task('start', (cb) => {
  const cmd = spawn('npm', ['start'], { stdio: 'inherit' })
  cmd.on('close', (code) => cb(code))
})

gulp.task('default', ['lint', 'start'], () => {
  gulp.watch('index.js', ['lint', 'start'])
})
