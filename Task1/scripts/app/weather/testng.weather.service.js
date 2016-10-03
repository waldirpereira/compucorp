(function () {
    "use strict";

    angular.module("testng.weather")
        .factory("GeolocationService", ["$q", "$window", GeolocationService]);

    function GeolocationService($q, $window) {
        return {
            getCurrentPosition: function() {
                var deferred = $q.defer();

                if (!$window.navigator.geolocation) {
                    deferred.reject("Geolocation not supported.");
                } else {
                    $window.navigator.geolocation.getCurrentPosition(
                        function(position) {
                            deferred.resolve(position);
                        },
                        function(err) {
                            deferred.reject(err);
                        });
                }
                return deferred.promise;
            }
        };
    }

    angular.module("testng.weather")
        .factory("WeatherService", ["$http", "$timeout", "ROUTES", WeatherFactory]);

    function WeatherFactory($http, $timeout, ROUTES) {
        return {
            getFromCoord: function(coords) {
                return $http.get(ROUTES.get, {
                    params: {
                        lat: coords.latitude,
                        lon: coords.longitude,
                        appid: "dd354f82860a28be56e94c8f28af25f4"
                    }
                }).then(returnDataFromXhr);
            },

            getFromZipAndCountry: function (search) {
                return $http.get(ROUTES.get, {
                    params: {
                        q: search.zip + "," + search.country,
                        appid: "dd354f82860a28be56e94c8f28af25f4"
                    }
                }).then(returnDataFromXhr);
            }
        };

        function returnDataFromXhr(response) {
            return response.data;
        }
    }
})();