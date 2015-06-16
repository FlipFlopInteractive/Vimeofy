/*global module:false*/
module.exports = function( grunt ){

	// load all grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	// Project configuration.
	grunt.initConfig({

		clean: {
			all: {
				src: './dist/*'
			}
		},

		copy: {
			all: {
				expand : true,
				dest: './dist/',
				cwd: './src/assets/',
				src: [ '**/*.*' ]
			},
		},
		
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require( 'jshint-stylish' )
			},
			all: [
				'Gruntfile.js',
				'./src/scripts/*.js',
			]
		},

		bower_concat: {
			all: {
				dest: './dist/js/libs.js',
				exclude: [
					'normalize.less'
				],
			}
		},

		concat: {
			all: {
				src: './src/scripts/vimeofy.js',
				dest: './dist/js/vimeofy.js'
			}
		},

		uglify: {
			all: {
				files: {
					'./dist/js/libs.js': './dist/js/libs.js'
				}
			}
		},

		less: {
			all: {
				files: {
					'./dist/css/styles.css': './src/styles/styles.less'
				}
			},
		},

		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},

			all: {
				src: './dist/css/styles.css'
			},
		},

		express: {
		    all: {
		        options: {
		            bases: [ './dist/' ],
		            port: 9000,
		            hostname: 'localhost',
		            livereload: true,
		            keepalive: true
		        }
		    }
		},

		watch: {
		    all: {
		    	files: [
		    		'Gruntfile.js',
					'./src/**/*.*'
		    	],
		    	tasks: [ 
		    		'prepare:development'
		    	],
	            options: {
    	            livereload: true
		        }
		    }
		},

		open: {
			all: {
				path: 'http://localhost:<%= express.all.options.port %>'
			}
		},
	});

	grunt.registerTask( 'prepare:development', [

		'clean:all',
		'copy:all',
		'jshint:all',
		'bower_concat:all',
		'concat:all',
		// 'uglify:all',
		'less:all',
		'autoprefixer:all',
	]);	

	grunt.registerTask( 'development', [

		'prepare:development',
		'open:all',
		'express:all',
		'watch:all'
	]);
};
