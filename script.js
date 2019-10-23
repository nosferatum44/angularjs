var app = angular

    .module("Demo", ["ui.router", "slugifier", "ngSanitize"])

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


        /* Remove #! from url */
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

    }])
    .controller("homeController", function () {

    })
    .controller("articleController", function (article, $scope, $stateParams) {
        window.scrollTo({ top: 0 })
        console.log(article)
        $scope.articleText = article.data.mediumText.content
        $scope.image = $stateParams.image
        $scope.title = $stateParams.title
        $scope.externalUrl = $stateParams.externalUrl
    })



    .controller('mainCtrl', function ($http, $scope) {
        $scope.pageNumber = 1



        $http(
            {
                method: 'GET',
                url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Politics")&fq=!trump&page=' + $scope.pageNumber + '&api-key=groQeNemKAhk7QjDWircgauo5jYVcwez',
            }).then(function successCallback(result) {
                console.log('success1', result);
                $scope.results = result.data.response.docs;
                console.log($scope.results)

                $scope.divideInColumns = function (){$scope.resultsTwoColumnsA = $scope.results.slice(0, 5)
                $scope.resultsTwoColumnsB = $scope.results.slice(5)

                $scope.resultsThreeColumnsA = $scope.results.slice(0, 3)
                $scope.resultsThreeColumnsB = $scope.results.slice(3, 7)
                $scope.resultsThreeColumnsC = $scope.results.slice(7)
           
                window.scrollTo({ top: 0 })
                }
                $scope.divideInColumns ()

            }, function errorCallback(result) {
                console.log("there's a fucking error, man...");
            });



        $scope.mainPage = function () {


            $http(
                {
                    method: 'GET',
                    url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Politics")&fq=!trump&page=' + 1 + '&api-key=groQeNemKAhk7QjDWircgauo5jYVcwez',
                }).then(function successCallback(result) {
                    console.log('success2', result);
                    $scope.results = result.data.response.docs;

                    console.log('done!')

                    var currentPageNumberValue = 1
                    document.getElementById('currentPageNumber').value = currentPageNumberValue
                    document.querySelector('#previousPage').style.display = "none"
                    document.querySelector('#previousPageNumber').value = ""
                    document.getElementById('nextPageNumber').value = "2"
                    $scope.pageNumber = 1
                }, function errorCallback(result) {
                    console.log("there's a fucking error, man...");
                });
        }

        //Pagination 


        $scope.nextPage = function () {

            $scope.pageNumber++
            $http(
                {
                    method: 'GET',
                    url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Politics")&fq=!trump&page=' + $scope.pageNumber + '&api-key=groQeNemKAhk7QjDWircgauo5jYVcwez',
                }).then(function successCallback(result) {
                    console.log('success', result);
                    $scope.results = result.data.response.docs;

                    $scope.divideInColumns()
                    
                    document.querySelector('#previousPageNumber').value++
                    document.getElementById('currentPageNumber').value++
                    document.getElementById('nextPageNumber').value++
                    document.querySelector('#previousPageNumber').style.display = "block"
                    document.querySelector('#previousPage').style.display = "inline"

                }, function errorCallback(result) {
                    console.log("there's a fucking error, man...");
                });
        }



        $scope.previousPage = function () {
            if ($scope.pageNumber > 1) {
                $scope.pageNumber--
                $http(
                    {
                        method: 'GET',
                        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Politics")&fq=!trump&page=' + $scope.pageNumber + '&api-key=groQeNemKAhk7QjDWircgauo5jYVcwez', /* Most recent */
                    }).then(function successCallback(result) {
                        console.log('success', result);
                        $scope.results = result.data.response.docs;

                        $scope.divideInColumns()
                 
                        document.getElementById('currentPageNumber').value--
                        document.querySelector('#previousPageNumber').value--
                        document.getElementById('nextPageNumber').value--
                        if (document.querySelector('#currentPageNumber').value == 1) {
                            document.querySelector('#previousPage').style.display = "none"
                            document.querySelector('#previousPageNumber').style.display = "none"
                        }

                        window.scrollTo({ top: 0 })

                    }, function errorCallback(result) {
                        console.log("there's a fucking error, man...");
                    });

            }
        }
    }




    );


/* Dark mode */
var darkModeIndicator = 0;

function theme() {
    if (darkModeIndicator == 0) {
        document.querySelector('body').classList.add("nightTheme");
        document.querySelector('.svg').classList.add("nightTheme");
        darkModeIndicator = 1;
    } else {
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


