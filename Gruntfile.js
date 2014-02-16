module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      dist: {
        src: ['src/initialize.js', 'src/d3_model.js', 'src/d3_collection.js', 'src/d3_view.js'],
        dest: 'b3.js',
      }
    },
    coffee: {
      files: {
        "src/initialize.js": "src/initialize.coffee",
        "src/d3_model.js": "src/d3_model.coffee",
        "src/d3_collection.js": "src/d3_collection.coffee",
        "src/d3_view.js": "src/d3_view.coffee",
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-coffee");

  grunt.registerTask('default', ['coffee', 'concat']);
}
