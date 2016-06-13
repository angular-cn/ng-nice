
(function () {
    "use strict";
    var status = {
        ok           : 200,
        invalid_input: 401,
        not_found    : 404,
        error        : {
            sig            : 1001, //错误的签名
            ver            : 1002, //错误的接口版本号
            err_client_ver : 1003, //错误的客户端版本号
            invalid_token  : 1004, //无效的访问令牌
            permission_deny: 1005, // 无权限访问
            server_error   : 500, //服务端错误
            unknown        : 404,
            unknown_format : 406
        },
        user_error   : {
            invalid_user            : 1001,
            check_user_err          : 1002,
            invalid_name_or_password: 1003,
            name_exists             : 1004,
            email_exists            : 1005
        },
        post_error   : {
            add_err: 2001,
            get_list_err: 2002
        }
    };


    window.ngNice.status = window.ngNice.status || status;
})();

