angular.module('countryApp')
.directive('pnPagePreview', pnPagePreview)


function pnPagePreview(pnModel, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'Traceability-Form/field_templates/Labels/pnPagePreview.template.html',
        // scope: {
        //     labelTemplate: '=',
        //     pageTemplate: '='
        // },
        link: function ($scope, elem, attrs) {
            // if(!$scope.model)$scope.model = {}
            //
            //
            $scope.$on('selected_my_label', init)
            // if(pnModel.page_template) init()
            function  init() {
                console.log(pnModel);
                if(pnModel.my_label) {
                    $scope.model.page_template = JSON.parse(pnModel.my_label.page_template)
                    $scope.model.label_template = JSON.parse(pnModel.my_label.label_template)
                    $scope.page_template = $scope.model.page_template
                    $scope.label_template = $scope.model.label_template
                    console.log($scope.model.label_template);
                    console.log($scope.model.page_template);
                }
            }
            //     else if (pnModel.label_template) {
            //         $scope.model.label_template = pnModel.label_template
            //     }
            //     if (pnModel.page_template) {
            //         $scope.model.page_template = pnModel.page_template
            //     }
            //
            //
            // }
            // if($scope.page_template) $scope.model.page_template = $scope.pageTemplate
            // $scope.$watch('model.my_label', function () {
            //     console.log('MY LABEL SELECTED');
            //     $scope.page_template = JSON.parse($scope.my_label.page_template)
            //     $scope.label_template = JSON.parse($scope.my_label.label_template)
            // })
            $scope.$on('toPrint', function () {
                $scope.toPrint = true
                // $scope.getBorder()
                // console.log('toPrint');
            })
            $scope.getBorder = function () {
                if (!$scope.toPrint) return 'border: dashed 1px black;'
                else return ''
            }
            $scope.getStyle = function (style) {
                // console.log(style);
                return style
            }
            $scope.getArray = function (l) {
                var a = []
                for (var i=1; i <= l; i++) {
                    a.push(i)
                }
                return a
            }
        }
    }
}
