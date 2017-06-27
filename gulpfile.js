var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    ts = require("gulp-typescript");

var fileName = "dashboard-panel";
// define tasks here
gulp.task("default", ["build"]);


gulp.task("copy_css", function(){
	gulp
		.src(["./src/*.css"])
		.pipe(gulp.dest("./dist"));
});
gulp.task("copy_html", function(){
	gulp
		.src(["./src/*.html"])
		.pipe(gulp.dest("./dist"));
});

gulp.task("build", ["copy_html", "copy_css"], function(){
	gulp
		.src([ "./typings/index.d.ts", "./src/*.ts"])
		.pipe(ts({
			noImplicitAny: false,
			out: fileName + ".js"
		}))
		.pipe(gulp.dest("./dist"))
		.pipe(rename(fileName + ".min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./dist"));
});

gulp.task("watch_sources", function () {
	gulp.watch(["./src/*.ts"], ["build"]);
})