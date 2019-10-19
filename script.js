var app = angular

    .module("Demo", ["ui.router", "slugifier"])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "templates/home.html",
                controller: "homeController",


            })
            // .state("article", {
            //     url: "/2",
            //     templateUrl: "templates/article.html",
            //     controller: "articleController",

            // })
            .state('article', {
                url: "/article/:articleSlug",
                templateUrl: "templates/article.html",
                controller: "articleController",
                resolve: {
                    article: function ($stateParams, $http) {
                        return $http(
                            {
                                method: 'POST',
                                url: 'https://resoomer.pro/websummarizer/',
                                data: JSON.stringify({
                                    url: $stateParams.url,
                                    API_KEY: 'D64EB1C6702E3E1927614F672289E433'
                                })
                            }
                        ).then(function(result) {
                            console.log(result)
                        })
                    },
                },
                params: {
                    url: ''
                }                
                // templateProvider: function ($templateRequest, $stateParams) {

                //     $scope.index = $stateParams.index + 1;
                //     var templateName = 'file' + index + '.html';

                //     return $templateRequest(templateName);

                // },
            })
            .state("article2", {
                url: "/",
                templateUrl: "templates/article2.html",
                controller: "article2Controller",

            })
            .state("mostRecent", {
                url: "/",
                templateUrl: "templates/mostRecent.html",
                controller: "mostRecentController",

            })
        /* Remove #! from url */
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

    }])
    .controller("homeController", function () {

    })
    .controller("articleController", function () {

    })
    .controller("article2Controller", function () {

    })
    .controller("mostRecentController", function () {

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







/* Dark mode */
var i = 1;

function theme() {


    if (i == 1) {
        document.getElementById("theme").value = "Night";
        document.querySelector('body').classList.add("nightTheme");
        document.querySelector('.svg').classList.add("nightTheme");
        i = 2;
    } else {
        document.getElementById("theme").value = "Day";
        document.querySelector("body").classList.remove("nightTheme");
        document.querySelector(".svg").classList.remove("nightTheme");
        i = 1;
    }


};
/* Dark mode END*/


// slugify //

function MyCtrl($scope, Slug) {
    $scope.slugify = function (input) {
        $scope.mySlug = Slug.slugify(input);
    };
}