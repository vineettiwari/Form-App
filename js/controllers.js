// controllers.js

var validationApp = angular.module('validationApp', []);

validationApp.controller('mainController', function ($scope) {
    $scope.title = "User Form";
    $scope.emailError = "";
    $scope.subjectError = "";
    $scope.messageError = "";
    $scope.submitted = false;
    $scope.successMessage = "";
    $scope.validateForm = function () {
        console.log("processing...");
    };

    $scope.submitForm = function (isValid) {
        if (isValid) {
            var email = $scope.userForm.email.$modelValue;
            $scope.successMessage = "Your message has been delivered to " + email
            console.log($scope.successMessage.$modelValue);
            $scope.submitted = true;
        } else {
            if ($scope.userForm.email.$invalid) {
                $scope.emailError = "Email is required.";
                console.log("Email is required.");
            }
            if ($scope.userForm.subject.$invalid) {
                $scope.subjectError = "Subject is required.";
                console.log("Subject is required.");
            }
            if ($scope.userForm.message.$invalid) {
                if ($scope.userForm.message.$error.minlength) {
                    $scope.messageError = "Message must be at least 3 characters.";
                    console.log("Message is too short.");
                } else if ($scope.userForm.message.$error.maxlength) {
                    $scope.messageError = "Message must be at most 255 characters.";
                    console.log("Message is too long.");
                } else {
                    $scope.messageError = "Message is required.";
                    console.log("Message is required.");
                }
            }
        }
    };
});