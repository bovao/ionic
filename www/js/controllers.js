angular.module('starter.controllers', [])

.controller('ListCtrl', function($scope, $ionicPopup, $ionicLoading, ToDos, Contacts) {

    /** Fenetre de chargement */
    $ionicLoading.show({
        template: 'Chargement...'
    });


    /** Configuration pour la liste */
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    /**  Référence à l'objet contenant les todos (items) */
    $scope.toDos = ToDos;

    $scope.toDos.$loaded().then(function(todo) {
        $ionicLoading.hide();
    });


    /** Fonction responsable de modifier un ToDo */
    $scope.editer = function(toDo) {

        $scope.data = {
            "toDoEditer": toDo.name
        };

        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.toDoEditer">',
            title: 'Modifier',
            scope: $scope,
            buttons: [{
                text: 'Retour'
            }, {
                text: '<b>Confirmer</b>',
                type: 'button-positive',
                onTap: function(e) {

                    console.log($scope.data.toDoEditer);
                    if (!$scope.data.toDoEditer) {
                        console.log("Non rien de revenu");
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        console.log("Entrée " + $scope.data.toDoEditer);

                        toDo.name = $scope.data.toDoEditer;

                        $scope.toDos.$save(toDo).then(function(ref) {
                            ref.key() === toDo.$id; // true
                            console.log("Enregistrement modifié " + toDo.$id);
                        });

                        return $scope.data.toDoEditer;
                    }
                }
            }]
        });
    };


    /** Fonction responsable de supprimer un ToDo */
    $scope.delete = function(item, todo) {

        $scope.toDos.$remove(item).then(function(ref) {
            ref.key() === item.$id; // true
        });

    };


    /** Fonction responsable d'ajouter un todo */
    $scope.ajoutTache = function() {

        $scope.data = {};

        /* Fait apparaitre fenêtre pop up */
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.NewTache">',
            title: 'Entrée une tâche',
            scope: $scope,
            buttons: [{
                text: 'Retour'
            }, {
                text: '<b>Confirmer</b>',
                type: 'button-positive',
                onTap: function(e) {

                    console.log($scope.data.NewTache);
                    if (!$scope.data.NewTache) {
                        console.log("Non rien de revenu");

                        //Ne pas laisser à l'utilisateur de fermer à moins qu'il ne pénètre le mot de passe wifi
                        e.preventDefault();
                    } else {
                        console.log("Entree " + $scope.data.NewTache);

                        /** Il conserve dans firebase */
                        $scope.toDos.$add({
                            "name": $scope.data.NewTache
                        });

                        return $scope.data.NewTache;
                    }
                }
            }]
        });

    };





    $scope.contacts = Contacts;

    $scope.purchaseContact = function(contact) {
        var contactRef = new Firebase('gestionioniccontact.firebaseio.com' + contact.$id);
        contactRef.child('status').set('purchased');
        $ionicListDelegate.closeOptionButtons();
    }


    //J'ajoute une méthode addContact
    $scope.addContact = function() {
        // J'ajoute dans firebase
        $scope.contacts.$add($scope.contact);

        //I return the value article a null
        $scope.contact = null;
    };


    /** Fonction responsable de supprimer un ToDo */
    $scope.delete = function(item, contact) {

        if (confirm("Voulez-vous supprimer cette ligne ?")) {

            $scope.contacts.$remove(item).then(function(ref) {
                ref.key() === item.$id; // true
            });
        }
    };


    //J'ajoute une méthode selection Article, par default je l'initialise à null
    $scope.ContactSelectionne = null;

    $scope.selectionContact = function(contact) {
        $scope.ContactSelectionne = contact;
    }

    $scope.modifierContact = function(contact, index) {
        $scope.contact = $scope.contacts[index];
    };


})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});