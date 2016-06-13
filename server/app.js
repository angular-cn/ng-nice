/*global __dirname,process*/
'use strict';
const Koa = require('koa');
const KoaStatic = require('koa-static');
const convert = require('koa-convert');
const ejs = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const config = require('./config');
const rootPath = config.env === 'production' ? 'www-prod' : 'www';
const port = process.env.PORT || config.port;
const router = require('./router');
const appPackage = require("../package.json");
import co from 'co';
init();

function init() {
    var localsApp = {
        title: config.title,
        version: appPackage.version,
        env: config.env,
        baseUrl: config.baseUrl
    };

    ejs(app, {
        root: path.resolve(`./${rootPath}/view`),
        layout: 'layout',
        viewExt: 'html',
        cache: false,
        locals: {config: config, app: localsApp},
        debug: true
    });
    app.context.render = co.wrap(app.context.render);

    app.use(convert(KoaStatic(rootPath + "/static")));
    app.use(bodyParser());
    router(app);
    app.listen(port, function () {
        console.log(`ng-nice app (${port}) is running.... `);
    });
}
