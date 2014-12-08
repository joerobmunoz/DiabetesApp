"use strict";

var intakeCalculatorApp = angular.module("intakeCalculatorApp", ["IntakeCalculatorModel", "ngTouch"]);

function round(num) {
  return Math.round(num * 1000)/1000;
}

// Bind patient stats
intakeCalculatorApp.controller("StatsCtrl", function($scope) {

  var webView = new steroids.views.WebView("/views/intakeCalculator/nutritionalState.html?tdd="+$scope.tdd);
  
  $scope.stats = {
    weight:"",
    bmi:""
  };

  $scope.bmiClass = "";
  $scope.tdd = "";

  // Internal functions
  function between(x, min, max) {
    return x >= min && x <= max;
  }

  var calculateTdd = function() {
    try {
      if ($scope.stats.weight !== "" && $scope.bmiClass !== "") {
        $scope.tdd = Math.round($scope.bmiClass[1] * $scope.stats.weight * 1000)/1000;

        // pre-load views
        webView = new steroids.views.WebView("/views/intakeCalculator/nutritionalState.html?tdd="+$scope.tdd);
        webView.preload();
      }
    } catch (e) {
      // NaN error, sanitize inputs
    }
  };

  var computeBmiClass = function() {
    if ($scope.stats.bmi <= 18.5) {
      $scope.bmiClass = ["Malnourished", 0.3];
    } else if (between($scope.stats.bmi, 18.51, 24.999)) {
      $scope.bmiClass = ["Lean", 0.4];
    } else if (between($scope.stats.bmi, 25, 30)) {
      $scope.bmiClass = ["Overweight", 0.5];
    } else {
      $scope.bmiClass = ["Obese", 0.6];
    }

    calculateTdd();
  };

  // External Functions
  $scope.validateInputs = function() {
    if ($scope.stats.bmi !== "" && $scope.stats.weight !== "") {
      return false;
    } else {
      return true;
    }
  };

  $scope.open = function() {
    steroids.layers.push(webView);
  };

  // Observers
  $scope.$watch("stats.bmi", computeBmiClass);
  $scope.$watch("stats.weight", calculateTdd);
});

// Show: http://localhost/views/intakeCalculator/nutritionStates.html
intakeCalculatorApp.controller("NutrtitionalStateCtrl", function ($scope, $filter, IntakeCalculatorRestangular) {

  // Fetch all objects from the local JSON (see app/models/intakeCalculator.js)
  IntakeCalculatorRestangular.all("nutritionStates").getList().then(function(nutritionalStates) {
    // Then select the one based on the view's id query parameter
    $scope.nutritionalStates = nutritionalStates;
  });

  var tdd = steroids.view.params.tdd;

  $scope.open = function(viewName) {
    var webView = new steroids.views.WebView("/views/intakeCalculator/"+viewName+".html?tdd="+tdd);
    steroids.layers.push(webView);
  };

  // Native navigation
  steroids.view.navigationBar.show("Nutrition States");
  steroids.view.setBackgroundColor("#FFFFFF");
});

// Show: nutritionStats -> continuous/eating/etc.
intakeCalculatorApp.controller("TddComponentsCtrl", function ($scope, $filter, IntakeCalculatorRestangular) {

  $scope.tdd = steroids.view.params.tdd;

  $scope.tddPercentage = function (percentage) {
    return round($scope.tdd * percentage).toString();
  };

  // Native navigation
  steroids.view.navigationBar.show("Strategy");
  steroids.view.setBackgroundColor("#FFFFFF");
});