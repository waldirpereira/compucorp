(function () {
    "use strict";

    var app = angular.module("testng.weather", ["testng", "ngAnimate", "ui.bootstrap", "angular-growl"]);

    app.config(["growlProvider", function (growlProvider) {
        growlProvider.globalTimeToLive(5000);
    }]);
})();