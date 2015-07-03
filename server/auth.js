var config = require("./config"),
    data = require("./data"),
    kits = require("./kits"),
    domain = require("domain");

/**
 * check auth
 * @param req
 * @param res
 * @param next
 */
exports.check = function (onlyCheck) {
    return function (req, res, next) {
        if (res.locals.isAuthorized || onlyCheck) {
            next();
        } else {
            if (req.url.indexOf("/api") === 0) {
                return next({code: kits.status.error.permission_deny});
            } else {
                return res.redirect("/signin");
            }
        }
    };
};