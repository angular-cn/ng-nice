/*global*/
'use strict';

const Router = require('koa-router');

class Basic {
    constructor(app, options) {
        this._router = new Router(options);
        app.use(this._router.routes());
        app.use(this._router.allowedMethods());
    }
}

module.exports = Basic;
