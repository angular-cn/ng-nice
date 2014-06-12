/*global ngNice,moment*/
(function () {
    "use strict";
    ngNice.ngApp.filter("fullDate", [function () {
        return function (input) {
            var date = moment(input);
            return date.format("YYYY-MM-DD HH:ss");
        }
    }]).filter("categoryName", ['config', function (config) {
        return function (input) {
            return _.findWhere(config.categories, {value: input}).name;
        }
    }]);
})();
