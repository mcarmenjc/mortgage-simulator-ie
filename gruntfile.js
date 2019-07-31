module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
          dist: {
              src: [
                'node_modules/jquery/dist/jquery.js', 
                'node_modules/bootstrap/dist/js/bootstrap.js', 
                'js/data/banks-info.js', 
                'js/mortgage-repayment-calculator.js', 
                'js/mortgage-house-info.js', 
                'js/mortgage-repayment-info.js', 
                'js/mortgage-repayments-table.js', 
                'js/mortgage-form.js'
              ],
              dest: 'dist/<%= pkg.name %>.js',
          },
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'dist/<%= pkg.name %>.js',
          dest: 'dist/<%= pkg.name %>.min.js'
        }
      },
      sass: {
        dist: {
          files: {
            'style/main.css': 'scss/main.scss',
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-sass');
  
    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'sass']);
  
  };