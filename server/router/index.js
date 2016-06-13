const Home = require('./home');

module.exports = function (app) {
    new Home(app);
    //app.use(function *() {
    //    yield this.render('/index', {
    //        title: '', layout: config.appName + '/layout', data: {
    //            dd_config: {}
    //        }
    //    });
    //});
    //
    //
    //app.on('error', function (err) {
    //    console.error(err, 'server error,stack:' + err.stack);
    //    this.body = {code: 500};
    //});
};
