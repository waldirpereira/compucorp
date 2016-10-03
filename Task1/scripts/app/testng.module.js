(function () {
    "use strict";

    angular.module("testng", ["ngRoute"]);

    angular.module("testng")
        .config(["$routeProvider", routeConfig]);

    function routeConfig($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "WeatherController",
                controllerAs: "ctrl"
            })
            .when("/readme", {
                templateUrl: "readme.html",
                controller: "ReadmeController",
                controllerAs: "ctrl"
            })
            .otherwise({
                redirectTo: "/main"
            });
    }
})();