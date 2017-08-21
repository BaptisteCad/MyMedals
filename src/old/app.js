(function () {
    var app = angular.module('starter', ['ionic', 'medalController']) //,'ngCordova'

    .run(function ($ionicPlatform, dataSrv) {
        $ionicPlatform.ready(function () {
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            dataSrv.initialize().then(function () { alert("Database OK"); }, function (err) { alert(err); });
        });

    })

    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
          $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'partials/menu.html'
        })
            .state('app.medalListByOwner', {
                url: '/medalList/:ownerId',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/medalList.html',
                        controller: 'MedalListCtrl'
                    }
                }
            })
            .state('app.medalList', {
                url: '/medalList',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/medalList.html',
                        controller: 'MedalListCtrl'
                    }
                }
            })
            .state('app.addMedal', {
                url: '/addMedal',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/addMedal.html',
                        controller: 'AddMedalCtrl'
                    }
                }
            })
            .state('app.addMedalId', {
                url: '/addMedal/:medalId',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/addMedal.html',
                        controller: 'AddMedalCtrl'
                    }
                }
            })
            .state('app.ownerList', {
                cache: false,
                url: '/ownerList',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/ownerList.html',
                        controller: 'OwnerListCtrl'
                    }
                }
            })
            .state('app.ownerTree', {
                cache: false,
                url: '/ownerTree',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/ownerTree.html',
                        controller: 'OwnerTreeCtrl'
                    }
                }
            })
            .state('app.addOwner', {
                url: '/addOwner',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/addOwner.html',
                        controller: 'AddOwnerCtrl'
                    }
                }
            })
            .state('app.addOwnerId', {
                url: '/addOwner/:ownerId',
                views: {
                    'viewContent': {
                        templateUrl: 'partials/addOwner.html',
                        controller: 'AddOwnerCtrl'
                    }
                }
            });
          $urlRouterProvider.otherwise('/app/ownerList');
      }]);

})();