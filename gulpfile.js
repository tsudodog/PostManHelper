const gulp = require('gulp')
const concat = require('gulp-concat')
const moment = require('moment')
function defaultTask(cb){
  cb();
}

gulp.task('concat', function(){
   const now = moment().format('MMMM Do YYYY, h:mm:ss a')
    return gulp.src('./Responses/*.json')
  .pipe(concat(`${now}-all.json`))
  .pipe(gulp.dest('./dist/'))
})

