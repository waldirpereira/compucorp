(function () {
    "use strict";

    angular.module("testng.weather")
        .controller("WeatherController", ["$document", "$location", "growl", "ROUTES", "CONFIG", "WeatherService", "GeolocationService", WeatherController]);

    function WeatherController($document, $location, growl, ROUTES, CONFIG, WeatherService, GeolocationService) {
        var ctrl = this;

        ctrl.model = null;
        ctrl.location = null;
        ctrl.search = null;
        ctrl.status = {
            denied: false,
            searching: false
        };
        ctrl.temperatureUnit = "K";

        // Public methods
        ctrl.openReadme = openReadme;
        ctrl.openTests = openTests;
        ctrl.search = search;
        ctrl.getIconUrl = getIconUrl;
        ctrl.getTemperatureInUnit = getTemperatureInUnit;
        ctrl.getTemperatureUnitLabel = getTemperatureUnitLabel;
        ctrl.getGoogleApiKey = getGoogleApiKey;

        init();

        // Initialization of the controller
        function init() {
            ctrl.status.searching = true;
            GeolocationService.getCurrentPosition()
                .then(onUserLocationFound)
                .catch(function () {
                    ctrl.status.denied = true;
                })
                .finally(function () {
                    ctrl.status.searching = false;
                });
        }

        // Get weather from Zip code and country name
        function search() {
            getWeatherConditions(WeatherService.getFromZipAndCountry, ctrl.search);
        }

        // Get weather from the geolocation of the user browser
        function onUserLocationFound(location) {
            ctrl.location = location;
            if (!location)
                return;

            getWeatherConditions(WeatherService.getFromCoord, ctrl.location.coords);
        }

        // private method for search the weather conditions
        function getWeatherConditions(serviceMethod, data) {
            ctrl.model = null;
            ctrl.status.searching = true;
            serviceMethod(data)
                .then(function (response) {
                    if (response.cod === "404") {
                        ctrl.status.denied = true;
                        growl.addErrorMessage(response.message);
                        throw response;
                    }
                    ctrl.model = response;
                })
                .finally(function () {
                    ctrl.status.searching = false;
                });;
        }

        // Returns the temperature in correct scale assuming that is stored originaly in Kelvin
        function getTemperatureInUnit(temperature) {
            if (ctrl.temperatureUnit === "K")
                return temperature;

            if (ctrl.temperatureUnit === "C")
                return temperature - 273.15;

            return ((temperature - 32) * 5 / 9) + 273.15;
        }

        // Gets the correct label for temperature unit
        function getTemperatureUnitLabel() {
            var prefix = ctrl.temperatureUnit !== "K" ? "°" : "";
            return prefix + ctrl.temperatureUnit;
        }

        // Returns the full URL for the referenced icon
        function getIconUrl(icon) {
            return ROUTES.iconUrl + icon + ".png";
        }

        function getGoogleApiKey() {
            return CONFIG.googleApiKey;
        }

        // Redirect to README file route
        function openReadme() {
            $location.path("/readme");
        }

        // Redirect the browser URL to test page
        function openTests() {
            $document[0].location.href = ROUTES.testingPage;
        }
    }
})();