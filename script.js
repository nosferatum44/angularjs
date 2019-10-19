var app = angular

    .module("Demo", ["ui.router", "slugifier"])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('');

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
                        var formData = new FormData();

                        formData.append("url", $stateParams.url);
                       
                        console.log($stateParams);
                        formData.append("API_KEY", "46014746951CA2FDB1D88548963945FD");
                        return $http(
                            {
                                method: 'POST',
                                url: 'https://resoomer.pro/websummarizer/',
                                data: formData,
                                headers: { 'Content-Type': undefined },
                                
                            }
                        )
                    },
                },
                params: {
                    url: null,
                    image: '',
                    title: '',
                    externalUrl: ''
                }

                // templateProvider: function ($templateRequest, $stateParams) {

                //     $scope.index = $stateParams.index + 1;
                //     var templateName = 'file' + index + '.html';

                //     return $templateRequest(templateName);

                // },
            })
            .state("article2", {
                url: "/most-recent/:articleSlug",
                templateUrl: "templates/article2.html",
                controller: "article2Controller",
                resolve: {
                    article: function ($stateParams, $http) {
                        var formData = new FormData();

                        formData.append("url", $stateParams.url);
                       
                        console.log($stateParams);
                        formData.append("API_KEY", "46014746951CA2FDB1D88548963945FD");
                        return $http(
                            {
                                method: 'POST',
                                url: 'https://resoomer.pro/websummarizer/',
                                data: formData,
                                headers: { 'Content-Type': undefined },
                                
                            }
                        )
                    },
                },
                params: {
                    url: null,
                    image: '',
                    title: '',
                    externalUrl: ''
                }

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
    .controller("articleController", function (article, $scope, $stateParams) {
        console.log(article)
        $scope.articleText = article.data.mediumText.content
        $scope.image = $stateParams.image
        $scope.title = $stateParams.title
        $scope.externalUrl = $stateParams.externalUrl
    })
    .controller("article2Controller", function (article, $scope, $stateParams) {
        console.log(article)
        $scope.articleText = article.data.mediumText.content
        $scope.image = $stateParams.image
        $scope.title = $stateParams.title
        $scope.externalUrl = $stateParams.externalUrl
        console.log($scope.articleText)
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
var darkModeIndicator = 0;

function theme() {


    if (darkModeIndicator == 0) {
        document.getElementById("darkMode").value = "Night";
        document.querySelector('body').classList.add("nightTheme");
        document.querySelector('.svg').classList.add("nightTheme");
        darkModeIndicator = 1;
    } else {
        document.getElementById("darkMode").value = "Day";
        document.querySelector("body").classList.remove("nightTheme");
        document.querySelector(".svg").classList.remove("nightTheme");
        darkModeIndicator = 0;
    }


};
/* Dark mode END*/


// slugify //

function MyCtrl($scope, Slug) {
    $scope.slugify = function (input) {
        $scope.mySlug = Slug.slugify(input);
    };
}