(function () {
    "use strict";
    angular.module("testng.weather")
        .directive("map", map)
        .directive("card", ["$compile", card])
        .directive("rowInfo", ["$compile", "CONFIG", "TemplateService", rowInfo]);

    function map() {
        return {
            restrict: "E",
            scope: {
                latitude: "=",
                longitude: "=",
                googleApiKey: "="
            },
            template: "<img ng-src='https://maps.googleapis.com/maps/api/staticmap?center={{latitude}},{{longitude}}&zoom=12&size=800x800&key={{googleApiKey}}'>"
        };
    }

    function card($compile) {
        return {
            restrict: "E",
            compile: function (templateElement) {
                return function ($scope, $element) {
                    var attrs = templateElement[0].attributes;

                    var attrsText = '';
                    for (var i = 0; i < attrs.length; i++) {
                        var attr = attrs.item(i);
                        attrsText += " " + attr.nodeName + "='" + attr.nodeValue + "'";
                    }

                    var html = "<div class=\"card\" " + attrsText + ">" + $element.html() + "</div>";
                    var e = $compile(html)($scope);
                    $element.replaceWith(e);
                }
            }
        };
    }

    function rowInfo($compile, CONFIG, TemplateService) {
        return {
            restrict: "E",
            scope: {
                label: "@",
                value: "="
            },
            link: function (scope, element) {
                TemplateService.getTemplate(CONFIG.rowInfoTemplate).then(function (response) {
                    var rowInfo = response.data;
                    var pre = $("<DIV/>").html(rowInfo);
                    element.html(pre);
                    $compile(element.contents())(scope);
                });
            }
        };
    }
})();
