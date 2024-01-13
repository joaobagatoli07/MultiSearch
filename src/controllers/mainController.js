// Declare an AngularJS module named 'MultiSearchApp' with a dependency on 'ngSanitize'
var app = angular.module('MultiSearchApp', ['ngSanitize']);

// Define a controller named 'MainController' within the 'MultiSearchApp' module
app.controller('MainController', function ($scope, $http) {
    // Initialize two variables in the AngularJS $scope to manage search text and results
    $scope.searchText = ''; 
    $scope.results = {}; 
    
    // Define a function 'filterObjects' to filter objects based on the search text
    $scope.filterObjects = function () {
        
        // Send a POST request to the '/api/search' endpoint with the search text
        $http.post('/api/search', { text: $scope.searchText }) 
            .then(function (response) {
                // On successful response, update the results and calculate the total number of results
                $scope.results = response.data;
                $scope.totalResults = Object.values($scope.results).flat().length;
            })
            .catch(function (error) {
                // Handle errors by logging them to the console
                console.error('Error fetching search results:', error);
            });
    };
});
