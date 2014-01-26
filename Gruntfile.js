module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['*.js'],
        dest: 'backbone_d3.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat'])
}
