var app = angular
	.module("noTrumpNews", ["ui.router", "slugifier", "ngSanitize"])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/')

		// Remove #! from url
		$locationProvider.html5Mode({ enabled: true })

		$stateProvider
			.state('app', {
				url: "?page",
				resolve: {
					article: angular.noop, //empty function
					articles: angular.noop
				},
				params: {
					page: null,
					articleSlug: null
				}
			})

			.state('app.home', {
				url: "/",
				templateUrl: "templates/home.html",
				controller: "homeCtrl",
				resolve: {
					articles: function ($stateParams, $http) {
						console.log($stateParams)
						return $http(
							{
								method: 'GET',
								url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Politics")&fq=!trump&page='
									+ ($stateParams.page || 6)
									+ '&api-key=groQeNemKAhk7QjDWircgauo5jYVcwez'
							}
						).then(function (result) {
							window.setTimeout(function () {
								$('.grid').isotope({
									itemSelector: '.grid-item',
									horizontalOrder: true,
									masonry: {
									}
								});
							}, 300)
							return result
						})
					}
				}
			})

			.state('app.article', {
				url: "/article/:articleSlug",
				templateUrl: "templates/article.html",
				controller: "articleController",
				resolve: {
					article: function ($stateParams, $http) {
						var formData = new FormData()
						formData.append("url", $stateParams.url)
						formData.append("API_KEY", "46014746951CA2FDB1D88548963945FD")

						return $http(
							{
								method: 'POST',
								url: 'https://resoomer.pro/websummarizer/',
								data: formData,
								headers: { 'Content-Type': undefined }
							}
						)
					}
				},
				params: {
					url: null,
					image: '',
					title: '',
					externalUrl: '',
					articleSlug: ''
				}
			})
	}])

	.controller("homeCtrl", function (articles, $scope, $stateParams, $sanitize) {
		$scope.articles = articles.data.response.docs
		$scope.currentPage = $stateParams.page || 1
		$scope.previousPage = parseInt($scope.currentPage) - 1
		$scope.nextPage = parseInt($scope.currentPage) + 1
		console.log($scope.nextPage)
		console.log($scope.previousPage)
	})

	.controller("articleController", function (article, $scope, $stateParams) {
		window.scrollTo({ top: 0 })
		console.log(article)
		$scope.articleText = article.data.mediumText.content
		$scope.image = $stateParams.image
		$scope.title = $stateParams.title
		$scope.externalUrl = $stateParams.externalUrl
	})



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


