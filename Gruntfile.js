'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: ['app/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'app/css/app.css': 'app/scss/app.scss'
				}
			}
		},

		autoprefixer: {
			options: {
			  browsers: ['last 2 version']
			},
			targets: {
			  src: 'app/css/app.css'
			},
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'app/js/{,*/}*.js'
			]
		},

		favicons: {
			options: {
				trueColor: true,
				html: 'app/index.html'
			},
			icons: {
			  src: 'app/images/hover-ball.png',
			  dest: 'app/'
			},
		},

		imagemin: {
		    dynamic: {
		      options: {
		        optimizationLevel: 7
		      },
		      files: [{
		        expand: true,
		        cwd: 'app/',
		        src: ['**/*.{png,jpg,gif}'],
		        dest: 'app/'
		      }]
		    }
		  },

		clean: {
			dist: {
				src: ['dist/*', '!**/sftp-config.json', '!**/README.md']
			},
		},
		
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'app/',
					src: ['css/**', 'js/**', 'images/**', 'fonts/**', '**/*.html', '**/*.png', '**/*.ico', '!**/*.scss', '!bower_components/**'],
					dest: 'dist/'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/jquery/jquery.min.js', 'app/bower_components/modernizr/modernizr.js', 'app/bower_components/foundation/js/foundation.min.js'],
					dest: 'dist/js/vendor/',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/fonts/**'],
					dest: 'dist/fonts/',
					filter: 'isFile'
				},
				{
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/css/font-awesome.min.css'],
					dest: 'dist/css/',
					filter: 'isFile'
				}]
			},
		},

		useminPrepare: {
			html: 'app/*.html',
			options: {
				dest: 'dist'
			}
		},

		usemin: {
			html: ['dist/*.html'],
			css: ['dist/css/*.css'],
			options: {
				dirs: ['dist']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: 'app/scss/{,*/}*.scss',
				tasks: ['sass', 'autoprefixer']
			},
			livereload: {
				files: ['app/*.html', 'app/js/{,*/}*.js', 'app/css/{,*/}*.css', 'app/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: ['.', 'app/'],
					livereload: true
				}
			},
			dist: {
				options: {
					port: 9001,
					base: 'dist/',
					keepalive: true,
					livereload: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-favicons');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('build', ['sass', 'autoprefixer']);
	grunt.registerTask('default', ['build', 'connect:app', 'watch']);
	grunt.registerTask('favi', ['favicons']);
	grunt.registerTask('imgmin', ['imagemin']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	grunt.registerTask('publish', ['clean:dist', 'build', 'autoprefixer', 'validate-js', 'imagemin', 'useminPrepare', 'copy:dist', 'usemin']);

};