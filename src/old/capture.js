(function () {
    var app = angular.module('medalService', [])

    .service("captureSrv", function ($q) {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;

        this.capturePhoto = function () {
            var deferred = $q.defer();

            navigator.camera.getPicture(function (imageData) {
                deferred.resolve(imageData)
            }, function (message) {
                deferred.reject('Failed because: ' + message)
            }, {
                quality: 50,
                destinationType: destinationType.DATA_URL
            });

            return deferred.promise;
        };
    })

    .service("dataSrv", function ($q) { //$cordovaSQLite,
        var databaseName = "medal.db";
        var db = null;

        this.initialize = function () {
            var deferred = $q.defer();
            db = window.sqlitePlugin.openDatabase({ name: databaseName, location: 'default' }, function () {  }, function () { alert('KO'); })

            db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS medal (med_id integer primary key autoincrement, med_name text, med_description text, med_image blob, med_owner integer)", []);
                tx.executeSql("CREATE TABLE IF NOT EXISTS owner (own_id integer primary key autoincrement, own_lastname text, own_firstname text, own_description text, own_gender text, own_father integer, own_mother integer)", []);
                //tx.executeSql("CREATE TABLE IF NOT EXISTS link (id integer primary key autoincrement, parent integer, child integer)", []);
            }, function (err) {
                deferred.reject("An error occurred while initializing database: " + err.message);
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        };

        this.getAllMedals = function () {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM medal LEFT OUTER JOIN owner ON medal.med_owner = owner.own_id", [], function (tx, result) { //LEFT JOIN owner ON medal.owner = owner.id
                    var medals = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        var medal = {
                            id: result.rows.item(i).med_id,
                            name: result.rows.item(i).med_name,
                            description: result.rows.item(i).med_description,
                            image: result.rows.item(i).med_image
                        };

                        var owner = {
                            id: result.rows.item(i).own_id ? result.rows.item(i).own_id : 0,
                            lastname: result.rows.item(i).own_lastname ? result.rows.item(i).own_lastname : "",
                            firstname: result.rows.item(i).own_firstname ? result.rows.item(i).own_firstname : ""
                        };
                        medal.owner = owner;

                        medals.push(medal);
                    }
                    deferred.resolve(medals);
                }, function (error) { deferred.reject("An error occurred while getting medals: " + error.message); });
            });

            return deferred.promise;
        };

        this.getMedalById = function (id) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM medal where med_id = ? LIMIT 1", [id], function (tx, result) {
                    var medal = {
                        id: result.rows.item(0).id,
                        name: result.rows.item(0).name,
                        description: result.rows.item(0).description,
                        image: result.rows.item(0).image,
                        owner: result.rows.item(0).owner ? result.row.item(0).owner : 0
                    };
                    deferred.resolve(medal);
                }, function (error) {
                    deferred.reject("An error occurred while getting one medal: " + error.message);
                })
            });

            return deferred.promise;
        };

        this.getMedalsByOwner = function (ownerId) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM medal LEFT OUTER JOIN owner ON medal.med_owner = owner.own_id where medal.med_owner = ?", [parseInt(ownerId)], function (tx, result) { //LEFT OUTER JOIN owner ON medal.owner = owner.id
                    var medals = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        var medal = {
                            id: result.rows.item(i).med_id,
                            name: result.rows.item(i).med_name,
                            description: result.rows.item(i).med_description,
                            image: result.rows.item(i).med_image
                        };

                        var owner = {
                            id: result.rows.item(i).own_id ? result.rows.item(i).own_id : 0,
                            lastname: result.rows.item(i).own_lastname ? result.rows.item(i).own_lastname : "",
                            firstname: result.rows.item(i).own_firstname ? result.rows.item(i).own_firstname : ""
                        };
                        medal.owner = owner;

                        medals.push(medal);
                    }
                    deferred.resolve(medals);
                }, function (error) { deferred.reject("An error occurred while getting medals: " + error.message); });
            });

            return deferred.promise;
        }

        this.addMedal = function (name, description, image, owner) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO medal (med_name, med_description, med_image, med_owner) values (?,?,?,?)", [name, description, image, owner]);
            }, function (err) {
                deferred.reject("An error occurred while inserting medals: " + err.message);
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        };

        this.getAllOwners = function () {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM owner", [], function (tx, result) { //LEFT JOIN owner ON medal.owner = owner.id
                    var owners = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        var owner = {
                            id: result.rows.item(i).own_id,
                            lastname: result.rows.item(i).own_lastname,
                            firstname: result.rows.item(i).own_firstname,
                            description: result.rows.item(i).own_description,
                            gender: result.rows.item(i).own_gender,
                            mother: result.rows.item(i).own_mother ? result.rows.item(i).own_mother : 0,
                            father: result.rows.item(i).own_father ? result.rows.item(i).own_father : 0
                        };
                        owners.push(owner);
                    }
                    deferred.resolve(owners);
                }, function (error) { deferred.reject("An error occurred while getting owners: " + error.message); });
            });

            return deferred.promise;
        };

        this.getOwnerById = function (id) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM owner where own_id = ? LIMIT 1", [id], function (tx, result) {
                    debugger;
                    var owner = {
                        id: result.rows.item(0).own_id,
                        lastname: result.rows.item(0).own_lastname,
                        firstname: result.rows.item(0).own_firstname,
                        description: result.rows.item(0).own_description,
                        gender: result.rows.item(0).own_gender,
                        mother: result.rows.item(0).own_mother ? result.rows.item(0).own_mother : 0,
                        father: result.rows.item(0).own_father ? result.rows.item(0).own_father : 0
                    };
                    deferred.resolve(owner);
                }, function (error) {
                    deferred.reject("An error occurred while getting one owner: " + error.message);
                })
            });

            return deferred.promise;
        };

        this.addOwner = function (lastname, firstname, description, gender, father, mother) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO owner (own_lastname, own_firstname, own_description, own_gender, own_father, own_mother) values (?,?,?,?,?,?)", [lastname, firstname, description, gender, father, mother]);
            }, function (err) {
                deferred.reject("An error occurred while inserting owners: " + err.message);
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        };

        this.deleteOwner = function (id) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("DELETE FROM owner where own_id = ?", [id]);
            }, function (err) {
                deferred.reject("An error occurred while deleting owner: " + err.message);
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        };

        this.updateOwner = function (id, lastname, firstname, description, gender, father, mother) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("UPDATE owner set own_lastname = ?, own_firstname = ?, own_description = ?, own_gender = ?, own_father = ?, own_mother = ? where own_id = ?", [lastname, firstname, description, gender, father, mother, id]);
            }, function (err) {
                deferred.reject("An error occurred while updating owners: " + err.message);
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        };
    });

})();
