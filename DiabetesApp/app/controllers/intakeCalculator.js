var intakeCalculatorApp = angular.module('intakeCalculatorApp', ['IntakeCalculatorModel', 'ngTouch']);


// Index: http://localhost/views/intakeCalculator/index.html

intakeCalculatorApp.controller('IndexCtrl', function ($scope, IntakeCalculatorRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/intakeCalculator/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/intakeCalculator.js)
  IntakeCalculatorRestangular.all('intakeCalculator').getList().then( function(intakeCalculators) {
    $scope.intakeCalculators = intakeCalculators;
  });

  // Native navigation
  steroids.view.navigationBar.show("Intake Calculator");
  steroids.view.setBackgroundColor("#FFFFFF");
});


// Show: http://localhost/views/intakeCalculator/show.html?id=<id>

intakeCalculatorApp.controller('ShowCtrl', function ($scope, $filter, IntakeCalculatorRestangular) {

  // Fetch all objects from the local JSON (see app/models/intakeCalculator.js)
  IntakeCalculatorRestangular.all('intakeCalculator').getList().then( function(intakeCalculators) {
    // Then select the one based on the view's id query parameter
    $scope.intakeCalculator = $filter('filter')(intakeCalculators, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("IntakeCalculator: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});

// Bind patient stats
intakeCalculatorApp.controller('StatsCtrl', function($scope) {
  $scope.stats = {
    weight: 165,
    BMI: 26.6
  };
});