describe('WeatherController', function () {
    var weatherController;

    beforeEach(function () {
        module('testng.weather');
    });

    var ROUTES = {
        get: 'get path'
    };
    var CONFIG = {
        readmeFile: 'readme file'
    };
    beforeEach(module('testng', function ($provide) {
        $provide.constant('ROUTES', ROUTES);
        $provide.constant('CONFIG', CONFIG);
    }));

    it('Should have a WeatherController controller', function () {
        expect("testng.weather.WeatherController").toBeDefined();
    });

    describe('Testing routes', function () {
        var location, route, rootScope;

        beforeEach(inject(function (_$location_, _$route_, _$rootScope_) {
            location = _$location_;
            route = _$route_;
            rootScope = _$rootScope_;
        }));

        beforeEach(inject(function ($httpBackend) {
            $httpBackend.expectGET('main.html')
            .respond(200);
        }));

        it('Should load the weather page on successful load of /main and with WeatherController', function () {
            location.path('/main');
            rootScope.$digest();
            expect(route.current.controller).toBe('WeatherController');
        });

        it('Should load the weather page on access root page', function () {
            location.path('/');
            rootScope.$digest();
            expect(route.current.controller).toBe('WeatherController');
        });
    });

    describe('Testing Service', function () {
        it('Should have a working WeatherService service', inject(['WeatherService',
            function (WeatherService) {
                expect(WeatherService.get).not.toEqual(null);
            }])
        );
    });

    describe('Testing Controller', function () {
        var weatherServiceMock;

        beforeEach(module('testng.weather', function ($provide) {
            weatherServiceMock = {
                get: function () { return { then: function () { return "get"; } }; }
            };

            $provide.value('WeatherService', weatherServiceMock);
        }));
        
        beforeEach(inject(function ($controller) {
            weatherController = $controller('WeatherController', {
                WeatherService: weatherServiceMock
            });
        }));

        it('Should Controller attributes be defined', function () {
            expect(weatherController.model).toBeDefined();
            expect(weatherController.status).toBeDefined();
        });
    });
});
