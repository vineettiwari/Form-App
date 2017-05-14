/*
    script.js 
 */

/* MODULE */
var formApp = angular.module('formApp', ['ngRoute']);

/* ROUTE CONFIG */
formApp.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        /* ROUTE FOR HOME PAGE */
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })

        /* ROUTE FOR ABOUT PAGE */
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })

        /* ROUTE FOR CONTACT PAGE */
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        })

        .otherwise({ redirectTo: '/' });

});

/* MAIN CONTROLLER */
formApp.controller('mainController', function ($scope) {
    $scope.message = "This is the Home page.";
});

/* ABOUT CONTROLLER */
formApp.controller('aboutController', function ($scope) {
    $scope.message = "This is the About page";
});

/* CONTACT CONTROLLER */
formApp.controller('contactController', function ($scope) {
    $scope.message = "This is the Contact page";
});




// FORM SERVICE
formApp.service("formService", function () {

    this.getSuccessMessage = function (userEmail) {
        var successMessage = "Your message has been delivered to " + userEmail;
        return successMessage;
    };
    
});

// USER FORM CONTROLLER
formApp.controller('contactController', function ($scope, formService) {

    // INITIALIZE VARIABLES
    $scope.title = "";

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

            $scope.successMessage = formService.getSuccessMessage(email);
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