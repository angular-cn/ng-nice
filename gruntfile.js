/*global grunt*/
module.exports = function (grunt) {

    var config = require("./core/config");
    var siteScripts = [];
    for (var i = 0; i < config.siteScripts.length; i++) {
        siteScripts.push("web/static/" + config.siteScripts[i]);
    }
    // Project configuration.
    grunt.initConfig({
        pkg   : grunt.file.readJSON('package.json'),
        concat: {
            js: {
                //['res/lib/jquery/1.11.0/jquery.js','res/lib/bootstrap/3.1.1/js/bootstrap.js', 'res/js/main.js'],
                // 这里的site_scripts是从配置文件读取的，因为layout也需要读取site_scripts，如果仅仅是这个地方使用到，可以按照上面的方式写死
                src : siteScripts,
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
        },
        less       : {
            compile: {
                files: {
                    "web/static/css/css.css"      : "web/static/css/css.less"
                }
            }
        },
        jsdoc : {
            basic: {
                src    : ['core/api/user.js', 'core/api/post.js'],
                options: {
                    destination: 'docs/basic'
                }
            },
            docstrap : {
                src :  ['core/api/user.js', 'core/api/post.js'],
                options : {
                    destination : 'docs/docstrap',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    // 从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-watch');

    // 每行registerTask定义一个任务
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('lessc', ['less']);
    grunt.registerTask('doc', ['jsdoc']);

};