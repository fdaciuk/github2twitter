'use strict'

const gulp = require('gulp')
const spawn = require('child_process').spawn

gulp.task('lint', (cb) => {
  const cmd = spawn('npm', ['run', 'lint'], { stdio: 'inherit' })
  cmd.on('close', (code) => cb(code))
})

gulp.task('start', (cb) => {
  const cmd = spawn('nodemon', ['index.js'], { stdio: 'inherit' })
  cmd.on('close', (code) => cb(code))
})

gulp.task('start:debug', (cb) => {
  const cmd = spawn('nodemon', ['--inspect', '--debug-brk', 'index.js'], { stdio: 'inherit' })
  cmd.on('close', (code) => cb(code))
})

const debugTasks = ['lint', 'start:debug']
gulp.task('debug', debugTasks, () => {
  gulp.watch('index.js', debugTasks)
})

const defaultTasks = ['lint', 'start']
gulp.task('default', defaultTasks, () => {
  gulp.watch('index.js', defaultTasks)
})
