angular.module('starter.controllers', ['starter.services'])

.controller('ContactCtrl', function($scope, Contacts) {


    $scope.contacts = Contacts.all();

    //J'ajoute une méthode addContact
    $scope.addContact = function(newContact) {

        $scope.contacts.$add(newContact);

        // J'ajoute dans firebase
        alert("Nouveau contact ajouté");

        //I return the value article a null
        $scope.contact = null;
    };


    /** Fonction responsable de supprimer un contact */
    $scope.deleteContact = function(item, contact) {

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

})

.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
    $scope.contactSelectionne = Contacts.get($stateParams.id);
    $scope.modeLecture = true;

    $scope.EditerContact = function() {
        $scope.modeLecture = false;
    };

    $scope.sauverContact = function(newContact) {
        $scope.modeLecture = true

        $scope.contactSelectionne.$save(newContact).then(function(ref) {
            ref.key() === newContact.$val; // true
        });
    }
})


.controller('TacheCtrl', function($scope, $ionicPopup, $ionicLoading, ToDos) {

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
                    /** Il conserve dans firebase */
                    $scope.toDos.$add({
                        "name": $scope.data.NewTache
                    });

                    return $scope.data.NewTache;

                }
            }]
        });

    };

})