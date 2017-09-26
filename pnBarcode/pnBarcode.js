angular.module("countryApp")
.directive("pnBarcode", pnBarcode)

function pnBarcode() {
    return {
        restrict: 'E',
        scope: {
            barcode: '=?',
            height: '=?',
            item: '=?'
        },
        template: '<div class="" ><io-barcode code="{{barcode}}" style="{{getStyle()}}" options="options" type="ITF" ></io-barcode></div>',
        link: function($scope, elem, attrs) {
            // console.log(JsBarcode);
            // console.log($scope.id);
            // console.log($scope.item);
            $scope.getStyle = function () {
                if (!$scope.height) return
                var r = "height:"+$scope.height+"px;"

                // var l = "width:50px;height:200px;"
                // console.log(r);
                return r
            }
            $scope.$on('barcodeHeight', function (e,v) {
                $scope.height = v
                $scope.item.barcodeHeight = v

                console.log('Change Barcode Height ' + v);
                // $scope.$apply
            })
            // console.log($scope.item);
            if(!$scope.height) {
                if($scope.item) {
                    if (!$scope.item.barcodeHeight) {$scope.item.barcodeHeight  = 35 }
                    $scope.height = $scope.item.barcodeHeight
                } else {
                    console.log($scope.height);
                    $scope.item.barcodeHeight =  $scope.height
                }
            }

            console.log($scope.height);
            $scope.options = {
                width: 1,
                height: $scope.height,
                displayValue: false,
                font: 'monospace',
                textAlign: 'center',
                fontSize: 15,
                backgroundColor: '#ffffff',
                lineColor: '#000000'
          }

        }
    }
}
