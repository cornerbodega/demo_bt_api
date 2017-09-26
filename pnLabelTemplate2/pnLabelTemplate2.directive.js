angular.module("countryApp")
.directive('pnLabelTemplate2', pnLabelTemplate2)

function pnLabelTemplate2(pnModel, $rootScope) {
    return {
        templateUrl: "pnLabelTemplate2/pnLabelTemplate2.template.html",
        restrict: 'E',
        // scope: { //contentious
        //     labelTemplate: '=?',
        //     pageTemplate: '=?',
        //     item: '=?'
        // },
        link: function($scope, elem, attrs) {
            // console.log($scope.model);
    //         $scope.model = {}
            $scope.hideLabelsObj = {}
            // function getDifference(e1, e2) {
            //     console.log('e1: ' + e1.offsetHeight);
            //     console.log('e2: ' + e2.offsetHeight);
            //     var d =  (e1.offsetHeight - e2.offsetHeight) / 2;
            //     return d;
            // }


// WOW WTF IS HAPPENING HERE>?!
            // console.log(angular.element('#pnLabelContent').prop('offsetHeight'));
            // $scope.model.pnLabelContentHeight= angular.element('#pnLabelContent').prop('offsetHeight')

            // setTimeout(function () {
            //     setLabelContentHeightAndPageHeight()
            //     $scope.$digest();
            // },500)
            $scope.$watch('model.page_template', function () {
                // console.log('model.page_template ');
                setLabelContentHeightAndPageHeight();
                // console.log($scope.model.page_template);
            })
            function setLabelContentHeightAndPageHeight() {
                // console.log('setLabelContentHeightAndPageHeight');
                // console.log($scope.model);
                // console.log(angular.element('#pnLabelContent').prop('offsetHeight'));
                // console.log(angular.element('#pnLabelContent').prop('offsetHeight'));
                $scope.model.pnLabelContentHeight = angular.element('#pnLabelContent').prop('offsetHeight')
                $scope.model.pnLabelPageHeight = getHeightAndWidthFromString($scope.model.page_template.labelSize).height * 96
                // console.log('$scope.model.pnLabelPageHeight '    + $scope.model.pnLabelPageHeight);
                // console.log('$scope.model.pnLabelContentHeight ' + $scope.model.pnLabelContentHeight);
                // $scope.model.pnLabelPageHeight = angular.element('#pnLabelPage').prop('offsetHeight') ;

            }
            //  $scope.model.pnLabelPageHeight = angular.element('#pnLabelPage').prop('offsetHeight');
            // $scope.model.pnLabelContentHeight= document.getElementById('pnLabelContent').offsetHeight
            // $scope.model.pnLabelPageHeight = document.getElementById('pnLabelPage').offsetHeight
            // $scope.topPadding = $scope.model.pnLabelPageHeight - $scope.model.pnLabelContentHeight

            $scope.getTopPadding = function() {
                setLabelContentHeightAndPageHeight()
                // if(!$scope.pnLabelContentHeight) {var s = document.getElementById('pnLabelContent').offsetHeight;
                // } else {
                //     var s = $scope.pnLabelContentHeight
                // }

                // var diff = getDifference(b, s)
                // $scope.pnLabelContentHeight = s
                // $scope.pnLabelPageHeight = b
                // var b2 = getHeightAndWidthFromString($scope.model.page_template.labelSize).height * 96
                // console.log(b);
                // console.log(b2);
                // console.log(document.getElementById('pnLabelContent'));
                // // console.log();
                // console.log('CHANGING ' + s);
                //
                $scope.model.topPadding = ($scope.model.pnLabelPageHeight - $scope.model.pnLabelContentHeight) /2
                // console.log(diff);
                return $scope.model.topPadding
            }
            $scope.getFormattingStyle = function (c) {
                var s = ""
                // console.log(c);
                if(c.align) {
                    s += "text-align:" + c.align + ";"
                }
                if(c.align) {
                    s += "text-align:" + c.align + ";"
                }
                if(c.textSize) {
                    s += "font-size:"+c.textSize+"px;"
                }
                if(c.font) {
                    s+= "font-family:"+c.font+";"
                }
                if(c.fontStyle) {
                    if(c.fontStyle.bold) {
                        s+= "font-weight: bold;"
                    }
                    if(c.fontStyle.italics) {
                        s+= "font-style: italic;"
                    }
                    if(c.fontStyle.underline) {
                        s+= "text-decoration: underline;"
                    }
                }
                // console.log(s);
                return s
            }
    //         $scope.$on('updateAlign', function (e, v) {
    //             console.log(v);
    //         })
    //         $scope.$on('updateTextSize', function (e, v) {
    //             console.log(v);
    //         })
    //         $scope.$on('updateFont', function (e, v) {
    //             console.log(v);
    //         })
    //
            $scope.$on('imageUploaded', function (event, image) {

                // console.log('IMAGE UPLOADED in 2017!!! ' + image);
                $scope.$digest()

            })
    //
    //
    //         $scope.$on('toggleShowLabel', toggleShowLabel)
    //         function toggleShowLabel (event, id) {
    //             if (!$scope.hideLabelsObj) $scope.hideLabelsObj = {}
    //             $scope.hideLabelsObj[id] = !$scope.hideLabelsObj[id];
    //             $scope.labelTemplate.hideLabelsObj = $scope.hideLabelsObj
    //         }
    //
    //         $scope.showLabel = function (id) {
    //             if (!$scope.hideLabelsObj) return true
    //             if (!id) return false
    //             return !$scope.hideLabelsObj[id]
    //         }
    //
    //         if(!$scope.labelTemplate && pnModel.label_template) initLabelTemplate()
    //
    //         $scope.$on('selected_label_template', initLabelTemplate)
    //         function initLabelTemplate() {
    //             // console.log('INIT PAGE TEMPLATE!!!!!!');
    //             $scope.labelTemplate = pnModel.label_template
    //             $scope.hideLabelsObj = $scope.labelTemplate.hideLabelsObj
    //             $scope.showLabel($scope.labelTemplate.key)
    //             // console.log(pnModel);
    //             // $rootScope.$broadcast('print_ready')
    //             // console.log('print_ready');
    //         }
    //
            // $scope.$on('selected_my_label', function () {
            //     if($scope.model.my_label) {
            //      try {
            //          $scope.labelTemplate = JSON.parse($scope.model.my_label.label_template)
            //          $scope.page_template = JSON.parse($scope.model.my_label.page_template)
            //      } catch (e) {
            //          console.log(e);
            //      }
            //  }
            //
            // })
    //         // $scope.$on('selected_my_label', init)
    //         if(pnModel.my_label) initSelectedMyLabel()
    //
    //         function initSelectedMyLabel() {
    //             $scope.pnLabelContentHeight = document.getElementById('pnLabelContent').offsetHeight;
    //
    //             console.log('initSelectedMyLabel');
    //             if(pnModel.my_label) {
    //                 try {
    //                     $scope.labelTemplate = JSON.parse(pnModel.my_label.label_template)
    //                     $scope.page_template = JSON.parse(pnModel.my_label.page_template)
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //             }
    //             init()
    //             console.log($scope.labelTemplate);
    //             console.log($scope.page_template);
    //         }
    //
    //         if(pnModel.inventory || pnModel.plants) init()
    //
    //         $scope.$on('selected_inventory', init)
    //         $scope.$on('selected_plants', init)
    //         $scope.$on('selected_inventory', initSelectedMyLabel)
    //         function initPlants() {
    //             console.log('PLANTS SELECTED');
    //         }
    //         function init() {
    //             console.log('INIT LABEL TEMPLATE!!');
    //             console.log(pnModel);
    //
    //             if(pnModel.my_label) {
    //                 if(pnModel.my_label.id === 'label_add'){
    //                 }
    //                 else {
    //                     pnModel.label_category = {id: pnModel.my_label.category}
    //                     pnModel.page_template = JSON.parse(pnModel.my_label.page_template)
    //                     pnModel.labe_template = JSON.parse(pnModel.my_label.label_template)
    //                 }
    //             }
    //             if(pnModel.label_category) {
    //                 console.log(pnModel);
    //                 console.log(pnModel[pnModel.label_category.id]);
    //                 if(!pnModel[pnModel.label_category.id][0]) return console.log('No pnModel data for ' + pnModel.label_category  + pnModel[pnModel.label_category.id]);
    //                 $scope[pnModel.label_category.id] = pnModel[pnModel.label_category.id][0]
    //                 $scope.model.inventory = pnModel[pnModel.label_category.id][0]
    //             } else {
    //                 $scope.inventory = pnModel.inventory[0]
    //             }
    //
    //             $scope.page_template = pnModel.page_template
    //             $scope.label_template = pnModel.label_template
    //             console.log($scope.page_template);
    //             console.log($scope.label_template);
    //             // $rootScope.$broadcast('page_template_init')
    //         }
            $scope.getStyle = function(style) {
                return style
            }
    //         if (!pnModel.inventory) $scope.inventory = $scope.model.inventory
    //
        }
    }
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