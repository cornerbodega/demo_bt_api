module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },

            app1: {
                files: {
                    // 'a.js': ['a.js'],
                    // 'c.js': ['b.js'],
                    'f.js': myJsArray,
                },
            },
            app2: {
                files: [
                    {
                        expand: true,
                        src: ['f.js'],
                        ext: '.annotated.js', // Dest filepaths will have this extension.
                        extDot: 'last',       // Extensions in filenames begin after the last dot
                    },
                ],
            },
        }
        //grunt task configuration will go here
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}

var myJsArray = [
    './Data-Model/pnDB.js',
    './app.js',
    './index/index-controller.js',
    './Nav/pnPathNav.js',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
    './',
]
