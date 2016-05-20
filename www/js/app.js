// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'views/accueil.html'
        })
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'views/contacts.html',
            controller: 'ContactCtrl'
        })
        .state('contactDetail', {
            url: '/contact/:id',
            templateUrl: 'views/detail-contact.html',
            controller: 'ContactDetailCtrl'
        })
        .state('ajout-contact', {
            url: '/ajout-contact',
            templateUrl: 'views/ajout-contact.html',
            controller: 'ContactCtrl'
        })
        .state('taches', {
            url: '/taches',
            templateUrl: 'views/taches.html',
            controller: 'TacheCtrl'
        })


    $urlRouterProvider.otherwise('/');
})


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

;