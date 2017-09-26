angular.module("countryApp")
.directive('pnLabelTemplate', pnLabelTemplate)

function pnLabelTemplate(pnModel) {
    return {
        templateUrl: "pnLabelTemplate/pnLabelTemplate.template.html",
        restrict: 'E',
        scope: {},
        link: function($scope, elem, attrs) {

            if(pnModel.label_template) initLabelTemplate()
            $scope.$on('selected_label_template', initLabelTemplate)

            function initLabelTemplate() {
                console.log('INIT PAGE TEMPLATE!!!!!!');
                $scope.labelTemplate = pnModel.label_template
                console.log(pnModel);
            }

            // if(pnModel.)
            $scope.$on('selected_my_label', initSelectedMyLabel)
            //
            if(pnModel.my_label) initSelectedMyLabel()
            function initSelectedMyLabel() {
                console.log('initSelectedMyLabel');
                $scope.labelTemplate = JSON.parse(pnModel.my_label.label_template)
                // $scope.labelTemplate = pnModel.my_label.label_template
                console.log($scope.labelTemplate);
                // pnModel.label_template = $scope.labelTemplate
            }

            if(pnModel.inventory) init()
            $scope.$on('selected_inventory', init)

            function init() {
                console.log('INIT INVENTORY!!');
                console.log(pnModel);
                $scope.inventory = pnModel.inventory[0]
            }
            // function init() {
                console.log($scope.inventory);
                // $scope.inventory = $scope.item
            // }

            // $scope.$watch('model.inventory', init)

        }
    }
}
