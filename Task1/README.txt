********************************************************
Compucorp Task 1 for Front End Developer
********************************************************
Author: Waldir J. Pereira Junior
E-mail: waldirpereira@gmail.com
Date:   2016-09-29
********************************************************

--------------------------------------------------------
Introduction
--------------------------------------------------------
In this file I will try to show the architecture of the application and the mainly features I've 
developed. There are three features:
    + Weather
    + Read me
    + Test runner

The first two features work as a Single Page Application, with ngRoute for route managing.
The last one (test runner) is an independent feature, but also uses the "menu" directive.
	
--------------------------------------------------------
How to run
--------------------------------------------------------
Just copy all files inside the "Code" folder to a website root and run the site.
For exemple: http://localhost

Obs.: Assuming that "index.html" is the default start page for the webserver.

If opened with Visual Studio with the "CompucorpTask1.sln" file, just run the application and the browser
will open with website loaded on URL http://localhost:58757

--------------------------------------------------------
Structure
--------------------------------------------------------
+ index.html
+ README.txt
+ test.html
+ content
    + css
        + app
        + vendor
            + ...
    + images
        + app
    + templates
+ scripts
    + app
        + weather
        + readme
    + vendor
        + ...
+ test
    + lib
    + scripts
    + spec
	
--------------------------------------------------------
index.html
--------------------------------------------------------
Application main page. In there we have the features of the weather retrievment using AngularJS 1.5.
I wrote 2 inline templates (with ng-template) for the these features:
	- main.html --> for the main page
	- readme.html --> for showing the README.txt file

--------------------------------------------------------
README.txt
--------------------------------------------------------
The file you are reading.

--------------------------------------------------------
test.html
--------------------------------------------------------
The file that runs the test specification.

--------------------------------------------------------
'content' folder
--------------------------------------------------------
This folder contains all CSS, images and templates for the application.

--------------------------------------------------------
'scripts' folder
--------------------------------------------------------
Contains all JavaScript files for the application features (without tests).
This folder is divided by "app" and "vendor" subfolders, each one has more subdivisions for each feature.
In "app" subfolder there are the following files and subfolders:
    + testng.module.js: definition for the mainly application module "testng" and "route" configuration
    + testng.template.service.js: AngularJS service for reading a template from file system
    + testng.menu.js: AngularJS directive for the menu that is used by all pages
    + "weather" folder: with all AngularJS files for "weather" feature
        + testng.weather.module.js: definition for "testng.weather" module
        + testng.weather.service.js: definition for the service who will make the POST requests for the server
        + testng.weather.components.js: a set of components to use in the main page, such as "map" and "card"
        + testng.weather.controller.js: the weather page controller
    + "readme" folder: with all AngularJS files for "readme" feature
        + testng.readme.directive.js: a directive to replace the element "testng-readme" with a "PRE" element containing 
          this file content.
        + testng.readme.controller.js: the simple controller for the readme page.

In "vendor" subfolder there are the following subfolders with the most up-to-date versions of each component/framework:
    + angular
    + angular-chart.js
    + angular-ui
    + bootstrap
    + charts.js
    + jquery

--------------------------------------------------------
'test' folder
--------------------------------------------------------
This folder contains three subfolders:
    + lib: with "jasmine" files
    + scripts: with "testng-test-result.js", that is a directive for move the test results to a appropriate "DIV" element,
      just for UX purpose.
    + spec: with the Jasmine specification file for the tests.
