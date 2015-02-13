var config = require("./config"),
    WeiboStrategy = require('passport-weibo').Strategy,
//GithubStrategy = require('passport-github').Strategy,
    data = require("./data");

module.exports = exports = {
    config: function (passport) {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });

        passport.use(new WeiboStrategy({
                authorizationURL: config.passport.weibo.authorizationURL,
                tokenURL        : config.passport.weibo.tokenURL,
                clientID        : config.passport.weibo.clientID,
                clientSecret    : config.passport.weibo.clientSecret,
                callbackURL     : config.passport.weibo.callbackURL
            },
            function (accessToken, refreshToken, profile, done) {
                data.User.get_or_create(profile, function (err, user) {
                    return done(err, user);
                });
            }
        ));
    }
}
