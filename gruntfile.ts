﻿const sass = require('node-sass');

//npm install --global --production windows-build-tools
module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: 35729,
                },
            },
        },

        // Sass
        sass: {
            options: {
                implementation: sass,
                sourceMap: false, // Create source map
                outputStyle: 'uncompressed', // Minify output
            },
            dist: {
                files: [
                    {
                        expand: true, // Recursive
                        cwd: 'src/style', // The startup directory
                        //src: ["**/*.scss"], // Source files
                        src: ['**/main.scss'], // Source files
                        dest: 'src', // Destination
                        ext: '.css', // File extension,
                    },
                ],
            },
        },
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['sass']);
};
