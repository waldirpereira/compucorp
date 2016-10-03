(function () {
    "use strict";

    angular.module("testng")
        .factory('TemplateService', function($http) {
            var getTemplate = function(templateFullPath) {
                return $http.get(templateFullPath);
            };
            return {
                getTemplate: getTemplate
            };
        });
})();