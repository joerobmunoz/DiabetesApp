var mainApp = angular.module('mainApp', ['MainModel', 'ngTouch']);


// Index: http://localhost/views/main/index.html
mainApp.controller('IndexCtrl', function ($scope, MainRestangular) {

  // Helper function for opening new webviews by application
  $scope.open = function(appName) {  
    //webView = new steroids.views.WebView("/views/main/show.html?id="+id);
    webView = new steroids.views.WebView("/views/" + appName + "/index.html");
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
