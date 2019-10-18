var app = angular

    .module("Demo", ["ui.router"])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "templates/home.html",
                controller: "homeController",

            })
            .state("article", {
                url: "/article",
                templateUrl: "templates/article.html",
                controller: "articleController",

            })
            .state("mostRecent", {
                url: "/",
                templateUrl: "templates/mostRecent.html",
                controller: "mostRecentController",

            })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])
    .controller("homeController", function ($scope) {
        $scope.message = "Home page";
    })
    .controller("articleController", function ($scope) {
        $scope.message = "Folks page";
    })
    .controller('mainCtrl', function ($http, $scope) {
        $http(
            {
                method: 'GET',
                url: 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=groQeNemKAhk7QjDWircgauo5jYVcwez',  /*Most populars*/
                /*  url: 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=groQeNemKAhk7QjDWircgauo5jYVcwez', /* Most recent */
            }).then(function successCallback(result) {
                console.log('success', result);
                $scope.results = result.data.results;

            }, function errorCallback(result) {
                console.log("there's a fucking error, man...");
            });
    })
    .controller('mostRecent', function ($http, $scope) {
        $http(
            {
                method: 'GET',

            url: 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=groQeNemKAhk7QjDWircgauo5jYVcwez', /* Most recent */
            }).then(function successCallback(result) {
                console.log('success', result);
                $scope.results = result.data.results;

            }, function errorCallback(result) {
                console.log("there's a fucking error, man...");
            });
    });



app

/* Dark mode */
var i = 1;

function theme() {


    if (i == 1) {
        document.getElementById("theme").value = "Night";
        document.querySelector('body').classList.add("nightTheme");
        i = 2;
    } else {
        document.getElementById("theme").value = "Day";
        document.querySelector("body").classList.remove("nightTheme");
        i = 1;
    }


};
/* Dark mode END*/


// var slugify = require('slugify')
// slugify('some string')