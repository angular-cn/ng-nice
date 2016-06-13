/*global*/
'use strict';

const Base = require('./base');

class Home extends Base {
    constructor(app) {
        super(app);
        this._router.get('/', this.index.bind(this));
    }

    async index(ctx) {
        console.log("1111");
        await ctx.render('index', {
            title      : '首页',
            posts      : [],
            total      : 100,
            pager      : '',
            current_nav: "home",
            currentMenu: "home"
        });
    }
}

module.exports = Home;
