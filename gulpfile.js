/**
 * Created by suhov on 02.11.2016.
 */
//Установка пакетов - npm i --save-dev gulp gulp-ruby-sass gulp-sass browser-sync gulp-concat gulp-uglifyjs gulp-cssnano gulp-rename del gulp-imagemin imagemin-pngquant gulp-cache gulp-notify gulp-clean-css gulp-autoprefixer gulp-sourcemaps
var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),//Подключаем Sass sourcemap пакет,
	sass = require('gulp-ruby-sass'), //Подключаем Sass пакет,
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename      = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant    = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache       = require('gulp-cache'), // Подключаем библиотеку кеширования
	notify      = require('gulp-notify'),
	cleanCSS    = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function () {
	sass('app/css/*.sass', {noCache: true})
		.on("error", sass.logError)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: 'source'
		}))
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css/'))
		.pipe(notify('Done.'))
		.pipe(browserSync.reload({stream: true}));// Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/js/*.js', // Берем jQuery
	])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('img', function() {
	return gulp.src('app/img/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('app/img')); // Выгружаем на продакшен
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('app/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});


gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим CSS стили в продакшен
		'app/css/*.min.css'] )
		.pipe(gulp.dest('src/css'));

	var buildJs = gulp.src('app/js/libs.min.js') // Переносим скрипты в продакшен
		.pipe(gulp.dest('src/js'));

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
		.pipe(gulp.dest('src'));

	var buildIMG = gulp.src('app/img/*') // Переносим img в продакшен
		.pipe(gulp.dest('src/img/'));

});

gulp.task('default', ['watch']);

gulp.task('clear', function () {
	return cache.clearAll();
});