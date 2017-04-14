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
        src: '/Users/Benjamin/Documents/_code/commonweal',
        dest: '/',
        exclusions: ['/Users/Benjamin/Documents/_code/commonweal/.git',
        '/Users/Benjamin/Documents/_code/commonweal/.sass-cache',
        '/Users/Benjamin/Documents/_code/commonweal/css/1-base',
        '/Users/Benjamin/Documents/_code/commonweal/css/2-modules',
        '/Users/Benjamin/Documents/_code/commonweal/css/3-layouts',
        '/Users/Benjamin/Documents/_code/commonweal/css/sass',
        '/Users/Benjamin/Documents/_code/commonweal/images/ai',
        '/Users/Benjamin/Documents/_code/commonweal/images/svg-min',
        '/Users/Benjamin/Documents/_code/commonweal/images/svg-raw',
        '/Users/Benjamin/Documents/_code/commonweal/node_modules',
        '/Users/Benjamin/Documents/_code/commonweal/**/.DS_Store',
        '/Users/Benjamin/Documents/_code/commonweal/.gitignore',
        '/Users/Benjamin/Documents/_code/commonweal/.ftppass',
        '/Users/Benjamin/Documents/_code/commonweal/config.rb',
        '/Users/Benjamin/Documents/_code/commonweal/Gruntfile.js',
        '/Users/Benjamin/Documents/_code/commonweal/package.json']
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
