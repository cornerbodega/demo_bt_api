angular.module("countryApp")
.factory("pnDialog", ['$mdDialog', pnDialog])

function pnDialog($mdDialog) {
    // console.log('doa;g!!');

    return {
        message: function(message){
            $mdDialog.show({
                parent: angular.element(document.body),
                template:  '<div layout-padding><md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>'+
                // '    <h4>Confirm:</h4><h5> '+
                    message +

                '  </md-dialog-content>' +
                '</md-dialog></div>',
                locals: {
                    // result:
                },
                clickOutsideToClose:true
            });
        },
        messageYesOrNo: function (message, onYes) {
            $mdDialog.show({
                parent: angular.element(document.body),
                template:  '<div layout-padding><md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>'+
                // '    <h4>Confirm:</h4><h5> '+
                    message +
                '  </h5>'  +

                '  </md-dialog-content>' +
                '  <div class="md-tasks">' +
                '    <md-button ng-click="submit()" class="md-primary">' +
                '      Submit' +
                '    </md-button>' +
                '    <md-button ng-click="cancel()" class="md-warn">' +
                '      Cancel' +
                '    </md-button>' +
                '  </div></md-dialog-content>' +
                '</md-dialog></div>',
                locals: {
                    // result:
                },
                controller: SuccessController,
                clickOutsideToClose:true
            }); // end show
            function SuccessController ($scope, $mdDialog) {
                console.log('success!!');
                // scope.myinputmodel = data;
                // scope.res = result
                // console.glog(items);
                $scope.submit = function () {
                    // $location.path('/traceability');
                    // pnData.refresh();
                    // successfunction();
                    onYes();
                    $mdDialog.hide();
                }
                $scope.cancel = function() {
                    $mdDialog.hide();

                }
            }
        }
    }
}
