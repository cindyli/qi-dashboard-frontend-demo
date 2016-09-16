/*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

// Declare dependencies
/* global module */

module.exports = function (grunt) {
    "use strict";

    var licenseWrapper = function (libraryName, licenseFilePath) {
        try {
            return "/* " + libraryName + "\n" + grunt.file.read(licenseFilePath) + "*/\n";
        }
        catch (e) {
            return null;
        }
    };

    // Project configuration.
    grunt.initConfig({
        // Project package file destination.
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: ["**/*.js"],
            buildScripts: ["Gruntfile.js"],
            options: {
                jshintrc: true
            }
        },
        jsonlint: {
            all: ["package.json", ".jshintrc", "src/**/*.json", "tests/**/*.json", "demos/**/*.json"]
        },
        copy: {
            // Copy external front end dependencies into appropriate directories
            frontEndDependencies: {
                files: [
                    // D3
                    {expand: true, cwd: "./node_modules/d3/", src: "**", dest: "./src/lib/d3/"},
                    // Chart Authoring
                    {expand: true, cwd: "./node_modules/chartAuthoring/", src: "**", dest: "./src/lib/chartAuthoring/"},
                    // Flocking
                    {expand: true, cwd: "./node_modules/flocking/", src: "**", dest: "./src/lib/flocking/"}

                ]
            },
            cssToDist: {
                files: [
                    {src: "demos/src/css/qi-frontend-panels.css", dest: "dist/css/qi-frontend.css"}
                ]
            },
            demosToDist: {
                files: [
                    {expand: true, cwd: "./demos/", src: "**", dest: "./dist/demos/"}
                ]
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            chartAuthoringWithLicense: {
                options: {
                    banner: licenseWrapper("Chart Authoring Tool", "src/lib/chartAuthoring/LICENSE.txt")
                },
                src: "src/lib/chartAuthoring/src/js/**",
                dest: "dist/chartAuthoring-with-license.js",
                nonull: true
            },
            d3WithLicense: {
                options: {
                    banner: licenseWrapper("D3", "src/lib/d3/LICENSE")
                },
                src: ["src/lib/d3/d3.min.js"],
                dest: "dist/d3-with-license.js",
                nonull: true
            },
            flockingWithLicense: {
                options: {
                    banner: licenseWrapper("Flocking", "src/lib/flocking/MIT-LICENSE.txt")
                },
                src: ["src/lib/flocking/dist/flocking-base.js", "src/lib/flocking/src/ugens/oscillators.js", "src/lib/flocking/src/ugens/math.js",
                "src/lib/flocking/src/ugens/envelopes.js",
                "src/lib/flocking/src/ugens/midi.js",
                "src/lib/flocking/src/ugens/scheduling.js"],
                dest: "dist/flocking-with-license.js",
                nonull: true
            },
            infusionWithLicense: {
                options: {
                    banner: licenseWrapper("Infusion", "src/lib/infusion/Infusion-LICENSE.txt")
                },
                src: ["src/lib/infusion/infusion-custom.js"],
                dest: "dist/infusion-with-license.js",
                nonull: true
            },
            infusionNoJQueryWithLicense: {
                options: {
                    banner: licenseWrapper("Infusion", "src/lib/infusion/Infusion-LICENSE.txt")
                },
                src: ["src/lib/infusion/infusion-custom-noJquery.js"],
                dest: "dist/infusion-noJquery-with-license.js",
                nonull: true
            },
            dist: {
                src: ["dist/d3-with-license.js",
                 "dist/infusion-with-license.js",
                 "dist/flocking-with-license.js",
                 "dist/chartAuthoring-with-license.js",
                "src/js/*.js"],
                dest: "dist/js/qi-frontend-full.js",
                nonull: true
            },
            distNoJquery: {
                src: ["dist/d3-with-license.js",
                 "dist/infusion-noJquery-with-license.js",
                 "dist/flocking-with-license.js",
                 "dist/chartAuthoring-with-license.js",
                "src/js/*.js"],
                dest: "dist/js/qi-frontend-noJquery.js",
                nonull: true
            }
        },
        clean: {
            distArtifacts: {
                src: ["dist/*-with-license.js"]
            }
        },
        uglify: {
            options: {
                banner: "/* ! minified version of Javascript dependencies of https://github.com/waharnum/qi-dashboard-frontend-demo - see repository for details */"
            },
            distUglify: {
                src: "dist/js/qi-frontend-full.js",
                dest: "dist/js/qi-frontend-full.min.js"
            },
            distNoJQueryUglify: {
                src: "dist/js/qi-frontend-noJquery.js",
                dest: "dist/js/qi-frontend-noJquery.min.js"
            }
        },
        exec: {
            infusionInstall: {
                command: "npm install",
                cwd: "./node_modules/infusion"
            },
            infusionBuild: {
                command: "grunt custom --source=true --include='enhancement,renderer'",
                cwd: "./node_modules/infusion"
            },
            infusionBuildNoJquery: {
                command: "grunt custom --source=true --include='enhancement,renderer' --exclude='jQuery'",
                cwd: "./node_modules/infusion"
            }
        }
    });

    // Load the plugin(s):
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jsonlint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-exec");

    // Custom tasks:

    grunt.registerTask("default", ["lint"]);
    grunt.registerTask("lint", "Apply jshint and jsonlint", ["jshint", "jsonlint"]);
    grunt.registerTask("dist", "Build single-file distrbituion", ["copy:cssToDist", "copy:demosToDist", "concat", "uglify", "clean:distArtifacts"]);
};
