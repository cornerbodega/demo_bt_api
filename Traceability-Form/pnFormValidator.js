angular.module('countryApp')
.factory('pnFormValidator', ['$rootScope', pnFormValidator])
.directive('pnFieldValidator', ['pnFormValidator', pnFieldValidator])
function pnFieldValidator(pnFormValidator) {
    return {
        restrict: 'AE',
        // templateUrl:'Traceability-Form/field_templates/pn-field-validator.html',
        template:"<div ng-class=\"errors[options.key] ? 'red lighten-3': ''\"><div layout-padding></div><ng-transclude></ng-transclude></div>",

        transclude: true,
        link: function($scope, elem, attrs) {
            // console.log($scope.errors);
            $scope.$on('errors', function(errors){
                console.log(errors);
                console.log('Errors!!! ');
                $scope.erorrs = false
                $scope.errors = pnFormValidator.errors()
                console.log($scope.errors);
            })
        }
    }
}

function pnFormValidator($rootScope) {
    var _errors = {}

    return {validate: validate, errors: errors}
    function errors() {
        console.log(_errors);
        return _errors;
    }
    function validate (task, pnFormlyFields, pnFormlyModel) {



        var required = [];
        _.map(pnFormlyFields, function(field) {
            if(!field.templateOptions) return
            if (!field.templateOptions.optional && !field.optional) required.push(field.key)
        })
        var have = _.keys(pnFormlyModel)

        var difference = _.difference(required, have);

        // if(task === "inventory_manifest") {
        //     if (!pnFormlyModel.approximate_arrival) {
        //         difference.push('approximate_arrival')
        //     }
        //     if (!pnFormlyModel.approximate_departure) {
        //         difference.push('approximate_departure')
        //     }
        // }
        console.log(difference);
        var optional = ['final']

        // if(difference)
        // difference = _.filter(difference, function(diff) { return !_.contains(optional, diff)})

        if (difference.length === 0) {
            _errors = {}
            $rootScope.$broadcast('errors');

            console.log('VALID!!!!');
            return true
        } else {
            var e = {}
            _.map(difference, function(field) {
                e[field] = true;
            })
            _errors = e
            console.log('INVALID!! ' + _.keys(e).length + ' ERRORS!' );
            $rootScope.$broadcast('errors');
            // return false;
            return true
        }

    };

        // I need a way to flag each field as required or not
        // Assuming all fields are required and excepting edge cases is gross.

        // _errors = {};
        // _isValid = false;
        //
        // if (task === 'inventory_transfer_inbound') return _isValid = true
        //
        // var required = _.map(pnFormlyFields, function(field) { return field.key })
        // console.log(required);
        // var have = _.keys(pnFormlyModel)
        // console.log(have);
        // var difference = _.difference(required, have);
        // console.log(difference);
        // console.log(task);
        //
        // // CASE WHERE FORM IS COMPLETE
        // if (difference.length === 0) {
        //     return _isValid = true;
        // }
        //
        // _.map(difference, function(field) {
        //     _errors[field] = true;
        // })
        // // ############## VALIDATION EXCEPTIONS ###############
        //
        // if (task==='inventory_convert') {
        //     if(_errors['derivative_usable'] && _.size(_errors) === 1) {
        //         return _isValid = true;
        //     }
        // }
        // if (task ==='inventory_manifest' && difference[0]==='stops' && difference.length === 1)  return _isValid = true;
        //
        // if (task ==='plant_harvest || plant_cure' && difference[0]==='final' && difference.length === 1)  return _isValid = true;
        //
        //
        //
        // $rootScope.$broadcast('errors');
        // return errors
    // }

    // _isValid = false;
    // _errors = {};

    // var v = {
    //     // isValid: isValid,
    //     validate: validate,
    //     // errors: errors
    // }

    // function isValid() {
    //     return _isValid;
    // }
    // function errors() {
    //     return _errors;
    // }

    // return v
}
