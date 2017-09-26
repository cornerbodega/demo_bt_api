angular.module('countryApp')
.controller('pnPrintLabelsPageController', pnPrintLabelsPageController)

function pnPrintLabelsPageController($scope, $routeParams, pnDB, $rootScope, $window) {
    console.log($routeParams);
    pnDB.getFromDB('select label from labels_to_print where id="'+$routeParams.id+'"').then(init)

    function init(res) {
        // $rootScope.$broadcast('toPrint')
        $scope.toPrint = true
        console.log(res);
        var label = JSON.parse(res.data[0].label)
        console.log(label);
        $scope.model = {
            page_template: JSON.parse(label.page_template),
            label_template: JSON.parse(label.label_template),
            inventory: JSON.parse(label.item),
            item: JSON.parse(label.item)
        }
        // $scope.model.inventory = [$scope.model.inventory]
        console.log();
        console.log($scope.model);
        $scope.model.inventory = [$scope.model.inventory]
        $scope.model.label_template = $scope.model.label_template
        $scope.model.page_template = $scope.model.page_template
        $scope.$broadcast('label_template_and_page_template_ready_from_db')
        // $window.print();

        console.log($scope.model.page_template);
        if($scope.model.page_template.continuous === "1") {
            console.log('FLIP IT GOOd!!');
        }

    }
}
