/*global ngNice*/
(function () {
    "use strict";
    ngNice.ngApp.controller("post_list_ctrl", ["$scope", "data", "niceUtil", "$modal", "config", function ($scope, data, niceUtil, $modal, config) {
        var page = 1;
        var load_posts = function (page) {
            $scope.loading_posts = true;
            data.post.get_for_me(page, config.pageSize).success(function (result) {
                $scope.posts_total = result.data.total;
                if (page === 1) {
                    $scope.posts = result.data.posts;
                    $scope.js_select_post($scope.posts[0])
                } else {
                    $scope.posts = $scope.posts.concat(result.data.posts);
                }
                if (result.data.posts.length === config.pageSize) {
                    $scope.has_more = true;
                } else {
                    $scope.has_more = false;
                }
            }).finally(function () {
                $scope.loading_posts = false;
            });
        };

        load_posts(page);

        $scope.js_loading_more = function () {
            page++;
            load_posts(page);
        };

        $scope.js_select_post = function (post) {
            data.post.get(post.id).success(function(result){
                $scope.selected_post = result.data;
            });
        };

        $scope.js_unpublish_post = function (post) {
            post.published = 0;
            data.post.unpublish(post.id).success(function () {
                niceUtil.msg.success("取消发布文章成功！");
            });
        };

        $scope.js_publish_post = function (post) {
            post.published = 1;
            data.post.publish(post.id).success(function () {
                niceUtil.msg.success("发布文章成功！");
            });
        };

        $scope.js_delete_post = function (post) {

            var modalInstance = $modal.open({
                templateUrl: '/js/tpl/common/delete_confirm_modal.html',
                size       : 'sm',
                controller : ["$scope", "$modalInstance", function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $scope.saving = true;
                        data.post.trash(post.id).success(function () {
                            $scope.saving = false;
                            $modalInstance.close();
                        });
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
            modalInstance.result.then(function () {
                $scope.posts = _.reject($scope.posts, {id: post.id});
                if (post.id === $scope.selected_post.id) {
                    if ($scope.posts.length > 0) {
                        $scope.selected_post = $scope.posts[0];
                    } else {
                        $scope.selected_post = null;
                    }
                }
                niceUtil.msg.success("删除文章成功！");
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

    }]).controller("post_edit_ctrl", ["$scope", "data", '$rootScope', 'config', function ($scope, data, $rootScope, config) {
        var post_id = "";

        var result = /posts\/(\w+)\/edit/ig.exec(window.location.pathname);
        if (result && result.length >= 2) {
            post_id = result[1];
            data.post.get(post_id).success(function (result) {
                $scope.post = result.data;
                if(!$scope.post.category){
                    $scope.post.category = 0;
                }
            }).finally(function () {
                $rootScope.global.loading_done = true;
            });
        } else {
            $scope.post = {summary: "", title: "", content: "", published: 0, category: 1};
            $rootScope.global.loading_done = true;
        }

        $scope.categories = config.categories;

        $scope.js_save = function (post) {
            if (post.id) {
                data.post.update(post.id, post.category, post.title, post.summary, post.content, post.published)
                    .success(function () {
                        window.location.href = "/posts/me";
                    });
            } else {
                data.post.add(post.category, post.title, post.summary, post.content, post.published)
                    .success(function () {
                        window.location.href = "/posts/me";
                    });
            }

        };

        $scope.js_save_as_publish = function (post) {
            $scope.post.published = 1;
            $scope.js_save(post);
        };

        $scope.js_save_as_draft = function (post) {
            $scope.post.published = 0;
            $scope.js_save(post);
        };
    }]);

})();

