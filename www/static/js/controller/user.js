/*global ngNice*/
(function () {
    "use strict";

    ngNice.ngApp.controller("user_login_ctrl", ["$scope", "data", function ($scope, data) {

        $scope.js_login = function (form, user) {
            $scope.signining = true;
            data.user.signin(user.name, user.password, user.is_remember)
                .success(function (result) {
                    $scope.is_success = true;
                    window.location.href = "/";
                }).error(function (result) {
                    form.$errors.unshift("用户名或者密码输入错误");
                }).finally(function (result) {
                    $scope.signining = false;
                });
        };
    }]).controller("user_signup_ctrl", ["$scope", "data", function ($scope, data) {

        $scope.js_signup = function (form, user) {
            data.user.signup(user.name, user.email, user.password)
                .success(function (result) {
                    window.location.href = "/signin";
                });
        };
    }]).controller("user_setting_ctrl", ["$scope", "data", "niceUtil", function ($scope, data, niceUtil) {
        data.user.get_me().success(function (result) {
            $scope.user = result.data;
        });

        $scope.js_change_basic = function (user) {
            $scope.saving = true;
            data.user.update(user.name, user.desc).success(function (result) {
                $scope.saving = false;
                niceUtil.msg.success("修改用户基本信息成功！");
                $("#header_user_name").text(user.name);
            })
        };

        $scope.js_change_password = function (user) {
            $scope.saving = true;
            data.user.update_password(user.password, user.new_password).success(function (result) {
                $scope.saving = false;
                niceUtil.msg.success("修改密码成功！");
                user.password = "";
                user.new_password = "";
                user.repeat_password = "";
            })
        };

        $scope.js_update_avatar = function (user) {
            data.user.update_avatar(user.avatar.path).success(function (result) {
                niceUtil.msg.success("更新头像成功！");
                $("#header_avatar_img").attr("src", user.avatar.path);
            });
        }
    }]);

})();

