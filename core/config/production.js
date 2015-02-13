var config = {
    port               : 8888,
    host               : "127.0.0.1",
    domain             : ".ngnice.local",
    baseUrl            : "http://127.0.0.1:8888",
    mongoServer        : "mongodb://127.0.0.1/ngnice",
    cookieSecret      : "WOJIUSHINIUBI123456",
    errorHandlerOptions: {
        dumpExceptions: true,
        showStack     : true
    },
    passport           : {
        weibo: {
            authorizationURL: "https://api.weibo.com/oauth2/authorize",
            tokenURL        : "https://api.weibo.com/oauth2/access_token",
            clientID        : "2012243955",
            clientSecret    : "3af5d86cd7e6309bdc2076c89fd46f97",
            callbackURL     : "http://local.ngnice.com:8888/auth/weibo/callback"
        }
    }
};

module.exports = exports = config;
