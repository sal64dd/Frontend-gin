var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require('gulp-postcss');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Serve
gulp.task('serve', ['copy','serve-watch'], function(){
	browserSync.init({
        server: "./build"
    });
});

// watch
gulp.task('watch', ['move-bootstrap', 'move-popper', 'move-jquery'], function(){
	gulp.watch("src/sass/*.scss", ['sass']);					// sass
	gulp.watch("build/precss/*.css", ['postcss']);				// postcss
	gulp.watch("src/js/app/**/*.js", ['babel']);				// Babel js
	gulp.watch("src/**/*.html", ['html']);						// html
});

gulp.task('serve-watch', ['watch'],  function(){
	gulp.watch("build/**/*.html").on("change", reload);
	gulp.watch("build/js/**/*.js").on("change", reload);
	gulp.watch("build/css/**/*.css").on("change", function(){
		gulp.src("build/css/*.css")
			.pipe( browserSync.stream() );
	});
});

// Compile sass into /build/precss
gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
		.pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError) )
		.pipe( sourcemaps.write('./') )
        .pipe( gulp.dest("./build/precss") );
});

// Apply Postcss and write to /build/css
gulp.task('postcss', function() {
	var processors = [
		require('postcss-font-magician'),
		require('autoprefixer')
	];
	return gulp.src("build/precss/*.css")
	 	.pipe( sourcemaps.init() )
    	.pipe( postcss(processors) )
		.pipe( sourcemaps.write('.') )
    	.pipe( gulp.dest('./build/css') )
		.pipe( browserSync.stream() );
});

// Js Apply babel to /src/js/app/*.js and move to build/js
gulp.task("babel", function () {
  return gulp.src("src/js/app/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
	.on('error', function(error) {
      console.log('Babel Error: ', error);
      this.emit('end');
    })
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./build/js"));
});

// copy /src/js/include files to /build/js
gulp.task("copy", function() {
	// include js
	gulp.src("src/js/include/**/*.*")
		.pipe(gulp.dest("./build/js"));
});

// copy src/html to /build
gulp.task("html", function() {
	gulp.src("src/**/*.html")
		.pipe(gulp.dest("./build"));
});

// bootstrap
gulp.task('move-bootstrap', function(){
		// sass
		gulp.src('node_modules/bootstrap/scss/**/*.scss')
			.pipe(gulp.dest("./src/sass/bootstrap/scss"));
		// js
		gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
			.pipe(gulp.dest("./src/js/include"));
		gulp.src('node_modules/bootstrap/dist/js/bootstrap.js.map')
				.pipe(gulp.dest("./src/js/include"));
});
//jquery
gulp.task('move-jquery', function(){
		// js
		gulp.src('node_modules/jquery/dist/jquery.js')
			.pipe(gulp.dest("./src/js/include"));
		gulp.src('node_modules/jquery/dist/jquery.js.map')
				.pipe(gulp.dest("./src/js/include"));
});

//popper
gulp.task('move-popper', function(){
		// js
		gulp.src('node_modules/popper.js/dist/umd/popper.js')
			.pipe(gulp.dest("./src/js/include"));
		gulp.src('node_modules/popper.js/dist/umd/popper.js.map')
				.pipe(gulp.dest("./src/js/include"));
});
