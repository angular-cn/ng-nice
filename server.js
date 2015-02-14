/*global require,process,__dirname,console*/
(function () {
    "use strict";
    var express = require('express'),
        morgan = require('morgan'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        cookieParser = require('cookie-parser'),
        expressLayout = require('express3-ejs-layout'),
        compression = require('compression'),
        http = require('http'),
        path = require('path'),
        app = express(),
        route = require("./route"),
        config = require("./core/config"),
        appPackage = require("./package.json"),
        core = require("./core/"),
        localsApp = {
            title  : config.title,
            version: appPackage.version,
            env    : config.env,
            baseUrl: config.baseUrl
        };
    app.use(compression());
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser(config.cookieSecret));
    app.set('views', __dirname + '/web/view');
    app.use(express.static(__dirname + '/web/static'));// {maxAge: 31557600000}
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);
    app.use(expressLayout);
    app.set('layout', 'layout');
    app.set("env", config.env);
    app.disable("x-powered-by");
    //启用反向代理
    app.enable('trust proxy');

    morgan.token('data', function (req) {
        return "params:" + JSON.stringify(req.params) + ",query:" + JSON.stringify(req.query) + ",body:" + JSON.stringify(req.body);
    });
    morgan.token('date', function () {
        var now = new Date();
        return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    });
    morgan.token('operationId', function (req) {
        return req.context ? req.context.operationId : "null";
    });
    if ('development' === config.env) {
        app.use(morgan(':method :url :status :remote-addr [:date][:response-time ms] [:operationId]'));
        localsApp.siteScripts = config.siteScripts;
    } else {
        app.use(morgan(':method :url :status :remote-addr [:date][:response-time ms] [:operationId]'));
        //URL 检查并重定向
        app.use(function (req, res, next) {
            console.log(req.headers.host);
            next();
        });
    }

    app.locals.app = localsApp;

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

