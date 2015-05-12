/*global ngNice*/
(function () {
    "use strict";
    ngNice.ngApp
        .directive("niceMarkdown", [function () {
            return {
                restrict: 'A',
                link    : function (scope, element, attrs) {
                    scope.$watch(attrs.niceMarkdown, function (value) {
                        value = value || '';
                        if (value !== '') {
                            value = marked(value);
                            element.html(value);
                        } else {
                            element.html('');
                        }
                     
                    });

                }
            }
        }])
        .directive("loadingStatus", ['$timeout',function ($timeout) {
            return function (scope, element, attrs) {
                scope.$watch(attrs.loadingStatus, function (newValue, oldValue) {
                    if (newValue === true) {
                        element.button('loading');
                    } else if (newValue === false) {
                        $timeout(function () {
                            element.button('reset');
                        });

                    }
                });
            };
        }])
        .directive("autoFocus", ['$timeout',function ($timeout) {
            return function (scope, element, attrs) {
                $timeout(function () {
                    element[0].focus();
                });
            };
        }])
        .directive('niceEnter', ['$parse', function ($parse) {
            return function (scope, element, attrs) {
                var fn = $parse(attrs.niceEnter);
                element.bind("keydown keypress", function (event) {
                    var keyCode = event.which || event.keyCode;
                    if (keyCode === 13) {
                        scope.$apply(function () {
                            fn(scope, {$event: event});
                        });
                        event.preventDefault();
                    }
                });
            };
        }]);
})();
