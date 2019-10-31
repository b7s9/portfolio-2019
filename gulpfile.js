const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
// const babel = require('gulp-babel');
// const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');

// --------------------------------------------------------
// init
// --------------------------------------------------------
// gulp.task('default', ['watch']);

// gulp.task('watch', () => {
// 	gulp.watch('./src/pages/**/*.+(html|njk)', 'nunjucks');
// });

// --------------------------------------------------------
// nunjucks
// --------------------------------------------------------
gulp.task('nunjucks', () => {
	// get .html|.njk files in 'pages'
	return gulp.src('./src/pages/**/*.+(html|njk)')
	// render template with nunjucks
	.pipe(data(() => {
		return require('./src/data/data.json');
	}))
	// render template with nunjucks
	.pipe(nunjucksRender({
	path: ['./src/templates']
	}))
	// output files to build folder
	.pipe(gulp.dest('build'));
});

// --------------------------------------------------------
// JS
// --------------------------------------------------------

gulp.task('js', ()=> {
	return gulp.src('./src/js/*.js') // or 'src/**/*.js'
		.pipe( sourcemaps.init() )	

		// lint
		// .pipe( eslint( {fix:true} ) )
		// .pipe( eslint.format() )
		// .pipe( eslint.failAfterError() )

		// compile
		.pipe( concat('main.min.js') )
		// .pipe( babel({
		// 	presets:['@babel/env']
		// }) )
		.pipe( uglify() )
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest('./build/assets/js/') );
});

// gulp.task('watch', ()=> {
// 	gulp.watch('./assets/js/**/*.js', ['js']);
// 	gulp.watch('./assets/css/*.+(scss|sass)', ['css']);
// });

// gulp.task('default', ['watch']);


// --------------------------------------------------------
// STYLE
// --------------------------------------------------------

gulp.task('css', () => {
	return gulp.src('./src/style/*.+(scss|sass|css)')
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(uglifycss() )		
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/assets/style/'));
});


// --------------------------------------------------------
// Asset Optimization
// --------------------------------------------------------

// gulp.task('font-minify', ()=>{
//     return gulp.src('_fonts/Junicode')
//         .pipe( fontmin({
//             text: ''
//         }) )
//         .pipe( gulp.dest('./assets/fonts/Junicode') )
//     ;
// });

// --------------------------------------------------------
// Helper fn
// --------------------------------------------------------

// const parsehtml = (path) =>{

//     // fs.readFile('path', (err, data) => {
//     //     console.log(data);
//     // });
//     let data = '';
//     let stream = fs.createReadStream(path, {start: 0} );

//     stream.on('data', (chunk)=> {
//         data+=chunk;

//     });

//     stream.on('end', ()=> {
//         console.log(data);
//     });

//     stream.on('error', (err)=> {
//         console.log(err.stack);
//     });

// };

// gulp.task('test', ()=> {
//     parsehtml('about.html');
// });