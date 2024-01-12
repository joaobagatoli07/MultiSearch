var app = angular.module('MultiSearchApp', ['ngSanitize']);

app.controller('MainController', function ($scope, $http) {
    $scope.searchText = ''; // Variable that stores the search text
    $scope.results = {}; // Object to store results grouped by type

    // Function to filter equipment based on search text
    $scope.filterEquipments = function () {
        // Send a request to the backend API with the search text
        $http.post('/api/search', { text: $scope.searchText }) // Alteração para POST e envio do texto no corpo
            .then(function (response) {
                $scope.results = response.data;
                $scope.totalResults = Object.values($scope.results).flat().length;
            })
            .catch(function (error) {
                console.error('Error fetching search results:', error);
            });
    };
});
