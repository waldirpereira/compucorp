(function () {
    "use strict";

    angular.module("testng.test", ["testng"]);

    angular.module("testng.test")
        .directive("testngTestResults", ["$compile", testngTestResults]);

    function testngTestResults($compile) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                var html = '<div></div>';
                var e = $compile(html)(scope);
                element.replaceWith(e);

                $(".jasmine_html-reporter").appendTo(e);
            }
        };
    }
})();

