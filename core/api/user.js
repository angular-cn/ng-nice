/*global exports,process,require*/
(function () {
    "use strict";
    var config = require("../config"),
        status = require("../status"),
        constant = require("../constant"),
        data = require("../data"),
        utils = require("../utils");

    //POST /api/user/signin
    exports.signin = function (req, res) {
        var name = req.param("name"),
            password = req.param("password"),
            is_remember = req.param("is_remember"),
            expires = false;
        if (is_remember) {
            expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        }

        data.User.check(name, name, function (err, user) {
            if (err || !user) {
                return res.send({code: status.user_error.invalid_name_or_password});
            }
            var pwd = utils.md5(password + user.salt);
            if (pwd !== user.password) {
                return res.send({code: status.user_error.invalid_name_or_password});
            }
            res.clearCookie(config.sessionKey, { path: '/' });
            res.cookie(config.sessionKey, user.id, {
                expires : expires,
                httpOnly: true,
                path    : '/',
                domain  : false,
                signed  : true
            });
            return res.send({code: status.ok});
        });
    };

    //POST /api/user/signup
    exports.signup = function (req, res) {
        var name = req.param("name"),
            password = req.param("password"),
            email = req.param("email");
        if (constant.reserved_names.indexOf(name.toLowerCase()) >= 0) {
            return res.send({code: status.user_error.name_exists});
        }
        data.User.check(name, email, function (err, user) {
            if (err) {
                return res.send({code: status.user_error.check_user_err});
            }
            if (user) {
                if (user.name === name) {
                    return res.send({code: status.user_error.name_exists});
                } else {
                    return res.send({code: status.user_error.email_exists});
                }
            } else {
                data.User.add(name, email, password, function () {
                    return res.send({code: status.ok, data: true});
                });
            }
        });
    };

    //GET /api/user/name/check
    exports.check_name = function (req, res) {
        var name = req.param("name");
        if (constant.reserved_names.indexOf(name.toLowerCase()) >= 0) {
            return res.send({code: status.ok, data: true});
        }
        data.User.check(name, name, function (err, user) {
            if (err || user) {
                return res.send({code: status.ok, data: true});
            }
            return res.send({code: status.ok, data: false});
        });
    };

    //GET /api/user/email/check
    exports.check_email = function (req, res) {
        var email = req.param("email");
        if (constant.reserved_names.indexOf(email.toLowerCase()) >= 0) {
            return res.send({code: status.ok, data: true});
        }
        data.User.check(email, email, function (err, user) {
            if (err || user) {
                return res.send({code: status.ok, data: true});
            }
            return res.send({code: status.ok, data: false});
        });
    };

    //GET /api/user
    exports.get_me = function (req, res) {
        var user = req.user;
        return res.send({code: status.ok, data: user});
    };

    //PUT /api/user
    exports.update = function (req, res) {
        var user = req.user,
            body = req.body;

        data.User.check(body.name, "", function (err, dbUser) {
            if (err) {
                return res.send({code: status.user_error.check_user_err});
            }
            if (dbUser && dbUser.id !== user.id) {
                return res.send({code: status.user_error.name_exists});
            }
            data.User.update(user.id, body.name, body.desc, function (err) {
                if (err) {
                    return res.send({code: status.user_error.check_user_err});
                }
                return res.send({code: status.ok});
            });
        });

    };

    //PUT /api/user/avatar
    exports.update_avatar = function (req, res) {
        var user = req.user,
            body = req.body;

        data.User.update_avatar(user.id, 1, body.path, function (err) {
            if (err) {
                return res.send({code: status.user_error.check_user_err});
            }
            return res.send({code: status.ok});
        });

    };

    //PUT /api/user/password
    exports.update_password = function (req, res) {
        var user = req.user,
            body = req.body;

        data.User.get_by_id(user.id,function(err,user){
            if (err) {
                return res.send({code: status.user_error.get_user_err});
            }
            var pwd = utils.md5(body.password + user.salt);
            if(user.password !== pwd){
                return res.send({code: status.user_error.invalid_password});
            }
            data.User.update_passowrd(user.id, utils.md5(body.new_password + user.salt),function(err){
                if (err) {
                    return res.send({code: status.user_error.update_pwd_err});
                }
                return res.send({code: status.ok});
            })
        });

    };
})();
