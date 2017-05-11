/*
    controllers.js 
 */

// USER FORM APP
var userFormApp = angular.module('userFormApp', []);

// USER FORM SERVICE
userFormApp.service("userFormService", function () {

    this.getSuccessMessage = function (userEmail) {
        var successMessage = "Your message has been delivered to " + userEmail;
        return successMessage;
    };
    
});

// USER FORM CONTROLLER
userFormApp.controller('formController', function ($scope, userFormService) {

    // INITIALIZE VARIABLES
    $scope.title = "User Form";

    $scope.emailError = "";
    $scope.subjectError = "";
    $scope.messageError = "";
    $scope.successMessage = "";

    $scope.submitted = false;

    // VARIFY & SUBMIT FORM
    $scope.submitForm = function (isValid) {

        console.log("validating...");

        $scope.emailError = "";
        $scope.subjectError = "";
        $scope.messageError = "";
        $scope.successMessage = "";

        if (isValid) {

            console.log("Validation successful.");

            var email = $scope.userForm.email.$modelValue;

            $scope.successMessage = userFormService.getSuccessMessage(email);
            console.log($scope.successMessage);

            $scope.submitted = true;

        } else {

            console.log("Validation failed.");

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