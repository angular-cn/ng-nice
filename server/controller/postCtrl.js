/*global process,exports,require*/
(function () {
    "use strict";
    var config = require("../config"),
        data = require("../data"),
        utils = require("../utils"),
        _ = require("lodash");


    exports.add = function (req, res) {
        res.render('post/post_edit.html', { layout: 'layout_inner', title: '添加文章', current_nav: "add_post" });
    };

    exports.edit = function (req, res) {
        res.render('post/post_edit.html', { layout: 'layout_inner', title: '编辑文章', current_nav: "my_posts" });
    };

    exports.get_list_for_me = function (req, res) {
        res.render('post/posts.html', {layout: 'layout_inner', title: '我的文章', current_nav: "my_posts" });
    };

    exports.detail = function (req, res) {
        var post_id = req.param("post_id");
        data.Post.get_by_id(post_id, function (err, post) {
            if (!post) {
                return res.redirect("/");
            }
            post.hits = post.hits + 1;
            post.save();
            var fullPost = post.makeFull();
            fullPost.publish_date = utils.date_format.fullDateTime(post.publish_date);
            fullPost.content = utils.markdown_to_html(fullPost.content);
            data.Post.get_published_for_uid(fullPost.author, 10, function (err, posts) {
                if (err) {
                    res.send({code: status.post_error.get_list_err});
                }
                var otherPosts = [];
                _.forEach(posts, function (item) {
                    if (item.id !== post.id) {
                        var title = item.title;
                        //if(title.length > 10)
                        otherPosts.push({title: title, id: item.id});
                    }
                });
                data.User.get_by_id(fullPost.author, function (err, user) {
                    fullPost.author = user.makeSimple();
                    res.render('post/detail.html', {title: fullPost.title, post: fullPost, other_posts: otherPosts, current_nav: "home" });
                });

            });

        });

    };
})();
