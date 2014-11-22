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
    weight:'',
    bmi:''
  };

  $scope.pancreatectomy = false;
  $scope.steroids = false;
  $scope.over70 = false;
  $scope.bmiClass = 'Test'

  function between(x, min, max) {
    return x >= min && x <= max;
  }

   var computeBmiClass = function() {
    if ($scope.stats.bmi <= 18.5) {
      $scope.bmiClass = "Malnourished";
    } else if (between($scope.stats.bmi, 18.51, 24.999)) {
      $scope.bmiClass = "Lean";
    } else if (between($scope.stats.bmi, 25, 30)) {
      $scope.bmiClass = "Overweight";
    } else {
      $scope.bmiClass = "Obese";
    }
  }

  $scope.$watch('stats.bmi', computeBmiClass);

});

intakeCalculatorApp.controller('PrescreenCtrl', function($scope) {
  $scope.screening = {
    dm1: 0,
    dm2: 0,
    pancreatectomy: 0,
    steroids: 0
  }
});