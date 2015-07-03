var _ = require('lodash');

var config = {
    sessionKey  : "xid",
    perPageCount: 20,
    title       : "AngularJS Nice Things",
    siteScripts : [
        "lib/jquery/1.11.0/jquery.js",
        "lib/bootstrap/3.1.1/js/bootstrap.js",
        "lib/bootstrap/notify/1.0.0/js/bootstrap-notify.js",
        "lib/angular/1.2.16/angular.js",
        "lib/w5cValidator/2.0.0/w5cValidator.js",
        "lib/angular-ui/ui-bootstrap/0.9.0/ui-bootstrap-tpls.js",
        "lib/highlight/8.0/highlight.pack.js",
        "lib/lodash/2.4.1/lodash.js",
        "lib/marked/0.3.2/marked.js",
        "lib/moment/2.6.0/moment.js",
        "js/main.js",
        "js/service/service.js",
        "js/filter/filter.js",
        "js/directive/directive.js",
        "js/controller/user.js",
        "js/controller/post.js",
        "js/controller/home.js",
        "js/status.js"
    ]
};

initConfig();

module.exports = exports = config;

function initConfig() {
    var env = process.env.NODE_ENV;
    if (!env) {
        env = 'development';
    }
    switch (env.toLowerCase()) {
        case 'dev':
        case 'development':
            env = 'development';
            break;
        case 'prod':
        case 'production':
            env = 'production';
            break;
        case 'test':
            env = 'test';
            break;
        default:
            break;
    }
    var envConfig = require("./" + env);
    config = _.merge(config, envConfig);
    config.env = env;
};