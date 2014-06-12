/*global grunt*/
module.exports = function (grunt) {

    var config = require("./config.js");
    var site_scripts = [];
    for (var i = 0; i < config.site_scripts.length; i++) {
        site_scripts.push("web/static/" + config.site_scripts[i]);
    }
    // Project configuration.
    grunt.initConfig({
        pkg   : grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src : site_scripts,//['res/lib/jquery/1.11.0/jquery.js','res/lib/bootstrap/3.1.1/js/bootstrap.js', 'res/js/main.js'],
                dest: 'web/static/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build  : {
                src : 'web/static/js/<%= pkg.name %>.js',
                dest: 'web/static/js/<%= pkg.name %>.min.js'
            }
        }
    });

    // 从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');

    // 每行registerTask定义一个任务
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('check', ['jshint']);

};