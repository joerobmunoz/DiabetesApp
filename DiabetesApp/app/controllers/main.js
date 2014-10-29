var mainApp = angular.module('mainApp', ['MainModel', 'ngTouch']);


// Index: http://localhost/views/main/index.html

mainApp.controller('IndexCtrl', function ($scope, MainRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/main/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/main.js)
  MainRestangular.all('main').getList().then( function(mains) {
    $scope.mains = mains;
  });

  // Native navigation
  steroids.view.navigationBar.show("Diabetes Applications");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/main/show.html?id=<id>
// Shows main functionality of a particular widget (eg. Diabetes calculator, etc.)

mainApp.controller('ShowCtrl', function ($scope, $filter, MainRestangular) {

  // Fetch all objects from the local JSON (see app/models/main.js)
  MainRestangular.all('main').getList().then( function(mains) {
    // Then select the one based on the view's id query parameter
    $scope.main = $filter('filter')(mains, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  // steroids.view.navigationBar.show(steroids.view.params['id'][0]['nav-title'][0]);
  steroids.view.navigationBar.show(steroids.view.params['id'][0]);
  steroids.view.setBackgroundColor("#FFFFFF");

});
