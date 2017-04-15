module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/screen.css': 'css/sass/screen.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: 8000,
          livereload: true
        }
      }
    },

    watch: {
      options: {
        spawn: true
      },
      sass: {
        files: [
          'css/sass/*.scss'
        ],
        tasks: ['sass'],
        // options: {
        //   spawn: true
        // },
      },
      livereload: {
        files: [
          '*.html',
          'css/*.css'
        ],
        options: {
          livereload: true,
          spawn: true
        },
      },
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.point5.com',
          port: 21,
          authKey: 'key1'
        },
        src: '/Users/Benjamin/Documents/_code/webtype-test',
        dest: '/webtype',
        exclusions: ['/Users/Benjamin/Documents/_code/webtype-test/.git',
        '/Users/Benjamin/Documents/_code/webtype-test/.sass-cache',
        '/Users/Benjamin/Documents/_code/webtype-test/css/sass',
        '/Users/Benjamin/Documents/_code/webtype-test/node_modules',
        '/Users/Benjamin/Documents/_code/webtype-test/**/.DS_Store',
        '/Users/Benjamin/Documents/_code/webtype-test/.gitignore',
        '/Users/Benjamin/Documents/_code/webtype-test/.ftppass',
        '/Users/Benjamin/Documents/_code/webtype-test/Gruntfile.js',
        '/Users/Benjamin/Documents/_code/webtype-test/package.json']
      }
    },

    cachebreaker: {
      dev: {
        options: {
          match: ['css/screen.css'],
        },
        files: {
          src: ['*.html']
        }
      }
    },
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-cache-breaker');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('deploy', ['cachebreaker', 'ftp-deploy']);
};
