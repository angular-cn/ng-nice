/*global require,process,__dirname,console*/
(function () {
    "use strict";
    var express = require('express'),
        morgan = require('morgan'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        cookieParser = require('cookie-parser'),
        express_layout = require('express3-ejs-layout'),
        compression = require('compression'),
        http = require('http'),
        path = require('path'),
        app = express(),
        route = require("./route"),
        config = require("./config.js"),
        app_package = require("./package.json"),
        core = require("./core/"),
        locals_app = {
            title: "AngularJS Nice Things",
            version: app_package.version,
            env: config.env
        };
    app.use(compression());
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser(config.cookie_secret));
    app.set('views', __dirname + '/web/view');
    app.use(express.static(__dirname + '/web/static'));// {maxAge: 31557600000}
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);
    app.use(express_layout);
    app.set('layout', 'layout');
    app.disable("x-powered-by");

    morgan.token('data', function (req) {
        return "params:" + JSON.stringify(req.params) + ",query:" + JSON.stringify(req.query) + ",body:" + JSON.stringify(req.body);
    });
    morgan.token('date', function () {
        var now = new Date();
        return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    });
    if ('development' === config.env) {
        app.use(morgan(':method :url :status :remote-addr :data [:date][:response-time ms]'));
    } else {
        app.use(morgan(':method :url :status :remote-addr [:date][:response-time ms]'));
    }
    // development only
    if ('development' === config.env) {
        locals_app.site_scripts = config.site_scripts;
    }
    app.locals.app = locals_app;

    //初始化路由
    route(app);

    //create server
    app.listen(config.port, function () {
        console.log('ng-nice server listening on port ' + config.port + " in env " + config.env);
    });

    if (config.env === 'production') {
        process.on("uncaughtException", function (err) {
            console.log("process uncaughtException:" + err);
        });
    }
})();

