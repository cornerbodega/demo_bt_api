angular.module('countryApp')
.directive('pnPagePreview2', pnPagePreview2)


function pnPagePreview2(pnModel, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'Traceability-Form/field_templates/Labels/2/pnPagePreview2.template.html',
        
        link: function ($scope, elem, attrs) {

            $scope.$on('label_template_and_page_template_ready_from_db', setScopeLabelAndPageTemplateFromModel)

            $scope.$watch('model.my_label', setScopeLabelAndPageTemplateFromModel)

            function setScopeLabelAndPageTemplateFromModel() {
                console.log($scope.model);
                // console.lo;
                if(!$scope.model) return console.log('Watch model.my_label. No model. Returning.');
                if($scope.model.my_label) {
                    try {
                        $scope.model.label_template = JSON.parse($scope.model.my_label.label_template)
                        $scope.model.page_template = JSON.parse($scope.model.my_label.page_template)
                        // $scope.$digest();

                    } catch (e) {
                        console.log(e);
                    }
                }
            }

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
