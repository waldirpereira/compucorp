(function () {
    "use strict";

    angular.module("testng")
        .directive("testngMenu", ["$compile", "CONFIG", "TemplateService", testngMenu]);

    function testngMenu($compile, CONFIG, TemplateService) {
        return {
            restrict: 'E',
            link: function (scope, element) {

                TemplateService.getTemplate(CONFIG.menuTemplate).then(function (response) {
                    var menu = response.data;
                    element.html(menu);
                    $compile(element.contents())(scope);
                });
            }
        };
    }
})();

