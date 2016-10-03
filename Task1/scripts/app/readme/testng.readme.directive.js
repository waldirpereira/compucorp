(function () {
    "use strict";

    angular.module("testng")
        .directive("testngReadme", ["$compile", "CONFIG", "TemplateService", testngReadme]);

    function testngReadme($compile, CONFIG, TemplateService) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                TemplateService.getTemplate(CONFIG.readmeFile).then(function (response) {
                    var readme = response.data;
                    var pre = $("<PRE/>").html(readme);
                    element.html(pre);
                    $compile(element.contents())(scope);
                });
            }
        };
    }
})();

