/*$http({
    method: 'GET',
    url: 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=groQeNemKAhk7QjDWircgauo5jYVcwez'
});*/

var app = angular.module('app', []);

/* app.controller('firstCtrl', function($scope, myFactory) {
    console.log('firstCtrl');
    $scope.myFactory = myFactory;
    $scope.hello = 'hello world';
});

app.controller('secondCtrl', function($scope, myFactory) {
    console.log('secondCtrl');
    $scope.myFactory = myFactory;
    $scope.hello = 'hello world';
});

app.factory('myFactory', function() {
    return {
        hello: 'hello world'
    };
});
*/

/*app.controller('firstCtrl', function($scope, myFactory) {
    $scope.hello = "Hello world";

    $scope.myFactory = myFactory;

    $scope.getBookmark = function () {
        return "My bookmark";
    };

    $scope.setHello = function (text) {
        $scope.hello = text;
    };
});

app.factory('myFactory', function() {
    return {
        hello: function () {
            return 'hello world';
        }
    }
});
*/

app.controller('mainCtrl', function ($http, $scope) {  
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
});
