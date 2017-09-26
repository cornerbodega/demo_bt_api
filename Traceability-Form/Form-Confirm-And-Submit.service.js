angular
.module('countryApp')
.factory('FormConfirmAndSubmit', FormConfirmAndSubmit)
function FormConfirmAndSubmit(pnMyData, pnDB, $mdDialog, pnPost, pnDatagories){
    _formConfirmAndSubmit = {
        showDialog: showDialog,
        req: {},
        res: {}
    }

    function showDialog ($event, data, fields) { // TODO: put this in its own service
        var parentelement = angular.element(document.body);
        console.log('data');
        console.log(data);
        $mdDialog.show({
            parent: parentelement,
            targetEvent: $event,
            // scope: $scope,
            templateUrl:  'Traceability-Form/field_templates/pnConfirm.template.html',
            locals: {
                inputmodel:  data,
                inputform: fields
            },
            controller: DialogController
        }); // end show
    }
    function DialogController (scope, $mdDialog, inputmodel, $window, inputform) {
        scope.inputform = inputform
        scope.inputmodel = inputmodel;

        scope.labeled_inputmodel = {}
        console.log(scope);
        console.log(scope.inputmodel);

        var fieldHelper = {}
        // _.map($scope.)
        scope.labelField = function (value, key) {
            console.log(key + ': ' + JSON.stringify(value));
            scope.labeled_inputmodel[key] = { label: fieldHelper[key],
                                              value: scope.inputmodel[key]}
            console.log(fieldHelper);
            console.log(key);
            console.log( fieldHelper[key]);
        }

        _.map(scope.inputform, function (field) {
            fieldHelper[field.key] = field.templateOptions.label
        })

        _.map(scope.inputmodel, function (value, key) {
            scope.labelField(value, key)
        })

        if(scope.inputmodel.data) {
            _.map(scope.inputmodel.data, function (value, key) {
                _.map(value, function (v, k) {
                    scope.labelField(v, k)

                })
            })
        }


        console.log(scope.labeled_inputmodel)
        _formConfirmAndSubmit.req = scope.inputmodel
        scope.confirm = {}
        scope.confirm.cancel = function () {
            $mdDialog.hide();
        }
        scope.confirm.submit = function () {
            pnPost(scope.inputmodel).then(function(res){
                _formConfirmAndSubmit.res = res
                pnDB.saveToDB('history', {req: JSON.stringify(_formConfirmAndSubmit.req), res:JSON.stringify(_formConfirmAndSubmit.res.data), ubi: sessionStorage.ubi, at: Date.now()})
                .then(function(r){console.log(r);})
                if(res.data.success == 1) s(res);
                else f(res);
            });
            $mdDialog.hide();
        }
        scope.openInNewTab = function openInNewTab(url){
            $window.open(url, '_blank');
        }

    }

    function s (res) {
        console.log("Enormous Success! " + res.data);

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        pnMyData.refresh(pnDatagories.pnDatagoryForTask(_formConfirmAndSubmit.req.action))
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        var parentelement = angular.element(document.body);
        console.log(res);
        $mdDialog.show({
            parent: parentelement,
            templateUrl: 'Traceability-Form/field_templates/pnSuccessFromLCB.template.html',
            locals: {
                result:  res
            },
            controller: SuccessController,
            clickOutsideToClose:true
        });
        function SuccessController (scope, $mdDialog, result, pnMyData) {
            scope.res = result
            _formConfirmAndSubmit.res = result;
            scope.ok = function () {
                $mdDialog.hide();
            }
        }
    }

    function f (res) {
        console.log(res);
        var error = ""
        if(res.error) error = res.error
        else if (res.data.error) error = res.data.error
        else if(res.data) error = res.data
        console.log("Error! + " + res.error);
        alert = $mdDialog.alert({
            title: 'Error',
            content: error,
            ok: 'Close',
            clickOutsideToClose:true
        });
        $mdDialog
        .show( alert )
        .finally(function() {
            alert = undefined;
        });
    }

    return _formConfirmAndSubmit;
}
