var crypto = require('crypto'),
    uuid = require("node-uuid"),
    moment = require("moment"),
    marked = require("marked"),
    paginator = require("./lib/paginator");

/**
 *  encrypt
 * @param str
 * @param secret
 * @returns {*}
 */
exports.encrypt = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

/**
 * decrypt
 * @param str
 * @param secret
 * @returns {*}
 */
exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * MD5
 * @param input
 * @returns {*}
 */
exports.md5 = function (input) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(input);
    return md5sum.digest('hex');
};

/**
 * 生成 GUID
 * @returns {*}
 */
exports.guid = function () {
    var str = uuid.v4();
    var regex = new RegExp('-', 'g');
    str = str.replace(regex, '');

    return str;
};

/**
 * 生成 短GUID
 * @returns {string}
 */
exports.short_guid = function () {
    var str = exports.guid();
    var val = 1;
    for (var i = 0; i < str.length; i++) {
        val *= (parseInt(str.charCodeAt(i).toString(16)) + 1);
    }
    val = val - (new Date()).getTime();
    return val.toString(16).substring(0, 14);
};

exports.date_format = {
    fullDateTime: function (input) {
        return moment(input).format("YYYY-MM-DD HH:ss")
    }
};

exports.markdown_to_html = function (input) {
    return marked(input);
};

exports.pager_render = function (page, total, per_count) {
    var pagination = new paginator.SearchPaginator({
        prelink    : '',
        current    : page,
        rowsPerPage: per_count,
        totalResult: total
    });
    return pagination.render();
};

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


