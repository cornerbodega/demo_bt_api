angular.module('countryApp')
.directive('pnHtmlToPdf', pnHtml2Pdf)
.directive('pnRotate', pnRotate)

function pnHtml2Pdf($location) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            console.log('we made it! ayy');
            console.log($location.path());
            var e = document.getElementById("pnLabelPage")
            var r = document.getElementById("pnLabelRoot")


            if($location.path().indexOf('print_labels' ) > -1){
            // if($location.path().indexOf('print_labels') > -1){
                // if ($scope.page_template.continuous) {
                var load = setTimeout(function() {
                    init()
                }, 2000);
            }

            // if ($location.path().indexOf('labels2' ) > -1 ) {
            //     initKova()
            // }
            // function initKova() {
            //
            //     var data = canvas.toDataURL();
            //     // e.src  =data
            //     console.log(data);
            //     var docDefinition = {
            //
            //         // pageOrientation: 'portrait',
            //         content: [{
            //             image: data,
            //             width: oldWidth,
            //             height: oldHeight,
            //
            //
            //         }],
            //         pageSize: {
            //             width: oldWidth,
            //             height: oldHeight,
            //         },
            //         pageMargins: [ 0, 0, 0, 0 ],
            //     };
            //     pdfMake.createPdf(docDefinition).download("labels_"+  Date.now()+".pdf");
            // }
            function getHeightAndWidthFromString(string) {

                // "height:1.125in;width:3.75in;"
                var h = 0
                var w = 0
                var r = {
                    height: h,
                    width: w
                }
                var sides = string.split(";")
                sides.map(function (side) {
                    //["height:1.25in", "width:3.75in"]

                    var vals = side.split(":")
                    // ["height", 1.25in]
                    console.log(vals[0]);
                    if(vals[0]==='height') {
                        r.height = stripIn(vals[1])
                    }
                    if(vals[0]===' width' || vals[0] ==='width') {
                        r.width=stripIn(vals[1])
                    }
                    function stripIn(toStrip){
                        console.log(toStrip);
                        var stripped = toStrip.split('in')[0]
                        console.log(stripped);
                        return stripped
                    }
                })


                return r
            }

            var times = 0
            function initLabelSheets() {
                times++;
                console.log('Label Sheets!! ' + times);
            }

            function init() {
                // times ++
                console.log('Init pnHtml2Pdf');
                if(!$scope.page_template) return
                console.log($scope.page_template.continuous == 1);
                if($scope.model.my_label) $scope.page_template = JSON.parse($scope.model.my_label.page_template)
                // // if (times > 1) return console.log('Nope! Just once!');
                if($scope.page_template.continuous == 0) return initLabelSheets()
                // console.log();
                var lAndW = getHeightAndWidthFromString($scope.page_template.labelSize)
                var ch = +lAndW.height;
                var cw = +lAndW.width ;
                // var bigCanvas = $("<div />").appendTo("#pnLabelRoot");
                var bCanvas = angular.element('<div></div>')
                var body = angular.element(document).find('body').eq(0);
                body.css({width:cw * 96})
                // var bigCanvas = r
                bCanvas.appendTo(body)
                console.log(bCanvas);
                var scaledElement = angular.element('#pnLabelParent').clone().css({'transform': 'scale(3,3)','transform-origin': '0 0' })
                .appendTo(bCanvas)
                console.log(scaledElement);


                var oldWidth = scaledElement.width();
                var oldHeight = scaledElement.height();

                console.log(oldWidth + " " + oldHeight + " " + ch + " " + cw);
                var newWidth = oldWidth * 3;
                var newHeight = oldHeight * 3;

                bCanvas.css({
                    'width': newWidth,
                    'height': newHeight
                })


                bCanvas.width = newWidth
                bCanvas.height = newHeight

                bigCanvas = bCanvas
                console.log(bigCanvas);
                // console.log(bigCanvas.style;
                // console.log(bigCanvas.height;
                html2canvas(bigCanvas, {
                    useCORS: true,
                    onrendered: function (canvas) {
                        // var lAndW = getHeightAndWidthFromString($scope.page_template.labelSize)
                        // var ch = +lAndW.height * 200;
                        // var cw = +lAndW.width * 200;
                        // if($scope.page_template.printVertically){
                        //     var rotCanvas = document.createElement("canvas");
                        //
                        //     // swap width and height
                        //     rotCanvas.width = canvas.height;
                        //     rotCanvas.height = canvas.width;
                        //
                        //     // get context
                        //     var rctx = rotCanvas.getContext("2d");
                        //
                        //     // translate to center (rotation pivot)
                        //     rctx.translate(rotCanvas.width * 0.5, rotCanvas.height * 0.5);
                        //
                        //     // rotate -90° (CCW)
                        //     rctx.rotate(-Math.PI * 0.5);
                        //
                        //     // draw image offset so center of image is on top of pivot
                        //     rctx.drawImage(canvas, -canvas.width * 0.5, -canvas.height * 0.5);
                        //     // extract image from rotate canvas
                        //     var data = rotCanvas.toDataURL('image/png');
                        //     console.log(data);
                        //     // rotCanvas.hide()
                        //
                        //     var image = new Image();
                        //     image.src = data;
                        //     var t = angular.copy(ch)
                        //     ch = angular.copy(cw)
                        //     cw = t
                        // }
                        // else {
                        //     var data = canvas.toDataURL();
                        //
                        // };
                        var data = canvas.toDataURL();
                        // e.src  =data
                        console.log(data);
                        var docDefinition = {

                            // pageOrientation: 'portrait',
                            content: [{
                                image: data,
                                width: oldWidth,
                                height: oldHeight,


                            }],
                            pageSize: {
                                width: oldWidth,
                                height: oldHeight,
                            },
                            pageMargins: [ 0, 0, 0, 0 ],
                        };
                        pdfMake.createPdf(docDefinition).download("labels_"+  Date.now()+".pdf");
                        bigCanvas.hide()
                    }
                });
            }

        }
    }
}
function pnRotate() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.degrees, function (rotateDegrees) {
                console.log(rotateDegrees);
                var r = 'rotate(' + rotateDegrees + 'deg)';
                element.css({
                    '-moz-transform': r,
                    '-webkit-transform': r,
                    '-o-transform': r,
                    '-ms-transform': r
                });
            });
        }
    }
};
