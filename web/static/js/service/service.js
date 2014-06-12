/*global ngNice*/
(function () {
    "use strict";

    ngNice.ngApp.factory('data', ['$http', function ($http) {
        return {
            user: {
                signin         : function (name, password, is_remember) {
                    return $http.post("/api/user/signin", {name: name, password: password, is_remember: is_remember});
                },
                signup         : function (name, email, password) {
                    return $http.post("/api/user/signup", {name: name, password: password, email: email});
                },
                get_me         : function () {
                    return $http.get("/api/user");
                },
                update         : function (name, desc) {
                    return $http.put("/api/user", {name: name, desc: desc});
                },
                update_avatar  : function (path) {
                    return $http.put("/api/user/avatar", {path: path});
                },
                update_password: function (password, new_password) {
                    return $http.put("/api/user/password", {password: password, new_password: new_password});
                }
            },
            post: {
                add       : function (category, title, summary, content, published) {
                    return $http.post("/api/post", {
                        category: category, title: title, summary: summary, content: content, published: published
                    });
                },
                get_for_me: function (page, size) {
                    return $http.get("/api/posts/me?page=" + page + "&size=" + size);
                },
                get       : function (post_id) {
                    return $http.get("/api/posts/" + post_id);
                },
                update    : function (post_id, category, title, summary, content, published) {
                    return $http.put("/api/posts/" + post_id, {
                        category: category, title: title, summary: summary, content: content, published: published
                    });
                },
                publish   : function (post_id) {
                    return $http.put("/api/posts/" + post_id + "/publish", {});
                },
                unpublish : function (post_id) {
                    return $http.put("/api/posts/" + post_id + "/unpublish", {});
                },
                trash     : function (post_id) {
                    return $http.delete("/api/posts/" + post_id, {});
                }
            }
        };
    }]).factory("niceUtil", [function () {
        var notify = function (type, msg, onClosed) {
            $('.notifications').notify({
                type    : type,
                message : { text: msg },
                onClosed: onClosed,
//                fadeOut : {
//                    enabled: false
//                },
                closable: true
            }).show();
        };
        return{
            get_query: function (name) {
                var LocString = String(window.document.location.href);
                var rs = new RegExp("(^|)" + name + "=([^\&]*)(\&|$)", "gi").exec(LocString);

                if (rs && rs.length > 2) {
                    return rs[2];
                }
                return '';
            },
            msg      : {
                info   : function (msg, onClosed) {
                    notify('info', msg, onClosed);
                },
                error  : function (msg, onClosed) {
                    notify('danger', msg, onClosed);
                },
                success: function (msg, onClosed) {
                    notify('success', msg, onClosed);
                },
                warn   : function (msg, onClosed) {
                    notify('warning', msg, onClosed);
                }
            }
        };

    }]);
})();
