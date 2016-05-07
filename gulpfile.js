var autoprefixer = require('gulp-autoprefixer'); // https://www.npmjs.com/package/gulp-autoprefixer/
var browserSync = require('browser-sync').create(); // http://www.browsersync.io/docs/gulp/
var concat = require('gulp-concat'); // https://www.npmjs.com/package/gulp-concat/
var gulp = require('gulp'); // https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
var sass = require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass/

gulp.task('js', function() {
	return gulp.src(['./js/skip-link-focus-fix.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./dist/'));
});

// sass -> css -> combine
gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions'
			]
		}))
		.pipe(gulp.dest('dist'))
		// .pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

// ### Watch
gulp.task('watch', function() {
	browserSync.init({
		files: ['{lib,templates}/**/*.php', '*.php'],
			// proxy: config.devUrl,
			proxy: 'localhost:8888',
			snippetOptions: {
				whitelist: ['/wp-admin/admin-ajax.php'],
				blacklist: ['/wp-admin/**']
		}
	});
	// gulp.watch([path.source + 'styles/**/*'], ['styles']);
	// gulp.watch([path.source + 'scripts/**/*'], ['jshint', 'scripts']);
	// gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
	// gulp.watch([path.source + 'images/**/*'], ['images']);
	// gulp.watch(['bower.json', 'assets/manifest.json'], ['build']);

	gulp.watch('js/**/*', ['js']);
	gulp.watch('sass/**/*', ['sass']);
	gulp.watch('*.php').on('change', browserSync.reload);
});

// ### Watch
gulp.task('default', function() {
	// deafult tasks
});
