"use strict";
var config = require("./config"),
    kits = require("./kits"),
    data = require("./data"),
    domain = require("domain");

/**
 * Init
 * @param req
 * @param res
 * @param next
 */
exports.init = function (req, res, next) {
    res.setHeader('X-Powered-By', 'ng-nice');
    req.context = {
        operationId: kits.utils.guid()
    };
    var uid = req.signedCookies[config.sessionKey];

    if (uid) {
        data.User.get_by_id(uid, function (err, user) {
            if (err || !user) {
                res.locals.isAuthorized = false;
                next();
                return;
            }
            res.locals.user = user.makeSimple();
            req.user = res.locals.user;
            res.locals.isAuthorized = true;
            next();
        });
    } else {
        res.locals.isAuthorized = false;
        next();
    }

};

exports.domainMiddleware = function (req, res, next) {
    var d = domain.create();
    d.add(req);
    d.add(res);
    d.on('error', function (err) {
        res.setHeader('Connection', 'close');
        next(err);
    });

    d.run(next);
};


exports.errorHandler = function (error, req, res, next) {
    if (error && 'number' !== typeof error) {
        if (error.code && !error.error) {
            kits.logger.warn(error, {oid: req.context ? req.context.oid : ""});
        } else {
            kits.logger.error(error, {oid: req.context ? req.context.oid : "", stack: error.stack || ""});
        }
    }
    if (req.url.indexOf("/api") === 0) {
        if (error && error.code) {
            return res.send({code: error.code});
        } else if ('number' === typeof error) {
            kits.logger.warn("response code is " + error, {oid: req.context ? req.context.oid : ""});
            return res.send({code: error});
        } else {
            return res.send({code: kits.status.error.server_error});
        }
    } else {
        return res.render('home/error.html', {title: '服务器异常', current_nav: "error"});
    }
};


exports.passport = require("./passport.js");