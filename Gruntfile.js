module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      dist: {
        src: ['src/initialize.js', 'src/d3_model.js', 'src/d3_collection.js', 'src/d3_view.js'],
        dest: 'b3.js',
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat'])
}
