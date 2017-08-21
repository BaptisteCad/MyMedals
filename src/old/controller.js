(function () {

    var app = angular.module("medalController", ['medalService'])

    .controller('MedalListCtrl', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicScrollDelegate, $stateParams, dataSrv) {

        $scope.$on('$ionicView.enter', function () {
            if ($stateParams.ownerId) {
                dataSrv.getMedalsByOwner($stateParams.ownerId).then(function (medals) {
                    $scope.medals = medals;
                    $ionicSlideBoxDelegate.update();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                dataSrv.getAllMedals().then(function (medals) {
                    $scope.medals = medals;
                    $ionicSlideBoxDelegate.update();
                }, function (error) {
                    alert(error);
                });
            }
        });

        $scope.showMedal = function (id) {
            var select = $scope.medals.filter(function (elem) { return elem.id == id; });
            $scope.zoomMedal = select[0];

            $scope.openModal();
        }

        $scope.hideMedal = function () {
            $scope.zoomMedal = {};
            $scope.closeModal();
        }

        $scope.resetZoom = function () {
            $ionicScrollDelegate.zoomTo(1, true);
        }

        $ionicModal.fromTemplateUrl('zoom.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
    })

    .controller('AddMedalCtrl', function ($scope, $stateParams, captureSrv, dataSrv) {
        $scope.newMedal = {};
        if ($stateParams.medalId) {
            dataSrv.getMedalById($stateParams.medalId).then(function (medal) {
                $scope.newMedal.id = medal.id;
                $scope.newMedal.name = medal.name;
                $scope.newMedal.description = medal.description;
                $scope.newMedal.image = medal.image;
                $scope.newMedal.selectOwner.id = medal.owner;
            }, function (error) {
                alert(error);
            });
        }

        $scope.$on('$ionicView.enter', function () {
            dataSrv.getAllOwners().then(function (owners) {
                $scope.owners = owners;
            }, function (error) {
                alert(error);
            });
        });

        $scope.takePhoto = function () {
            captureSrv.capturePhoto().then(function (imageData) {
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = "data:image/jpeg;base64," + imageData;
                $scope.newMedal.image = imageData
            }, function (error) {
                alert(error);
            });
        }

        $scope.save = function () {
            var ownerId = $scope.newMedal.selectOwner ? $scope.newMedal.selectOwner.id : null;

            dataSrv.addMedal($scope.newMedal.name, $scope.newMedal.description, $scope.newMedal.image, ownerId).then(function () {
                alert("medal added !!! ");
                //$location.path("#/app/medalList").replace();
            }, function (err) {
                alert(err);
            });
        }
    })

    .controller('OwnerListCtrl', function ($scope, $ionicSlideBoxDelegate, dataSrv) {

        $scope.$on('$ionicView.enter', function () {
            dataSrv.getAllOwners().then(function (owners) {
                $scope.owners = owners;
                $ionicSlideBoxDelegate.update();
            }, function (error) {
                alert(error);
            });
        });

        $scope.deleteOwner = function (id) {
            dataSrv.deleteOwner(id).then(function () {
                for (var i = 0; i < $scope.owners.length; i++) {
                    if ($scope.owners[i].id == id) {
                        $scope.owners.splice(i, 1);
                        break;
                    }
                }
            }, function (error) {
                alert(error);
            });
        }
    })

    .controller('OwnerTreeCtrl', function ($scope, $ionicSlideBoxDelegate, dataSrv) {

        //$scope.$on('$ionicView.enter', function () {
        //    dataSrv.getAllOwners().then(function (owners) {
        //        $scope.owners = owners;
        //        $ionicSlideBoxDelegate.update();
        //    }, function (error) {
        //        alert(error);
        //    });
        //});
    })

    .controller('AddOwnerCtrl', function ($scope, $ionicSlideBoxDelegate, $stateParams, dataSrv) {
        $scope.newOwner = {};
        if ($stateParams.ownerId) {
            alert($stateParams.ownerId);
            dataSrv.getOwnerById($stateParams.ownerId).then(function (owner) {
                alert("renseignement des informations")
                $scope.newOwner.id = owner.id;
                $scope.newOwner.lastname = owner.lastname;
                $scope.newOwner.firstname = owner.firstname;
                $scope.newOwner.description = owner.description;
                $scope.newOwner.gender = owner.gender;
                $scope.newOwner.selectFather.id = owner.father;
                $scope.newOwner.selectMother.id = owner.mother;
            }, function (error) {
                alert(error);
            });
        }

        $scope.$on('$ionicView.enter', function () {
            dataSrv.getAllOwners().then(function (owners) {
                $scope.fathers = owners.filter(function (elem) { return elem.gender == 'H'; });
                $scope.mothers = owners.filter(function (elem) { return elem.gender == 'F'; });
                //$ionicSlideBoxDelegate.update();
            }, function (error) {
                alert(error);
            });
        });

        $scope.save = function () {
            var fatherId = $scope.newOwner.selectFather ? $scope.newOwner.selectFather.id : null;
            var motherId = $scope.newOwner.selectMother ? $scope.newOwner.selectMother.id : null;

            if ($scope.newOwner.id) {
                dataSrv.updateOwner($scope.newOwner.id, $scope.newOwner.lastname, $scope.newOwner.firstname, $scope.newOwner.description, $scope.newOwner.gender, fatherId, motherId).then(function () {
                    alert("owner updated !!! ");
                    //$location.path("#/app/medalList").replace();
                }, function (err) {
                    alert(err);
                });
            }
            else {
                dataSrv.addOwner($scope.newOwner.lastname, $scope.newOwner.firstname, $scope.newOwner.description, $scope.newOwner.gender, fatherId, motherId).then(function () {
                    alert("owner added !!! ");
                    //$location.path("#/app/medalList").replace();
                }, function (err) {
                    alert(err);
                });
            }
        }
    })

    //.controller('AppCtrl', function ($scope, dataSrv) {

    //    $scope.$on('$ionicView.enter', function () {
    //        dataSrv.getAllOwners().then(function (owners) {
    //            $scope.owner = owners[0];
                
    //        }, function (error) {
    //            alert(error);
    //        });
    //    });

    //})

    .directive("person", function (dataSrv) {
        return {
            restrict: "E",
            templateUrl: "partials/person.html",
            scope:{
                personid: "@"
            },
            controller: function() {
                this.tab = 1;

                this.isSet = function(checkTab) {
                    return this.tab === checkTab;
                };

                this.setTab = function(activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"

            //link: function ($scope, $element, attr) {
            //    debugger;
            //    $scope.owner = {};

            //    if (attr.personid != '') {
            //        dataSrv.getOwnerById(attr.personid).then(function (owner) {
            //            debugger;
            //            $scope.owner = owner;
            //            $scope.owner.hasFather = (owner.father == 0) ? false : true;
            //            $scope.owner.hasMother = (owner.mother == 0) ? false : true;
            //        }, function (error) {
            //            alert(error);
            //        });
            //    }
            //}
        };
    });

})();


