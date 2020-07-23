let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync");
let uglify = require("gulp-uglify");
let concat = require("gulp-concat");
let rename = require("gulp-rename");
let del = require("del");
let autoprefixer = require("gulp-autoprefixer");



gulp.task("clean", async function () {
  del.sync("dist");
});

gulp.task("scss", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 version"],
      })
    )
    .pipe(rename({ suffix: ".min" }))

    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
  return gulp
    .src("app/**/*.html")
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", function () {
  return gulp
    .src([
      "node_modules/slick-carousel/slick/slick.js",
      // "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
      "node_modules/rateyo/src/jquery.rateyo.js",
      "node_modules/mixitup/dist/mixitup.js",
      "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
      "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("css", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
      // "node_modules/magnific-popup/dist/magnific-popup.css",
      "node_modules/rateyo/src/jquery.rateyo.css",
      "node_modules/ion-rangeslider/css/ion.rangeSlider.css",
      "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css",
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/scss"))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/**/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("script"));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

gulp.task("export", function () {
  let builedHtml = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));

  let builedCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));

  let builedjs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));

  let builedFonts = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));

  let builedImg = gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
});

gulp.task("builed", gulp.series("clean", "export"));

gulp.task(
  "default",
  gulp.parallel("css", "scss", "js", "browser-sync", "watch")
);
