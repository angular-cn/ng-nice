/*global ngNice*/
(function () {

    var requires = ['ui.bootstrap', 'w5c.validator'];
    var ngApp = ngNice.ngApp = angular.module("app", requires);

    ngApp.config(['$httpProvider', 'w5cValidatorProvider', function ($httpProvider, w5cValidatorProvider) {
        w5cValidatorProvider.config({
            blurTrig   : false,
            showError  : function () {
            },
            removeError: function () {
            }
        });
        w5cValidatorProvider.setRules({
            user_name        : {
                required: "输入的用户名不能为空",
                pattern : "用户名必须输入字母、数字、下划线,以字母开头"
            },
            user_password    : {
                required: "输入的密码不能为空"
            },
            user_email       : {
                required: "输入的用邮箱地址不能为空",
                email   : "邮箱格式不正确"
            },
            repeat_password  : {
                repeat: "两次填写的密码不一致"
            },
            user_original_pwd: {
                required: "输入的原始密码不能为空"
            },
            user_new_pwd     : {
                required: "输入的新密码不能为空"
            }
        });

        marked.setOptions({
            renderer   : new marked.Renderer(),
            gfm        : true,
            tables     : true,
            breaks     : true,
            pedantic   : false,
            sanitize   : true,
            smartLists : true,
            smartypants: false
        });

        $httpProvider.responseInterceptors.push(["$q", function ($q) {
            return function (promise) {
                return promise.then(function (response) {
                    if (response.config.url.toLowerCase().indexOf("/api/") >= 0 && (!response.data || response.data.code !== ngNice.status.ok)) {
                        return $q.reject(response);
                    }
                    return response;
                }, function (response) {
                    return $q.reject(response);
                });
            };
        }]);
    }]).value("config", {
        pageSize  : 20,
        categories: [
            {name: "默认", value: 0},
            {name: "AngularJS", value: 1},
            {name: "NodeJS", value: 2},
            {name: "Javascript", value: 3},
            {name: "技术架构", value: 4}
        ]
    }).run(['$rootScope', function ($rootScope) {
        $rootScope.global = {
            loading_done: false
        };
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
        $('.height-no-header').height($(window).height() - 70);
        $('[data-height]').each(function () {
            var exHeight = parseInt($(window).height() - $(this).attr('data-height'), 10);
            $(this).css('height', exHeight);
        });
    }]);
})();