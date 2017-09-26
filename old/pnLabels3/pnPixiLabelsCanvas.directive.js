angular.module('countryApp')
.directive("pnPixiLabelsCanvas", pnPixiLabelsCanvas)

function pnPixiLabelsCanvas(pnModel) {
    return {
        templateUrl: 'pnLabels3/pnPixiLabelsCanvas.template.html',
        link: function ($scope, elem, attrs) {

            // var width  = window.innerWidth;
            // var height = window.innerHeight;
            // console.log(getStyle(page_template.labelSize));
            // console.log($scope.page_template.labelSize);


            $scope.$on('selected_page_template', function (e, v) {
                console.log(v);
                console.log('selected_page_template11');
                $scope.page_template = pnModel.page_template
                // console.log(pnModel.page_template);
                // console.log($scope.page_template);
                init()
            })
            init()
            function init() {
                $scope.page_template = pnModel.page_template
                console.log(pnModel);
                $scope.label_template = pnModel.label_template
                console.log($scope.page_template.labelSize);
                console.log($scope.label_template);
                console.log('SElected label_template');
                var hw = getHeightAndWidthFromString($scope.page_template.labelSize);

                var canvas = elem[0]
                canvas.height = hw.height * 96;
                canvas.width  = hw.width * 96;
                var ctx = canvas.getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillStyle = 'green'
                // ctx.fillRect(0,0,canvas.width,canvas.height)
                ctx.fillText($scope.label_template.A[0].type,10,40);

                // console.log(canvas);
//                 var canvas1 = angular.element('<canvas></canvas>')
//                 // console.log(canvas1[0].getContext('2d'));
//                 var body = angular.element(document).find('body').eq(0);
//
//     /            // var ctx = canvas1[0].getContext('2d');
// //
//
//

                //
                // for (var i = 0; i < (hw.height * 96)/25; i++) {
                //     for (var j = 0; j < (hw.width * 96) /25; j++) {
                //         // console.log(i + ' ' +  j );
                //         ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
                //         Math.floor(255 - 42.5 * j) + ', 0)';
                //         ctx.fillRect(j * 25, i * 25, 25, 25);
                //     }
                // }
                // // console.log(canvas1);
                // // console.log(canvas);
                // var canvas = elem[0]
                // console.log(canvas);
                // // canvas.remove()

                // canvas1.appendTo(canvas)
                // var destCtx = canvas.getContext('2d');

//call its drawImage() function passing it the source canvas directly
                // destCtx.drawImage(canvas1[0], 0, 0);


            }



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
                    // console.log(vals[0]);
                    if(vals[0]==='height') {
                        r.height = stripIn(vals[1])
                    }
                    if(vals[0]===' width' || vals[0] ==='width') {
                        r.width=stripIn(vals[1])
                    }
                    function stripIn(toStrip){
                        // console.log(toStrip);
                        var stripped = toStrip.split('in')[0]
                        // console.log(stripped);
                        return stripped
                    }
                })


                return r
            }


        }
    };
};
