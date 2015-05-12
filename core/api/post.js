/*global exports,process,require*/
(function () {
    "use strict";
    var config = require("../config"),
        status = require("../status"),
        constant = require("../constant"),
        data = require("../data"),
        utils = require("../utils"),
        _ = require("lodash"),
        kits = require("../kits");

    //POST /api/post
    exports.add = function (req, res) {
        var title = req.param("title"),
            summary = req.param("summary"),
            content = req.param("content"),
            published = req.param("published"),
            category = req.param("category"),
            user = req.user;
        if (_.isEmpty(summary)) {
            if (content.length >= 100) {
                summary = content.substring(0, 100) + "...";
            } else {
                summary = content;
            }
        }
        
        //uid, title, summery, content, status, callback
        data.Post.add(user.id, category, title, summary, content, parseInt(published, 10), function (err) {
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok});
        })
    };

    //GET /api/posts/me
    exports.get_list_me = function (req, res) {
        var page = req.param("page"),
            size = req.param("size");
        if (!size) {
            size = config.per_page_count;
        } else {
            size = parseInt(size);
        }
        data.Post.get_list_for_uid(req.user.id, page, size, function (err, posts, total) {
            if (err) {
                res.send({code: status.post_error.get_list_err});
            }
            var new_posts = [];
            _.forEach(posts, function (item) {
                var post = item.makeFull();
                new_posts.push(post);
            });
            res.send({code: status.ok, data: {posts: new_posts, total: total}});
        });
    };

    //GET /api/posts/:post_id
    exports.get = function (req, res) {
        var post_id = req.param("post_id");
        data.Post.get_by_id(post_id, function (err, post) {
            if (err) {
                res.send({code: status.post.get_err});
            }
//            if (post.author != req.user.id) {
//                res.send({code: status.error.permission_deny});
//            }
            res.send({code: status.ok, data: post});
        });
    };

    //PUT /api/posts/:post_id
    exports.update = function (req, res) {
        var post_id = req.param("post_id"),
            user = req.user,
            body = req.body;
        var summary = body.summary,
            content = body.content;
        if (_.isEmpty(summary)) {
            if (content.length >= 100) {
                summary = content.substring(0, 100) + "...";
            } else {
                summary = content;
            }
        }
        //id, uid, category, title, summary, content, published, callback
        data.Post.update(post_id, user.id, body.category, body.title, summary, content, body.published, function (err) {
            if (err) {
                console.log("err:" + err);
                res.send({code: status.post_error.update_err});
            }
            res.send({code: status.ok});
        });
    };

    //PUT /api/posts/:post_id/publish
    exports.publish = function (req, res) {
        var post_id = req.param("post_id"),
            user = req.user;

        data.Post.publish(post_id, user.id, function (err) {
            if (err) {
                console.log("err:" + err);
                res.send({code: status.post_error.publish_err});
            }
            res.send({code: status.ok});
        });
    };

    //PUT /api/posts/:post_id/unpublish
    exports.unpublish = function (req, res) {
        var post_id = req.param("post_id"),
            user = req.user;

        data.Post.unpublish(post_id, user.id, function (err) {
            if (err) {
                console.log("err:" + err);
                res.send({code: status.post_error.publish_err});
            }
            res.send({code: status.ok});
        });
    };

    //DELTE /api/posts/:post_id
    exports.delete = function (req, res) {
        var post_id = req.param("post_id"),
            user = req.user;

        data.Post.delete(post_id, user.id, function (err) {
            if (err) {
                console.log("err:" + err);
                res.send({code: status.post_error.delete_err});
            }
            res.send({code: status.ok});
        });
    };
})();
