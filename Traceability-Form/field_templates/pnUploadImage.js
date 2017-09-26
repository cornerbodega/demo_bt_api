angular.module('countryApp').directive('pnUploadImage', ['$rootScope', pnUploadImage])
angular.module('countryApp').directive('pnUploadImageIso', pnUploadImageIso)


function pnUploadImageIso($rootScope) {
    return {
        restrict: 'E',
        scope: { item: '=' },
        templateUrl: 'Traceability-Form/field_templates/pn-upload-image-iso.html',
        link: function($scope, element, attrs) {
            console.log($scope.item);
            // console.log($scope.item);
            // $scope.model = { images: {} };
            var editable = {}
            // $scope.$on('imageUploaded', imageUploaded);
            // function imageUploaded() {
            //     $scope.$digest();
            //     // console.log($scope.item.image + '  ' + $scope.item.id);
            //     console.log('IMAGE UPLOADED FIRED' + '$scope.item.id = ' + $scope.item.id +" $scope.item.image = " + $scope.item.image);
            //
            //     // _.map($scope.model.images, function(image, key){
            //     //     console.log(image);
            //     //     console.log(key);
            //     //     if (key === $scope.item.id) {
            //     //         $scope.item.image = image;
            //     //     }
            //     // })
            // }
            $scope.pnUploadProductImage = function(item) {
                if(item.key) item.id = item.key
                // $scope.item = angular.copy(item)
                console.log(item.id + " UPLOAD INITIATED!");
                console.log('UPLOAD IMAGE CALLED FOR ' + item.id);
                editable[item.id] = true;
                // console.log(widget);
                // widget.openDialog()

                $scope.widget = new uploadcare.Widget('[role=uploadcare-uploader]');

                $scope.widget.openDialog(null, {
                    // ng-model="object.image.info.uuid"
                    publicKey: "55a55d432aed473a7467",
                    imagesOnly: true,
                    // onUploadComplete: 'onUploadComplete(info)',
                })

                // widget.onChange
                // widget.onUploadComplete = onUploadComplete
                $scope.widget.onUploadComplete(function(info){
                    onUploadComplete1(info, item)
                })
                function onUploadComplete1(info, item) {
                    if(!editable[item.id]) return
                    console.log('UPLOAD COMPLETE FOR ' + item.id);
                    console.log(info);

                    item.image = info.cdnUrl;
                    editable[item.id] = false

                    setImageSize()

                    $rootScope.$broadcast('imageUploaded', item.image)
                    $scope.$digest();


                    // matchItemWithImage(info, item);
                };
                $scope.$on('updateImageSize', function (event, size) {
                    console.log('Set Size');
                    console.log(size);
                    item.imageWidthPx = size.width *72 ;
                    // setImageSize()
                })
                // $scope.$watch('item.imageWidth')
                function setImageSize() {
                    // item.imageStyle="height: "+$scope.imageHeight+" in; width:"+$scope.imageWidth+" in;"
                    // item.imageStyle = {
                    //     'height': item.imageHeight + ' in',
                    //     'width': item.imageWidth+' in'
                    // }
                    // $scope.$digest()
                    // console.log('Set Image Style' + item.imageStyle);
                    return item.imageStyle
                    // console.log();
                }
                function matchItemWithImage(info, item) {
                    // item = item;

                    console.log('Upload Complete! FOR: $scope.item.id =' +item.id + "$scope.item.image=" +item.image  );

                    // // $scope.item.image = info.cdnUrl;
                    // // console.log(info);
                    // // console.log(info.cdnUrl + '  ' + item.id);
                    // $scope.item = item
                    // $scope.model.images[$scope.item.id] = info.cdnUrl
                    // // // imageUploaded($scope.item, info)
                    // console.log($scope.model);
                    // $rootScope.$broadcast('imageUploaded')

                }
             };
        }
    }
}


function pnUploadImage($rootScope) {
    return {
        restrict: 'E',
        // scope: { item: '=' },
        templateUrl: 'Traceability-Form/field_templates/pn-upload-image.html',
        link: function($scope, element, attrs) {
            // console.log($scope.item);
            // $scope.model = { images: {} };
            var editable = {}
            // $scope.$on('imageUploaded', imageUploaded);
            // function imageUploaded() {
            //     $scope.$digest();
            //     // console.log($scope.item.image + '  ' + $scope.item.id);
            //     console.log('IMAGE UPLOADED FIRED' + '$scope.item.id = ' + $scope.item.id +" $scope.item.image = " + $scope.item.image);
            //
            //     // _.map($scope.model.images, function(image, key){
            //     //     console.log(image);
            //     //     console.log(key);
            //     //     if (key === $scope.item.id) {
            //     //         $scope.item.image = image;
            //     //     }
            //     // })
            // }

            $scope.pnUploadProductImage = function(item) {
                if(item.key) item.id = item.key
                // $scope.item = angular.copy(item)
                console.log(item.id + " UPLOAD INITIATED!");
                console.log('UPLOAD IMAGE CALLED FOR ' + item.id);
                editable[item.id] = true;
                // console.log(widget);
                // widget.openDialog()

                $scope.widget = new uploadcare.Widget('[role=uploadcare-uploader]');

                $scope.widget.openDialog(null, {
                    // ng-model="object.image.info.uuid"
                    publicKey: "55a55d432aed473a7467",
                    imagesOnly: true,
                    // onUploadComplete: 'onUploadComplete(info)',
                })

                // widget.onChange
                // widget.onUploadComplete = onUploadComplete
                $scope.widget.onUploadComplete(function(info){
                    onUploadComplete1(info, item)
                })
                function onUploadComplete1(info, item) {
                    if(!editable[item.id]) return
                    console.log('UPLOAD COMPLETE FOR ' + item.id);
                    item.image = info.cdnUrl;
                    editable[item.id] = false
                    $scope.$digest();


                    // matchItemWithImage(info, item);
                };
                function matchItemWithImage(info, item) {
                    // item = item;

                    console.log('Upload Complete! FOR: $scope.item.id =' +item.id + "$scope.item.image=" +item.image  );

                    // // $scope.item.image = info.cdnUrl;
                    // // console.log(info);
                    // // console.log(info.cdnUrl + '  ' + item.id);
                    // $scope.item = item
                    // $scope.model.images[$scope.item.id] = info.cdnUrl
                    // // // imageUploaded($scope.item, info)
                    // console.log($scope.model);
                    // $rootScope.$broadcast('imageUploaded')

                }
             };
        }
    }
}
