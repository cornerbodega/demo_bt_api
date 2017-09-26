angular.module('countryApp')
.factory('pnBrowseClick', pnBrowseClick)
function pnBrowseClick($mdDialog) {
    return browseClick


    function browseClick(event, item) {
        // $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'Traceability-Form/field_templates/browse_dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        // .then(function(answer) {
        //     $scope.status = 'You said the information was "' + answer + '".';
        // }, function() {
        //     $scope.status = 'You cancelled the dialog.';
        // });
        // };
        console.log(event);

        function DialogController($scope, $mdDialog, pnItemNotes, $rootScope, pnDB) {
            $scope.item = item
            $scope.notes = []

            initNotes()

            $scope.$on('initNotes', initNotes)
            function initNotes() {
                console.log('initNotes');
                console.log($scope.notes);
                console.log($scope.item);
                console.log(pnItemNotes);
                console.log(pnItemNotes.notesByConcerningId[item.id]);
                if(!pnItemNotes.notesByConcerningId[item.id]) pnItemNotes.notesByConcerningId[item.id] = []
                if(pnItemNotes.notesByConcerningId[item.id]) $scope.notes = pnItemNotes.notesByConcerningId[item.id]
                if($scope.notes.length === 0) {
                    $scope.selectedIndex = 1
                } else {
                    $scope.selectedIndex = 0
                }
            }

            console.log($scope.notes);
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };



            $scope.post = function () {
                var r = {
                    user_email: sessionStorage.username,
                    note_id: makeid(),
                    content: $scope.newPost,
                    ubi: sessionStorage.ubi,
                    concerning_id: item.id,
                    at: Date.now()/ 1000,
                    atLabel: new Date(Date.now()).toLocaleString(),
                    companyName: sessionStorage.myName
                }

                pnDB.saveToDB('item_notes', r)
                .then(function (res) {
                    console.log(res);
                    $rootScope.$broadcast('item_notes')
                    $scope.selectedIndex = 0
                    $scope.newPost = ""


                })
            }
            $scope.deleteNote = function (note) {
                note.deleted = 1
                pnDB.saveToDB('item_notes', note)
                .then(function (res) {
                    $rootScope.$broadcast('item_notes')
                })
            }
            // console.log(r);
            // $scope.answer = function(answer) {
            //     $mdDialog.hide(answer);
            // };
        }

    }

}
