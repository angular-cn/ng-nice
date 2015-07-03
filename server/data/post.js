var util = require("util"),
    BaseData = require("./base"),
    mongoose = require('mongoose'),
    constant = require('../constant'),
    utils = require("../utils");

var PostData = function (schema) {
    this.simpleFields = {content: 0};
    this.Schema = schema;
    BaseData.call(this, mongoose.model("post", schema));
    var self = this;
    this.add = function (uid, category, title, summary, content, published, callback) {
        var post = new this.model({
            id       : utils.short_guid(),
            title    : title,
            summary  : summary,
            content  : content,
            published: published,
            author   : uid,
            category : category
        });
        post.save(callback);
    };

    this.get_list_for_uid = function (uid, page, size, callback) {
        var options = {author: uid, is_deleted: constant.is_deleted.no};
        self.get_list_page(options, self.simpleFields, "-create_date", page, size, callback);
    };

    this.get_published_for_uid = function (uid, size, callback) {
        var query = this.model.find({author: uid, published: constant.post.published.yes, is_deleted: constant.is_deleted.no});
        query.sort("hits");
        query.limit(size).exec(callback);
    };

    this.get_list = function (options, page, size, callback) {
        options.is_deleted = constant.is_deleted.no;
        self.get_list_page(options, self.simpleFields, "-create_date", page, size, callback);
    };

    this.get_list_for_home = function (page, size, callback) {
        var options = {
            published : constant.post.published.yes,
            is_deleted: constant.is_deleted.no
        };
        this.get_list_page(options, self.simpleFields, "-create_date", page, size, callback);
    };

    this.get_list_for_hots = function (page, size, callback) {
        var options = {
            published : constant.post.published.yes,
            is_deleted: constant.is_deleted.no
        };
        this.get_list_page(options, self.simpleFields, "-hits", page, size, callback);
    };

    this.update = function (id, uid, category, title, summary, content, published, callback) {
        var update = {
            $set: {
                title      : title,
                summary    : summary,
                content    : content,
                published  : published,
                update_date: new Date().getTime(),
                category   : category
            }
        };
        this.model.update({id: id}, update, callback);
    };

    this.publish = function (id, uid, callback) {
        var update = {
            $set: {
                published   : constant.post.published.yes,
                publish_date: new Date().getTime(),
                update_date : new Date().getTime()
            }
        };
        this.model.update({id: id}, update, callback);
    };

    this.unpublish = function (id, uid, callback) {
        var update = {
            $set: {
                published  : constant.post.published.no,
                update_date: new Date().getTime()
            }
        };
        this.model.update({id: id}, update, callback);
    };

    this.delete = function (id, uid, callback) {
        var update = {
            $set: {
                is_deleted: constant.is_deleted.yes
            }
        };
        this.model.update({id: id}, update, callback);
    };
};

util.inherits(PostData, BaseData);

module.exports = PostData;