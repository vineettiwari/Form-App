// controllers.js

var validationApp = angular.module('validationApp', []);

validationApp.controller('mainController', function ($scope) {

    $scope.title = "My Form";

    // function to submit the form after validation has occurred
    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }

    };

});