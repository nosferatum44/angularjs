var app = angular

    .module("Demo", ["ui.router", "slugifier", "ngSanitize", "ui.bootstrap"])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('');

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "templates/home.html",
                controller: "homeController",


            })

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
            .state("articleSearch", {
                url: "/",
                templateUrl: "templates/mostRecent.html",
                controller: "articleSearchController",

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
    .controller("articleSearchController", function () {

    })
    .controller('mainCtrl', function ($http, $scope) {
        $http(
            {
                method: 'GET',
                url: 'https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=groQeNemKAhk7QjDWircgauo5jYVcwez',  /*Most populars*/
            }).then(function successCallback(result) {
                console.log('success', result);
                $scope.results = result.data.results;
                console.log($scope.results.length)
                
                $scope.filteredResults = []
                $scope.currentPage = 1
                    , $scope.numPerPage = 10,
                    $scope.maxSize = 5;

                    $scope.numPages =  Math.ceil($scope.results.length / $scope.numPerPage);
                    console.log($scope.numPages)
                      
                $scope.$watch('currentPage + numPerPage', function () {
                    var firstPageNumber = (($scope.currentPage - 1) * $scope.numPerPage)
                        , lastPageNumber = firstPageNumber + $scope.numPerPage;

                    $scope.filteredResults = $scope.results.slice(firstPageNumber, lastPageNumber);
                   
                });
            }, function errorCallback() {
                console.log("there's a fucking error, man...");
            });

        //Filter switch
        var filterIndicator = 0;
        $scope.filterSwitch = function () {

            if (filterIndicator == 0) {
                $scope.filterValue = '!trump'
                document.getElementById('filter').value = "All News";
                filterIndicator = 1
            } else {
                $scope.filterValue = null
                document.getElementById('filter').value = "No Trump!";
                filterIndicator = 0
            }

        }


    })
   
    .controller('articleSearch', function ($http, $scope) {
        $http(
            {
                method: 'GET',

                url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=1&fq=news_desk:("Politics")&api-key=groQeNemKAhk7QjDWircgauo5jYVcwez', /* Most recent */
            }).then(function successCallback(result) {
                console.log('success', result);
                $scope.results = result.data.response.docs;

            }, function errorCallback(result) {
                console.log("there's a fucking error, man...");
            });
        //Filter switch
        var filterIndicator = 0;
        $scope.filterSwitch = function () {

            if (filterIndicator == 0) {
                $scope.filterValue = '!trump'
                document.getElementById('filter').value = "All News";
                filterIndicator = 1
            } else {
                $scope.filterValue = null
                document.getElementById('filter').value = "No Trump!";
                filterIndicator = 0
            }

        }
    }



    );


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
// slugify END//
