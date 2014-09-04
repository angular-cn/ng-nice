/*global exports,module,process,require*/
(function () {
    var controller = require("./core/controller"),
        api = require("./core/api"),
        core = require("./core"),
        passport = require("passport");

    module.exports = function (app) {
        //TODO::
        app.use(core.init);
        app.use(core.domainMiddleware);

        // 微博
        app.use(passport.initialize());
        core.passport.config(passport);
        app.get('/auth/weibo', passport.authenticate('weibo'));
        app.get('/auth/weibo/callback', passport.authenticate('weibo', { failureRedirect: '/signin' }), function (req, res) {
            console.log("user:" + JSON.stringify(req.user));
            res.redirect('/');
        });

        // User
        app.post('/api/user/signin', api.user.signin);
        app.post('/api/user/signup', api.user.signup);
        app.get('/api/user/name/check', api.user.check_name);
        app.get('/api/user/email/check', api.user.check_email);
        app.get('/api/user', api.user.get_me);
        app.put('/api/user', api.user.update);
        app.put('/api/user/avatar', api.user.update_avatar);
        app.put('/api/user/password', api.user.update_password);

        // Post
        app.post('/api/post', core.check_auth, api.post.add);
        app.get('/api/posts/me', core.check_auth, api.post.get_list_me);
        app.get('/api/posts/:post_id', core.check_auth, api.post.get);
        app.put('/api/posts/:post_id', core.check_auth, api.post.update);
        app.delete('/api/posts/:post_id', core.check_auth, api.post.delete);
        app.put('/api/posts/:post_id/publish', core.check_auth, api.post.publish);
        app.put('/api/posts/:post_id/unpublish', core.check_auth, api.post.unpublish);

        //Demo API
        app.get("/api/books", api.book.get_list);
        app.post("/api/books", api.book.add_list);
        app.post("/api/book", api.book.add);
        app.put("/api/books/:bid", api.book.update);
        app.delete("/api/books/:bid", api.book.delete);
        app.post("/api/upload", api.book.upload);
        app.get("/api/test/user/name/check", api.book.check);

        // Controllers
        // Home
        app.get('/', controller.home.index);
        app.get('/hots', controller.home.hots);
        app.get('/about', controller.home.about);
        app.get('/donate', controller.home.donate);
        app.get('/error', controller.home.error);

        // User
        app.get('/signin', controller.user.signin);
        app.get('/signup', controller.user.signup);
        app.get('/logout', controller.user.logout);
        app.get('/user/:name', controller.user.home);
        app.get('/user/account/setting', controller.user.setting);

        // Post
        app.get('/post/add', controller.post.add);
        app.get('/posts/me', controller.post.get_list_for_me);
        app.get('/posts/:post_id', controller.post.detail);
        app.get('/posts/:post_id/edit', controller.post.edit);

        // Showcase
        // css return 404
        app.get(/\/showcase\/([^?]+).css$/, function (req, res) {
            res.status(404).end();
        });
        app.get('/showcase/*', controller.home.showcase);
        // Angular Docs
        app.get('/docs/*', controller.home.doc_home);
        app.get('/*', function (req, res) {
            res.redirect("/");
        });

        app.use(core.errorHandler);

    };
})();