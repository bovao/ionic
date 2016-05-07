angular.module('starter.services', ['firebase'])

// Base de donnée tâche
.factory('ToDos', ['$firebaseArray',
    function($firebaseArray) {
        var itemsRef = new Firebase('https://myfirstappionic.firebaseio.com/ToDos');
        return $firebaseArray(itemsRef);
    }
])


//base de donnée contact
.factory('Contacts', ['$firebaseArray',
    function($firebaseArray) {
        var contactsRef = new Firebase('https://gestionioniccontact.firebaseio.com');
        return $firebaseArray(contactsRef);
    }
])

.factory('Contacts', function($firebaseArray, $firebaseObject) {

    var ref = new Firebase('https://gestionioniccontact.firebaseio.com');

    return {
        all: function() {
            var data = $firebaseArray(ref);
            return data;
        },
        get: function(id) {
            var data = $firebaseObject(ref.child(id));
            return data;
        }
    };
});