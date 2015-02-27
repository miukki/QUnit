// common js
module.exports = function(grunt) {
	//var mozjpeg = require('imagemin-mozjpeg');
  //register all contrib-task
  require('load-grunt-tasks')(grunt);

	//reg my own task
  grunt.registerMultiTask('test', 'description', function() {
	    grunt.util.async.forEach(this.filesSrc, function(file, next) {
			console.log('!!', file); //write task for make data-uri
	    }, this.async());
	});

  grunt.initConfig({

    test: {
      filesSrc: './img/*'
		},


		pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
        options: {
            browsers: ['ff', 'Opera 12.1' ,'ie 8', 'ie 9', 'ff', 'ie', 'ios_saf', 'op_mob', 'op_mini', 'and_chr', 'and_ff', 'ie_mob']
        },
        development: {
            expand: true,
            flatten: true,
            src: './assets/main.css',
            dest: './assets/'
        }
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          './assets/main.css': './assets/main.less'
        }
      },
    },

    watch: {
      styles: {
        files: ['./assets/main.less', './assets/partials/*.less'], // which files to watch
        tasks: ['imagemin', 'less', 'autoprefixer'],
        options: {
          nospawn: true
        }
      }
    },

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'imgmin/'
				}]
			}
		},

		connect: {
      server: {
        options: {
    			hostname: 'localhost',
          port: 3001,
          base: '.',
    			keepalive: true,
    			directory: '.'
        }
      }
		},

		//syntax
		jshint: {
      files: ['scripts/main.js', 'scripts/**/*.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
  		options: {
        separator: ';'
  		 },
      main: {
        src: [
            'scripts/main.js',
        ],
        dest: 'build/scripts.js'
      }

    },

    //uglify
		requirejs: {
			options: {
				baseUrl: '.',
				nextame: 'main',
				out: 'build/app.js'
			}
		},

    uglify: {
      main: {
        files: {
          'build/scripts.min.js': '<%= concat.main.dest %>'
        }
      }
    }


  });


  //not need it because we registered all contrib-task
  /*

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  */

  grunt.registerTask('default', ['jshint', 'watch']);

};
