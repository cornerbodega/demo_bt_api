angular
.module('countryApp')
.factory('FieldDataService', FieldDataService)
// .factory('pnTableValueFormatter', pnTableValueFormatter)



function FieldDataService($location, $rootScope, $filter) {
    var f = {};

    f.pnReportDateSelector = function (params) {
        return {
            key: params.key,
            type: 'pnReportDateSelector',
            templateOptions: {
                label: params.label,
                // needed: params.needed
            },
            controller: function ($scope) {
                var r = ['All']
                var years = []
                console.log($scope.model[params.needed]);
                var p = _.uniq(_.pluck($scope.model[params.needed], 'period'))
                console.log(p);
                _.map(p, function (per) {
                    console.log(per);
                    var a = per.split(' ')
                    years.push(a[1])
                })
                years = _.uniq(years)
                r = r.concat(years)
                r = r.concat(p)
                $scope.reportPeriods = r
                // $scope.updateReportPeriod = function () {
                //     // console.log($scope.chartData);
                //     // $rootScope.$broadcast('updateReportPeriod', $scope.model.reportPeriod)
                //     // console.log('UDPDATE THOSE REPORT DTES~!' + $scope.model.reportPeriod);
                // }
            },
            hideExpression: params.hideExpression

        }
    }
    f.pnReport = function (params) {
        return {
            key: params.key,
            type: params.chartType,
            templateOptions: {
                label: params.label
            },
            controller: function ($scope, pnChartData, pnDataBank, pnMyData) {
                console.log(pnMyData[params.needed]);
                pnMyData[params.needed]().init()
                $scope.$on(params.needed, onAsyncData);
                $scope.model.reportPeriod = false
                $scope.$watch('model.reportPeriod', function () {
                    if($scope.model.report_category.id) $rootScope.$broadcast($scope.model.report_category.id)
                    // if $scope.model.
                    // if($scope.model.report_category.id === 'outbound_transfers') {
                    // $scope.
                    // console.log($scope.chartData);
                    // $rootScope.$broadcast('outbound_transfers')
                    // }
                })
                function pnReportPeriodFilter(params) {
                    var f = []

                    console.log(f);
                    return f
                }
                function onAsyncData(event) {
                    console.log(event);
                    $scope.model[event.name] = pnDataBank.data[event.name]
                    console.log($scope.model);
                    console.log($scope.model.reportPeriod);
                    // $scope.chartData = pnChartData.format({key: params.key, data: $scope.model[event.name], period: $scope.model.reportPeriod})
                    $scope.chartData = pnChartData.formatter(
                        {
                            key: params.key,
                            data: $scope.model[event.name],
                            period: $scope.model.reportPeriod,
                            valueProp: params.valueProp,
                            keyProp: params.keyProp,
                            frontUnits: params.frontUnits,
                            backUnits: params.backUnits
                        }
                    )
                    // if($scope.model.reportPeriod) $scope.to.label += ' '+ $scope.model.reportPeriod
                    console.log($scope.chartData);
                    $scope.reportSum = 0

                    _.map($scope.chartData.data, function (v) {
                        $scope.reportSum += +v
                    })
                }
            },
            hideExpression: params.hideExpression
        }
    }
    // f.pnBarChart = function (params) {
    //     return {
    //         key: params.key,
    //         type: 'pnBarChart',
    //         controller: function ($scope) {
    //             $scope.params = params
    //         },
    //         hideExpression: params.hideExpression
    //     }
    // }
    f.pnModelFromPreviousPage = function (params) {
        return {
            key:'pnModelFromPreviousPage',
            type: 'pnBlank',
            controller: function ($scope, $location, $rootScope) {
                var p = $location.search()

                $scope.$on('pnDataReady', function() {
                    if(params.key==="labels") {
                        console.log(p.selected)
                        if (!p.selected) return console.log('No Selected Data from Previous Page');;
                        var ids = JSON.parse(p.selected)
                        console.log(p);
                        console.log(ids);
                        _.map(ids,function (id) {
                            console.log($scope.rows);
                            console.log($scope.to.options);
                            var f = _.findWhere($scope.to.options, {id: id})
                            if (f) f.$selected = true
                            console.log(f);
                        });
                        // $scope.select(p)

                    };
                })
            },
        };
    };
    f.pnSpacer = function () {
        return {
            key: 'pnSpacer',
            type: 'pnSpacer'
        }
    }
    // Too hard. I need to parse the css back to numbers and then put them in the model. Sheesh. Good thing there's live preview!
    f.pnModify = function (params) {
        return {
            key: 'modify',
            type: 'pnBlank',
            hideExpression: params.hideExpression,
            controller: function ($scope, PageTemplates) {
                // $scope.model[params.key] =
                $scope.$on('selected_page_template', init)
                init()
                function init() {
                    if(params.key==="page_template") {
                        _.map($scope.model.page_template, function (value, key) {
                            // console.log(key);
                            if(key === "pageSize") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.pageHeight = +hw.height
                                $scope.model.pageWidth = +hw.width
                            }
                            if(key === "labelSize") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.labelHeight = +hw.height
                                $scope.model.labelWidth = +hw.width
                            }
                            if(key === "topMargin") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.topMargin = +hw.height
                            }
                            if(key === "bottomMargin") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.bottomMargin = +hw.height
                            }
                            if(key === "leftMargin") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                console.log('LEFT MARGIN!!' + +hw.width);
                                $scope.model.leftMargin = +hw.width
                                console.log($scope.model);
                            }
                            if(key === "rightMargin") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.rightMargin = +hw.width
                            }
                            if(key === "hSpacing") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.hSpacing = +hw.width
                            }
                            if(key === "vSpacing") {
                                var hw = PageTemplates.getHeightAndWidthFromString(value)
                                $scope.model.vSpacing = +hw.height
                            }
                            if(key === "rows") {
                                $scope.model.labelRows = +value
                            }
                            if(key === "cols") {
                                $scope.model.labelColumns = +value
                            }
                            if(key === "labelName") {
                                $scope.model.labelName = value
                            }
                            if(key === "continuous") {
                                var isTrueSet = (value == '1');
                                $scope.model.continuous = isTrueSet
                            }
                            if(key === "id") {
                                $scope.model.id = value
                            }
                            if(key === "isDefaultTemplate") {
                                $scope.model.isDefaultTemplate = +value
                            }
                            console.log(key + ': '  + value);
                            // ['topMargin','bottomMargin',]
                            // function isNumeric(n) {
                            //     return !isNaN(parseFloat(n)) && isFinite(n);
                            // }
                            // if (isNumeric(value)) $scope.model[key] = +value
                            // else  $scope.model[key] = value

                            console.log($scope.model);
                        })
                        console.log('pnModify!');
                        // console.log($scope.);
                    }
                }


                // function getHeightAndWidthFromString(string) {
                //
                //     // "height:1.125in;width:3.75in;"
                //     var h = 0
                //     var w = 0
                //     var r = {
                //         height: h,
                //         width: w
                //     }
                //     var sides = string.split(";")
                //     sides.map(function (side) {
                //         //["height:1.25in", "width:3.75in"]
                //
                //         var vals = side.split(":")
                //         // ["height", 1.25in]
                //         console.log(vals[0]);
                //         if(vals[0]==='height') {
                //             r.height = stripIn(vals[1])
                //         }
                //         if(vals[0]===' width' || vals[0] ==='width') {
                //             r.width=stripIn(vals[1])
                //         }
                //         function stripIn(toStrip){
                //             console.log(toStrip);
                //             var stripped = toStrip.split('in')[0]
                //             console.log(stripped);
                //             return stripped
                //         }
                //     })
                //
                //
                //     return r
                // }

            }
        }
    }
    f.pnPrintLabels = function (params) {
        return {
            key: 'pnPrintLabels',
            type: 'pnPrintLabels',
            controller: function ($scope) {

            },
            hideExpression: params.hideExpression
        }
    }
    f.pnPagePreviewButton = function (params) {
        return {
            key: 'page_preview_button',
            type: 'page_preview_button',
            controller: function ($scope, FormRequestFormatter) {
                $scope.init = function () {
                    if(params.create) {
                        $scope.model.action  = 'page_templates_add'
                        $scope.model.page_template = FormRequestFormatter($scope.model)

                    }

                    console.log($scope.model);
                    console.log($scope.model.page_template);
                }
            },
            hideExpression: params.hideExpression
        }
    }
    f.pnPagePreview2 = function (params) {

        return {
            key: 'page_preview',
            type: 'page_preview2',
            hideExpression: params.hideExpression,
            // templateOptions: {label: 'Page Preview'},
            controller: function ($scope, pnModel) {
                if ($scope.model.my_label) {
                    var category = $scope.model.my_label.category
                    $scope.model.page_template = JSON.parse($scope.model.my_label.page_template)
                    $scope.model.label_template = JSON.parse($scope.model.my_label.label_template)

                }
                else if($scope.model.label_category) var category = $scope.model.label_category.id
                // if ($scope.model.label_category) var category = $scope.model.label_category.id
                $scope.$on('selected_label_category', function () {
                    console.log('Label Category Selected ' + $scope.model.label_category.id);
                    if ($scope.model.label_category.id === 'plants') {
                        $scope.model.inventory = false
                        // $scope.model.items = $scope.model.plants
                        // $scope.model.item = $scope.model.plants[0]
                    }
                    if ($scope.model.label_category.id === 'inventory') {
                        $scope.model.plants = false
                        // $scope.mdoel.items = $scope.model.inventory
                        // $scope.model.item = $scope.model.inventory[0]
                    }
                })
                $scope.$watch('model.inventory', function () {
                    if (!$scope.model.inventory) return console.log('No model.inventory ' );
                    $scope.model.item = $scope.model.inventory[0]
                    $scope.model.items = $scope.model.inventory
                })
                $scope.$watch('model.plants', function () {
                    if (!$scope.model.plants) return console.log('No model.plants ' );

                    $scope.model.item = $scope.model.plants[0]
                    $scope.model.items = $scope.model.plants
                })
                // $scope.$on('selected_plants', function () {
                //     console.log('on selected_plants');
                //     console.log($scope.model.label_category.id + ' selected!');
                //     console.log($scope. model);
                //     $scope.model.plants = $scope.model.plants[0]
                //     $scope.model.plants = $scope.model.plants
                //
                // })
                // $scope.$on('selected_inventory', function () {
                //     console.log('on selected_inventory');
                //     console.log($scope.model.label_category.id + ' selected!');
                //     console.log($scope.model);
                //     $scope.model.item = $scope.model.inventory[0]
                //     $scope.model.items = $scope.model.inventory
                //
                // })
                //
                // $scope.$watch('model.'+$scope.model.label_category.id, inventory_or_plants_to_item_and_items)
                //
                // function inventory_or_plants_to_item_and_items() {
                //     console.log($scope.model[$scope.model.label_category.id]);
                //     if (!$scope.model[$scope.model.label_category.id]) return console.log('No $scope.model[$scope.model.label_category.id] exiting...');
                //     $scope.model.item = $scope.model[$scope.model.label_category.id][0]
                //     $scope.model.items = $scope.model[$scope.model.label_category.id]
                //     console.log($scope.model.items);
                //
                //     console.log($scope.model);
                //
                // }


                // $scope.hideLabels = params.hideLabels
                // if(params.myLabel) {
                //     // console.log(pnModel.);
                //     // pnModel.templ
                //     $scope.model.page_template = JSON.parse($scope.model.my_label.page_template)
                //     $scope.model.label_template = JSON.parse($scope.model.my_label.label_template)
                //     console.log($scope.model.label_template);
                //     if($scope.model.my_label)  pnModel.label_template = JSON.parse($scope.model.my_label.label_template)
                //
                //     console.log('Page PReview PnModel ' + pnModel.label_template);
                //     //  = $scope.model.label_template
                //     // $rootScope.$broadcast
                //
                // }
                // // $scope.$on('selected_inventory', init)
                // // function init() {
                // //
                // // }
                // $scope.getStyle = function (style) {
                //     // console.log(style);
                //     return style
                // }
                // $scope.getArray = function (l) {
                //     var a = []
                //     for (var i=1; i <= l; i++) {
                //         a.push(i)
                //     }
                //     return a
                // }

                // console.log($scope.model.page_template);
                // console.log($scope.model.inventory);

            }
        }
    }
    // f.pnPagePreview = function (params) {
    //
    //     return {
    //         key: 'page_preview',
    //         type: 'page_preview',
    //         hideExpression: params.hideExpression,
    //         templateOptions: {label: 'Page Preview'},
    //         controller: function ($scope, pnModel) {
    //             $scope.hideLabels = params.hideLabels
    //             if(params.myLabel) {
    //                 // console.log(pnModel.);
    //                 // pnModel.templ
    //                 $scope.model.page_template = JSON.parse($scope.model.my_label.page_template)
    //                 $scope.model.label_template = JSON.parse($scope.model.my_label.label_template)
    //                 console.log($scope.model.label_template);
    //                 if($scope.model.my_label)  pnModel.label_template = JSON.parse($scope.model.my_label.label_template)
    //
    //                 console.log('Page PReview PnModel ' + pnModel.label_template);
    //                 //  = $scope.model.label_template
    //                 // $rootScope.$broadcast
    //
    //             }
    //             // $scope.$on('selected_inventory', init)
    //             // function init() {
    //             //
    //             // }
    //             $scope.getStyle = function (style) {
    //                 // console.log(style);
    //                 return style
    //             }
    //             $scope.getArray = function (l) {
    //                 var a = []
    //                 for (var i=1; i <= l; i++) {
    //                     a.push(i)
    //                 }
    //                 return a
    //             }
    //
    //             // console.log($scope.model.page_template);
    //             // console.log($scope.model.inventory);
    //
    //         }
    //     }
    // }
    f.pnDragDrop = function (params) {
        return {
            key: params.key,
            type: 'pnDragDrop',
            hideExpression: params.hideExpression,
            controller: function ($scope, MyLabels, $rootScope) {
                // $scope.list = []
                // $scope.models = {
                //     selected: null,
                //     lists: {"A": [], "B": []}
                // };
                //
                // // Generate initial model
                // for (var i = 1; i <= 3; ++i) {
                //     $scope.models.lists.A.push({label: "Item A" + i});
                //     $scope.models.lists.B.push({label: "Item B" + i});
                // }
                //
                // // Model to JSON for demo purpose
                // $scope.$watch('models', function(model) {
                //     $scope.modelAsJson = angular.toJson(model, true);
                // }, true);
                //
                // $scope.$on('imageUploaded', function () {
                //     console.log('Show Image Size');
                //     $scope.showImageSize = true
                // })

                $scope.updateBoldUnderLineItalics = function (command) {
                    if (!$scope.models.selected.fontStyle) $scope.models.selected.fontStyle = {}
                    $scope.models.selected.fontStyle[command] = !$scope.models.selected.fontStyle[command]
                    console.log($scope.models.selected.fontStyle);
                    $rootScope.$broadcast('updateFontStyle')

                }

                $scope.updateAlign = function (direction) {
                    $scope.models.selected.align = direction
                    $rootScope.$broadcast('updateAlign', direction)
                }
                $scope.textSizes = []
                for (var i = 6; i < 73; i++) {
                    $scope.textSizes.push(i)
                }
                $scope.units = [
                    'g',
                    '',
                ]
                $scope.updateTextSize = function () {
                    // console.log('Update Font')
                    $rootScope.$broadcast('updateTextSize', $scope.models.selected.textSize)
                }
                $scope.fonts = [
                    {label: 'Default', id: "Arial, sans-serif"},
                    {label: 'Andale Mono', id: "Andale Mono, monospace"},
                    {label: 'Apple Chancery', id: "Apple Chancery, cursive"},
                    {label: 'Arial Narrow', id: "Arial Narrow, sans-serif"},
                    {label: 'Arial', id: "Arial, sans-serif"},
                    {label: 'Avantgarde', id: "Avantgarde, sans-serif"},
                    {label: 'Blippo', id: "Blippo, fantasy"},
                    {label: 'Bookman', id: "Bookman, serif"},
                    {label: 'Brush Script Std, Brush Script MT', id: "Brush Script Std, Brush Script MT, cursive"},
                    {label: 'Caflisch Script Pro', id: "Caflisch Script Pro, cursive"},
                    {label: 'Chalkduster', id: "Chalkduster, fantasy"},
                    {label: 'Comic Sans', id: "Comic Sans MS, Comic Sans, cursive"},
                    {label: 'Courier New', id: "Courier New, monospace"},
                    {label: 'Courier', id: "Courier, monospace"},
                    {label: 'cursive', id: "cursive"},
                    {label: 'fantasy', id: "fantasy"},
                    {label: 'Georgia', id: "Georgia, serif"},
                    {label: 'Gill Sans', id: "Gill Sans, sans-serif"},
                    {label: 'Helvetica', id: "Helvetica, sans-serif"},
                    {label: 'Impact', id: "Impact, fantasy"},
                    {label: 'Jazz LET', id: "Jazz LET, fantasy"},
                    {label: 'monospace', id: "monospace"},
                    {label: 'New Century Schoolbook', id: "New Century Schoolbook, serif"},
                    {label: 'OCR A Std', id: "OCR A Std, monospace"},
                    {label: 'Palatino', id: "Palatino, serif"},
                    {label: 'sans-serif', id: "sans-serif"},
                    {label: 'Snell Roundhand', id: "Snell Roundhand, cursive"},
                    {label: 'Stencil Std', id: "Stencil Std, fantasy"},
                    {label: 'Times New Roman', id: "Times New Roman, serif"},
                    {label: 'Trebuchet MS', id: "Trebuchet MS, sans-serif"},
                    {label: 'Verdana', id: "Verdana, sans-serif"},
                ]
                $scope.updateFont = function () {
                    console.log('Update Font')
                    $rootScope.$broadcast('updateFont', $scope.models.selected.font )
                }
                $scope.showLabelFieldActions = function (param) {
                    var selected = $scope.models.selected
                    console.log(param);
                    // console.log(selected.type);
                    // return true
                    return selected.type === param
                    // if (param === 'image') {
                    //     // if(select)
                    //     return selected.type === param
                    // }
                    // if (param === 'pnCustomText') {
                    //     return selected.type === param
                    //
                    // }
                    // if (param === 'title') {
                    //     // console.log(selected.type);
                    //     // var noTitles = ['barcodeImage', 'image', 'pnCustomText']
                    //     // if (_.contains(noTitles, selected.type)) return false
                    //     // else return true
                    // }
                    // if (param === 'barcodeImage') {
                    //     return selected.type === param
                    // }
                    // if (param === 'me') {
                    //     return selected.type === param
                    // }
                    // if (param === 'me') {
                    //     return selected.type === param
                    // }
                    //
                    // console.log('ERROR 414! UNSUPPORTED models.seleceted.type ' + param);
                    // return false
                }
                $scope.updateBarcodeHeight = function () {
                    console.log('UPdate Barcode Height');
                    var size = $scope.models.selected.barcodeHeight
                    $rootScope.$broadcast('barcodeHeight', size)
                }
                $scope.updateImageSize = function () {
                    var size = {height: $scope.models.selected.imageHeight, width: $scope.models.selected.imageWidth}
                    $rootScope.$broadcast('updateImageSize', size)
                }
                $scope.getStyle = function (style) {
                    // console.log(style);
                    return style
                }


                $scope.defaultLayoutSelected = function () {
                    console.log($scope.selectedDefaultLayout);
                    $scope.selectedDefaultLayoutTemplate = angular.copy(_.findWhere($scope.defaultLayouts, {id:$scope.selectedDefaultLayout}).template)
                    console.log($scope.selectedDefaultLayoutTemplate);
                    $scope.models.dropzones = $scope.selectedDefaultLayoutTemplate

                }
                $scope.defaultLayouts = MyLabels.getDefaultLayouts($scope.model.label_category.id)
                $scope.$watch('model.label_category.id', initLabelFields)
                initLabelFields()
                function initLabelFields() {
                    console.log($scope.model.label_category.id);
                    if (!$scope.selectedDefaultLayout) {
                        if($scope.model.label_category.id === 'plants') {
                            $scope.selectedDefaultLayout = 'basic_plant_label'
                        }
                        if($scope.model.label_category.id === 'inventory') {
                            $scope.selectedDefaultLayout = 'inventory_label_has_qa'
                        }
                    }
                    var label_fields = MyLabels.getLabelFields($scope.model.label_category.id)
                    console.log(label_fields);
                    $scope.models = {
                        selected: null,
                        templates:label_fields,
                        // templates: [
                        //     {label: "item", id: 2},
                        //     {label: "container", id: 1, columns: [[], []]}
                        // ],
                        // Drop Zones needs to be loaded via MyLabels.data.service
                        dropzones: null
                    }
                    $scope.defaultLayoutSelected()

                }

                $scope.myNameLocation  = sessionStorage.myName + ' ('+sessionStorage.myLocation +")"
                // $scope.models = {
                //     selected: null,
                //     templates:label_fields,
                //     // templates: [
                //     //     {label: "item", id: 2},
                //     //     {label: "container", id: 1, columns: [[], []]}
                //     // ],
                //     // Drop Zones needs to be loaded via MyLabels.data.service
                //     dropzones:{
                //         "A": [
                //             {
                //                 "label": "container",
                //                 "type": "container",
                //                 "id": 1,
                //                 "columns": [
                //                     [
                //                         {
                //                             "id": 3,
                //                             "label": "Strain",
                //                             "key": "strain",
                //                             "type": "item",
                //                             "hide": true
                //                         }
                //                     ],
                //                     [
                //                         {
                //                             "id": 4,
                //                             "label": "Type",
                //                             "key": "inventorytypelabel",
                //                             "type": "item",
                //                             "hide": true
                //                         }
                //                     ]
                //                 ]
                //             },
                //             {
                //                 "label": "Barcode Image",
                //                 "type": "barcodeImage",
                //                 "id": 2
                //             },
                //             {
                //                 "id": 2,
                //                 "label": "ID",
                //                 "key": "id",
                //                 "type": "item",
                //                 "hide": true
                //             }
                //         ]
                //     }
                // }

                if(params.modifyLabel) {
                    console.log($scope.model);
                    $scope.models.dropzones = JSON.parse($scope.model.my_label.label_template)
                }
                $scope.toggleShowLabel = function (id) {
                    console.log(id);
                    $rootScope.$broadcast('toggleShowLabel', id)
                }
                // $scope.models.templates = M
                console.log($scope.models.label_fields);
                $scope.$on('myLabels', init)

                if(!MyLabels.data) {MyLabels.init()} else {init()}
                function init() {
                    console.log(MyLabels.data);


                    if ($scope.model.inventory) $scope.inventory = $scope.model.inventory[0]
                    $scope.model.label_template = $scope.models.dropzones
                    updateTemplateModel()
                }

                $scope.$watch('models.dropzones', function(model) {
                    $scope.modelAsJson = angular.toJson(model, true);
                    $scope.model.label_template = $scope.models.dropzones
                    updateTemplateModel()
                }, true);
                $scope.$watch('model.inventory', function(inventory){
                    if (!$scope.model.inventory) return
                    $scope.inventory = $scope.model.inventory[0]
                    $rootScope.$broadcast('label_item',  $scope.inventory)
                    updateTemplateModel()
                } )
                $scope.$watch('model.plants', function(inventory){
                    if (!$scope.model.plants) return
                    $scope.plants = $scope.model.plants[0]
                    $scope.inventory = $scope.model.plants[0]
                    $rootScope.$broadcast('label_item',  $scope.plants)
                    updateTemplateModel()
                } )
                function updateTemplateModel() {
                    if($scope.model.label_template) pnModel.label_template = $scope.model.label_template

                    console.log('label_template');
                    console.log($scope.model.label_template);


                    $rootScope.$broadcast('selected_label_template')
                }
            }
        }
    }
    f.pnPrintLabel = function (params) {
        return {
            key: params.key,
            type: 'pnPrintLabel',
            controller: function ($scope) {
                console.log('Hello? ');
            }
        }
    }
    f.pnInputField = function(params) {
        var type = 'text'
        if (!!params.type) type = params.type
        return {
            key: params.key,
            type: 'pnInputField',
            templateOptions: {
                label: params.label,
                // placeholder:
                type: type,
                desc: params.desc,
                optional: params.optional
            },
            controller: function($scope) {
                if(params.modifyLabel) {
                    $scope.model[params.key] = $scope.model.my_label.name
                }
            },
            hideExpression: params.hideExpression
        }
    }
    f.show_qa_labs = {
        key: 'qa_lab',
        type: 'show_qa_labs',
    }
    f.pnPasswordsDoNotMatch = function () {
        return {
            key: 'pnPasswordsDoNotMatch',
            type: 'pnPasswordsDoNotMatch',
            controller: function($scope) {

            },
            hideExpression: 'model.new_password === model.new_password2'
        }
    }
    f.plant_harvest_other_plant_material_amount = {
        key: 'plant_harvest_other_plant_material_amount',
        type: 'myquantity',
        templateOptions: {
            label: 'Enter the dry weight of any Other Plant Material in grams.',
        },
    }
    f.plant_harvest_waste_amount = {
        key: 'plant_harvest_waste_amount',
        type: 'myquantity',
        templateOptions: {
            label: 'Enter the dry weight of the waste in grams.',
        },
    }
    f.plant_harvest_flower_amount = {
        key: 'plant_harvest_flower_amount',
        type: 'myquantity',
        templateOptions: {
            label: 'Enter the dry weight of the harvested and cured flower in grams.',
        },
    }
    f.collectadditional = {
        key: 'final',
        type: 'mycheckbox',
        templateOptions: {
            label: 'Indicate whether this is the final time this plant will be harvested.',
            optional: true,

        },
    }
    f.pnCheckbox = function(params){
        return {
            key: params.key,
            type: 'mycheckbox',
            templateOptions: {
                label: params.label,
            },
            hideExpression: params.hideExpression
        }
    }
    f.pnCheckboxList = function(params){
        return {
            key: params.key,
            type: 'mycheckboxlist',
            templateOptions: {
                label: params.label,
            },
            controller: function ($scope) {
                $scope.pnRepeat = params.pnRepeat
            },
            hideExpression: params.hideExpression
        }
    }
    f.select_inventory_room = {
        key: 'room',
        type: 'pn-select',
        templateOptions: {
            valueProp: 'roomid',
            labelProp: 'name',
            label: 'Room',
            options: []
        },
        controller: function ($scope, Inventory) {
            if(Inventory.inventory_rooms) init();
            else Inventory.init();

            function init() {
                $scope.to.options = Inventory.inventory_rooms;
                $scope.pnData = true;
            };

            $scope.$on('inventory', function(){
                init();
            });

            $scope.select = function(room) {
                $scope.selected = room;
                $scope.model.room = [room];
            };
        },
    }
    f.inventory_room_name = {
        key: 'name',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter a name for the new room.',
        },
        controller: function ($scope, Inventory) {
            if(Inventory.inventory_rooms) init();
            else Inventory.init();

            $scope.$on('inventory', init);

            function init() {
                $scope.inventory_rooms = Inventory.inventory_rooms;
                var maxid = 0;
                $scope.inventory_rooms.map(function(room) {
                    if (room.roomid > maxid) maxid = parseInt(room.roomid)
                });
                $scope.model.id = maxid + 1;


            };

        }
    };
    f.plant_room_name = {
        key: 'name',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter a name for the new plant room.',
        },
        controller: function ($scope, Plants) {
            if(Plants.plant_rooms) init()
            else Plants.init()
            $scope.$on('plants', init)
            function init() {
                var plant_rooms = Plants.plant_rooms
                console.log(Plants);
                console.log(plant_rooms);
                var maxid = 0
                _.map(plant_rooms, function(room) {
                    if (room.roomid > maxid) maxid = parseInt(room.roomid)
                })
                $scope.model.id = maxid + 1
                console.log($scope.model.id);
            }

        }
    };
    f.plant_is_mother = {
        key: 'mother',
        type: 'mycheckbox',
        templateOptions: {
            label: 'Indicate whether this will be a mother plant. ',
            optional: true,

        }
    }
    f.select_plant_source = {
        key: 'source',
        type: 'pn-select-inventory-item',
        templateOptions: {
            valueProp: 'id',
            label: 'Source',
            options: [],
        },
        controller: function ($scope, pnData) {


            var source_types = [7, 10, 11, 12];

            if(pnData.data.inventory) setSources();

            $scope.$on('pnData', setSources);

            function setSources() {;
                console.log('pnData1!!');
                $scope.pnData = true;
                _.map(pnData.data.inventory, function(item){
                    if (source_types.indexOf(item.inventorytype) > -1){
                        $scope.to.options.push(item);
                    }
                });
            };

            $scope.select = function($event, item) {
                $scope.selected = item;
                $scope.model.source = item.id;
            };
        }
    }
    f.select_plant_room = {
        key: 'room',
        type: 'pn-select',
        templateOptions: {
            valueProp: 'roomid',
            labelProp: 'name',
            label: 'Plant Room',
            options: []
        },
        controller: function ($scope, Plants) {
            if (Plants.plant_rooms) init()
            else Plants.init()
            $scope.$on('plants', init)

            function init() {
                console.log(Plants.plant_rooms);
                $scope.to.options = Plants.plant_rooms
                $scope.pnData = true
            }

            $scope.select = function(room){
                $scope.selected = room;
                $scope.model.room = [room];
            }
        },
    }
    f.select_inbound_manifest_to_accept = {
        key: 'inbound_manifest',
        type: 'pn-select',
        templateOptions: {
            labelProp: 'label',
            label: 'Select Inbound Manifest.',
            options: [],
        },
        controller: function ($scope, $rootScope, pnPost, pnMyData) {

            pnPost({action:'inventory_manifest_lookup',
            sessionid: sessionStorage.sessionid,
            location: $scope.model.vendors[0].location
        })
        .then(function(res){
            console.log(res);
            $scope.pnData = true;

            if (res.data.error) {
                $scope.to.options.push({id:0, label: res.data.error})
                $scope.noData = true
                return
            }

            var r = _.map(res.data.data, function(manifest){
                console.log(manifest);
                // console.log(manifest.data);
                // var manifest = JSON.parse(manifest.data)
                manifest.label = manifest.transfer_date + ' [' +manifest.manifest_id+'] ' + manifest.trade_name + ' ('+manifest.item_count+')'
                manifest.id = manifest.manifest_id
                return manifest
            })
            $scope.to.options = r
            if($scope.to.options.length === 0) $scope.noData = true;
            console.log($scope.noData);
        })
        $scope.select = function($event, manifest) {
            if ($scope.noData) return
            $scope.selected = manifest
            $scope.model.inbound_manifest = manifest;
            $rootScope.$broadcast('manifestSelected')
            // $rootScope.$broadcast('manifestSelected')
        }
    },
    hideExpression: '!model.vendors',

}
f.select_items_to_accept = {
    key: 'itemsInfo',
    type: 'pn_accept_inbound_inventory_transfer',
    templateOptions: {
        labelProp: 'label',
        label: 'Select items to accept.',
        placeholder: 'Select items to accept.',
        items: [],
    },
    hideExpression: '!model.inbound_manifest',
    controller: function ($scope, pnPost) {

        pnPost({
            action:'inventory_transfer_lookup',
            manifest_id:$scope.model.inbound_manifest.manifest_id,
            location: $scope.model.vendors[0].location
        })
        .then(function(res){
            $scope.items = res.data.data
            console.log($scope.items);
        });



        $scope.acceptInfo = function(item) {
            if(!$scope.model.itemsInfo) $scope.model.itemsInfo = []
            $scope.model.itemsInfo.push(item)
        }
    },
};

f.selectPlants = function(opt){
    return {
        key: 'plants',
        type: 'pn-select-plants',
        templateOptions: {
            label: 'Plants',
            labelProp: 'plantlabel',
            options: []
        },
        controller: function ($scope, $http, pnData) {

            if(pnData.data.plants)  {
                init();
            };
            function init(){
                $scope.pnData = true;
                setPlants();
            }
            deselectAll()
            function deselectAll() {
                $scope.to.options.map(function(i){
                    return i.$selected = false
                })
                $scope.model.plants = []
            }
            function setPlants() {
                console.log('setPlants');
                $scope.to.options = pnData.data.plants;
                if (opt === 'harvest'){
                    $scope.singleSelect = true;
                    return $scope.to.options = _.filter($scope.to.options, {harvestscheduled: 1});
                };
                if (opt === 'scheduleHarvest')
                if (opt === 'destroy') {
                    console.log('destruction');
                    return $scope.to.options = _.filter($scope.to.options, {removescheduled : 1});
                };
                if(opt === 'cure') {
                    $scope.singleSelect = true;
                    return $scope.to.options = _.filter($scope.to.options, {plantStatus : 'Growing'});
                };
            }
            $scope.$on('pnData', function(){
                init();
            });
            $scope.pnMultipleSelectPlants = function(item){
                console.log(item);
                if($scope.singleSelect) deselectAll();
                item.$selected = !item.$selected
                $scope.model.plants = [];
                $scope.to.options.map(function(i){
                    if (i.$selected) $scope.model.plants.push(i);
                })
                console.log($scope.model.plants);
            }
        }
    }
};
f.modify_employee_name = {
    key: 'employee_name',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter the Hire Date of the Driver.',
    },
    hideExpression: '!model.employee',
    controller: function ($scope) {
        $scope.model.employee_name = $scope.model.employee.employee_name
    }
};
f.modify_hire_date = {
    key: 'hire_date',
    type: 'mydatetime',
    templateOptions: {
        label: 'Enter the Hire Date of the Driver.',
    },
    hideExpression: '!model.employee',
    controller: function ($scope) {
        $scope.model.hire_date = $scope.model.employee.hire_date
    }
};
f.modify_birth_date = {
    key: 'birth_date',
    type: 'mydatetime',
    templateOptions: {
        label: 'Enter the Birth Date of the Driver.',
    },
    hideExpression: '!model.employee',
    controller: function ($scope) {
        $scope.model.birth_date = $scope.model.employee.birth_date
    }
};

f.employee_name = {
    key: 'employee_name',
    type: 'pn-input',
    templateOptions: {
        label: 'Name',
    },
};
f.hire_date = {
    key: 'hire_date',
    type: 'mydate',
    templateOptions: {
        label: 'Enter the Hire Date of the new Driver.',
    },
};
f.birth_date = {
    key: 'birth_date',
    type: 'mydate',
    templateOptions: {
        label: 'Enter the Birth Date of the new Driver.',
    },
};
// f.employee_details = {
//     key: 'employee_details',
//     type: 'employee_details',
//     hideExpression: '!model.employee',
// };
// f.select_employee = {
//     key: 'employee',
//     type: 'pn-select',
//     templateOptions: {
//         label: 'Employees',
//         labelProp: 'employee_name',
//         options: []
//     },
//     controller: function ($scope, Employees) {
//         if(Employees.data) init()
//         else Employees.init()
//
//         $scope.$on('employees', init)
//         function init(){
//             console.log('employees');
//             $scope.to.options = Employees.data
//             $scope.pnData = true;
//         }
//         $scope.select = function(e) {
//             $scope.selected = e
//             $scope.model.employee = e
//             console.log($scope.model);
//             console.log(e);
//         }
//     }
// }
// f.modify_nickname = {
//     key: 'nickname',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Nickname',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.nickname = $scope.model.vehicle.nickname
//     }
// }
// f.modify_color = {
//     key: 'color',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Color',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.color = $scope.model.vehicle.color
//     }
// }
// f.modify_make = {
//     key: 'make',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Make',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.make = $scope.model.vehicle.make
//     }
// }
// f.modify_model = {
//     key: 'model',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Model',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.model = $scope.model.vehicle.model
//     }
// }
// f.modify_plate = {
//     key: 'plate',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Plate',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.plate = $scope.model.vehicle.plate
//     }
// }
// f.modify_vin = {
//     key: 'vin',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Vin',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.vin = $scope.model.vehicle.vin
//     }
// }
// f.modify_year = {
//     key: 'year',
//     type: 'pn-input',
//     hideExpression: '!model.vehicle',
//     templateOptions: {
//         label: 'Year',
//     },
//     controller: function ($scope, pnData) {
//         $scope.model.year = $scope.model.vehicle.year
//     }
// }
f.nickname = {
    key: 'nickname',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter a nickname for the vehicle.',
    }
}
f.vehicle_color_and_get_ids = {
    key: 'color',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter the color of the vehicle.',
    },
    controller: function($scope, Vehicles) {
        if(Vehicles.data) init()
        else Vehicles.init()
        $scope.$on('vehicles', init)

        function init() {
            console.log(Vehicles.data);
            var vehicle_ids = _.pluck(Vehicles.data, 'vehicle_id')
            console.log(vehicle_ids);
            max = Math.max.apply(null, vehicle_ids);
            console.log(max + 1);
            $scope.model.vehicle_id = max + 1
        }
    }
}
f.make = {
    key: 'make',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter the make of the vehicle.',
    }
}
f.pnUom = {
    key: 'uom',
    type: 'pn-select',
    templateOptions: {
        label: 'Select the quantity units.',
        options: [
            {id:'mg', label: 'milligrams'},
            {id:'g', label: 'grams'},
            {id:'kg', label: 'kilograms'},
            {id:'oz', label: 'ounces'},
            {id:'lb', label: 'pounds'},
        ]
    },

    controller: function($scope) {
        $scope.select = function(unit) {
            $scope.selected = unit
            $scope.model.uom = unit.id
        }
    }
}
f.model = {
    key: 'model',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter a the model of the vehicle.',
    }
}
f.plate = {
    key: 'plate',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter the license plate of the vehicle.',
    }
}
f.vin = {
    key: 'vin',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter the Vehicle Identification Number (VIN) of the vehicle.',
    }
}
f.year = {
    key: 'year',
    type: 'pn-input',
    templateOptions: {
        label: 'Enter the year the vehicle was produced.',
    }
}
// f.vehicle_details = {
//     key: 'vehicle_details',
//     type: 'myvehicledetails',
//     // templateOptions: {
//     //     label: 'Vehicle Label',
//     // },
//     hideExpression: '!model.vehicle'
// }
// f.select_vehicle = {
//     key: 'vehicle',
//     type: 'pn-select',
//     templateOptions: {
//         label: 'Vehicle',
//         options: []
//     },
//     controller: function ($scope, Vehicles) {
//         console.log(Vehicles);
//         if(Vehicles.data) init();
//         else Vehicles.init();
//
//         $scope.$on('vehicles', init)
//         function init(){
//             $scope.to.options = Vehicles.data
//             $scope.pnData = true;
//         }
//
//         $scope.select = function(e) {
//             $scope.selected = e
//             $scope.model.vehicle = e
//         }
//     }
// }
f.derivative_usable = {
    key: 'derivative_usable',
    type: 'myquantity',
    templateOptions: {
        label: 'Enter the quantity per unit.',
    },
    hideExpression: '!!model.derivative_type.weighable'
}
f.multiple_remove_quantity = {
    key: 'remove_quantity',
    type: 'my_multiple_quantity',
    templateOptions: {
        label: 'Enter the quantity to remove from source(s).',
    },
    hideExpression: '!model.inventory.length > 0',
    controller: function($scope) {
        $scope.deselect = function(item) {
            console.log('Deselect!' + item);
            item.$selected = false;
            $scope.model.inventory = _.without($scope.model.inventory, item);
        }
    }
};
f.adjust_quantity_multiple = {
    key: 'quantity',
    type: 'my_multiple_quantity',
    templateOptions: {
        label: 'Enter new quantity for item',
    },
    hideExpression: '!model.inventory.length > 0',
    controller: function($scope) {
        $scope.deselect = function(item) {
            console.log('Deselect!' + item);
            item.$selected = false;
            $scope.model.inventory = _.without($scope.model.inventory, item);
        }
    }
};

f.create_post_prices = {
    key: 'price',
    type: 'create_post_prices',
    templateOptions: {
    },
    hideExpression: '!model.inventory.length > 0',
    controller: function($scope) {
        $scope.deselect = function(item) {
            console.log('Deselect!' + item);
            item.$selected = false;
            $scope.model.inventory = _.without($scope.model.inventory, item);
        }
        $scope.uom = [
            {id:'g', label: 'grams'},
            {id:'kg', label: 'kilograms'},
            {id:'oz', label: 'ounces'},
            {id:'lb', label: 'pounds'} ];

            $scope.setSelectedUom = function(item, u) {
                return item.uom = u;
            }
            $scope.model.price = 1
        }
    };

    f.selected_recipient_for_generate_manifest_for_request = {
        key: 'recipient',
        type: 'selected_recipient_for_generate_manifest_for_request',
        templateOptions: {

        },

        controller: function($scope, $location, pnGenerateManifestForRequestService) {
            // if(pnGenerateManifestForRequestService.selected_request)
            console.log(pnGenerateManifestForRequestService.selected_request);
            // if (!pnGenerateManifestForRequestService.selected_request) return $location.path('/traceability/market/manifest_request_inbox')
            // console.log(typeof pnGenerateManifestForRequestService.selected_request);
            $scope.request = pnGenerateManifestForRequestService.selected_request
            console.log(pnGenerateManifestForRequestService.selected_request);
            $scope.model.recipient = $scope.request.requester_location

        }
    };

    f.selected_inventory_for_generate_manifest_for_request = {
        key: 'inventoryitem',
        type: 'selected_inventory_for_generate_manifest_for_request',
        templateOptions: {

        },

        controller: function($scope, $location, pnGenerateManifestForRequestService, pnDB) {
            if (!pnGenerateManifestForRequestService.selected_listing) return $location.path('/traceability/market/manifest_request_inbox')
            pnDB.getFromDB('select * from wts_listings where item_id = "'+pnGenerateManifestForRequestService.selected_request.item_id+'" ')
            .then(function(res){
                console.log(res);
                pnGenerateManifestForRequestService.selected_listing = res.data[0]
                $scope.listing = pnGenerateManifestForRequestService.selected_listing
                $scope.model.inventoryitem = $scope.listing.item_id
                console.log(pnGenerateManifestForRequestService.selected_listing);

            })

        }
    };


    f.manifest_approximate_route = {
        key: 'approximate_route',
        type: 'pn-input',
        templateOptions: {
            label: 'Approximate Route',
        }
    }
    f.select_manifest_to_transfer = {
        key: 'manifest_to_transfer',
        type: 'pn-select',
        templateOptions: {
            valueProp: 'manifestid',
            labelProp: 'label',
            ngOptions: 'option as option in to.options | filter: $select.search',
            label: 'Manifest',
            options: [],
        },
        controller: function ($scope, pnData) {
            if(pnData.data.manifests) init()

            function init() {
                $scope.pnData = true
                // if (!pnData.data.)
                $scope.to.options = []
                pnData.data.manifests.map(function(manifest){
                    if (!manifest) return
                    if (!manifest.transferred) {
                        manifest.id = manifest.manifestid
                        $scope.to.options.push(manifest)
                    }
                });
            }
            $scope.$on('pnData', function(){
                console.log(pnData.data.manifests);
                init();

            });
            $scope.select = function($event, manifest) {
                $scope.selected = manifest
                $scope.model.manifest_to_transfer = manifest
            }
        },

    }
    f.manifest_prices = {
        key: 'manifest_prices',
        type: 'manifest_prices',
        templateOptions: {
            valueProp: 'manifestid',
            labelProp: 'label',
            ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
            label: 'Enter prices for items being transferred.',
            options: []
        },
        hideExpression: '!model.manifests',
        controller: function ($scope) {
            console.log($scope.model.manifest_to_transfer);
            $scope.model.manifest_to_transfer = $scope.model.manifests[0]
            console.log('Price those manifests!!');

            $scope.computePrices = computePrices
            function computePrices(params) {
                if (!$scope.model.manifest_prices) $scope.model.manifest_prices = {}
                console.log(params);
                // $scope.manifest
                if(params.key === 'perQ') {
                    $scope.model.manifest_prices[params.id] = params.quantity * $scope.model.manifest_per_quantity_prices[params.id]
                }
                if(params.key === 'total') {
                    $scope.model.manifest_per_quantity_prices[params.id] = (1/params.quantity) * $scope.model.manifest_prices[params.id]
                }
            }
            $scope.model.manifest_per_quantity_prices = {}

        }
    };


    // f.explanation = function(task){
    //     return {
    //         key: 'explanation',
    //         type: 'explanation',
    //         templateOptions: {
    //             label: 'Description',
    //         },
    //         controller: function ($scope, pnLcbFunctionExplainer) {
    //             if (pnLcbFunctionExplainer[task]) $scope.explanation = pnLcbFunctionExplainer[task]
    //
    //         }
    //     }
    // }
    f.plant_strain = {
        key: 'strain',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter the strain of the new plant.',
        }
    }

    f.inventory_convert_waste = {
        key: 'waste',
        type: 'myquantity',
        templateOptions: {
            label: 'Enter the amount of waste material produced during conversion.',
        }
    }
    f.derivative_product = {
        key: 'derivative_product',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter a name for the new product.',
        }
    }
    f.derivative_strain = {
        key: 'derivative_strain',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter the strain of the new product.',
        }
    }
    f.derivative_quantity = {
        key: 'derivative_quantity',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter the quantity of the new product.',
        }
    }
    f.derivative_type = {
        key: 'derivative_type',
        type: 'pn-select',
        templateOptions: {
            valueProp: 'id',
            labelProp: 'label',
            ngOptions: 'option as option in to.options | filter: $select.search',
            label: 'Select the type of new product being produced.',

            options: [],
        },
        controller: function ($scope, Inventory) {
            var r = []
            _.map(Inventory.getTypeMap(), function (t, id) {
                r.push({id: id, label: t.label, weighable: t.weighable})
            })
            $scope.to.options = r

            // $scope.to.options = [
            //     {label:'Kief', weighable:true, id: 5},
            //     {label: 'Bubble Hash', weighable: true, id: 15},
            //     {label: 'Hash', weighable: true, id: 16},
            //     {label: 'Hydrocarbon Wax', weighable: true, id: 17},
            //     {label: 'CO2 Hash Oil', weighable: true, id: 18},
            //     {label: 'Food Grade Solvent Extract', weighable: true, id: 19},
            //     {label: 'Infused Dairy Butter or Fat in Solid Form', weighable: true, id: 20},
            //     {label: 'Infused Cooking Oil', weighable: true, id: 21},
            //     {label: 'Solid Marijuana Infused Edible', weighable: false, id: 22},
            //     {label: 'Liquid Marijuana Infused Edible', weighable: false, id: 23},
            //     {label: 'Marijuana Extract for Inhalation', weighable: false, id: 24},
            //     {label: 'Marijuana Infused Topicals', weighable: false, id: 25},
            //     {label: 'Usable Marijuana', weighable: false, id: 28},
            //     {label: 'Wet Flower', weighable: true, id: 29},
            //     {label: 'Marijuana Mix', weighable: true, id: 30},
            //     {label: 'Marijuana Mix Packaged', weighable: false, id: 31},
            //     {label: 'Marijuana Mix Infused', weighable: false, id: 32}
            // ]
            $scope.select = function(option){
                $scope.selected = option
                $scope.model.derivative_type = option
            }

        }

    }
    f.inventory_convert_remove_quantity = {
        key: 'remove_quantity',
        type: 'pn-input',
        templateOptions: {
            label: 'Quantity to Remove from for Conversion',
        },
        controller: function ($scope) {

        }
    }

    f.lot_type = {
        key: 'lot_type',
        type: 'pn-select',
        templateOptions: {
            label: 'Select the Lot Type of the new inventory being created.',
            options: [
                {id: 13, label: 'Flower Lot'},
                {id: 14, label: 'Other Plant Material'},
                {id: 30, label: 'Marijuana Mix'},

            ],
            valueProp: 'id',
            labelProp: 'title',
        },
        controller: function ($scope) {
            $scope.select = function(option){
                console.log(option);
                $scope.selected = option

                $scope.model.lot_type = option.id
            }

        }
    };

    f.reason_type_for_schedule_for_destruction = {
        key: 'reason_extended',
        type: 'pn-select',
        templateOptions: {
            label: 'Select the reason for destruction.',
            options: [
                {id: 1, label: 'Waste'},
                {id: 2, label: 'Unhealthy or Dead'},
                {id: 3, label: 'Infestation'},
                {id: 4, label: 'Product Return'},
                {id: 5, label: 'Mistake'},
                {id: 6, label: 'Spoilage'},
                {id: 7, label: 'Quality Control'},
            ],
            valueProp: 'id',
            labelProp: 'title',
        },
        controller: function ($scope) {
            $scope.select = function(option){
                console.log(option);
                $scope.selected = option

                $scope.model.reason_extended = option.id
            }
            $scope.pnData = true
        }
    };

    f.pnRadioGroup = function(params){
        return {
            key: params.key,
            type: 'pnRadioGroup',
            templateOptions: {
                label: params.label,
                valueProp: 'id',
                labelProp: 'label',
            },
            controller: function ($scope, pnStaticData) {

                $scope.to.options = pnStaticData[params.staticData]()
                $scope.select = function(option){
                    console.log(option);
                    $scope.selected = option

                    $scope.model.reason_extended = option.id
                }

            }
        }
    };
    f.reason_desc_for_schedule_for_destruction = {
        key: 'reason',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter a reason for destruction.',
        }
    };

    function getinventorystatuslabel (inventorystatus) {
        var statusmap = {
            1: "Scheduled for Destruction",
            2: "Scheduled for Transport",
            3: "In Transport",
        }
        return statusmap[inventorystatus];
    }

    f.pnSelectList = function(params) {
        var _pnSelectList = {
            key: params.key,
            type: 'pn-select',
            templateOptions: {
                label: params.label,
                labelProp: '',
                desc: params.desc,
                options: [],
            },
            controller: function ($scope, pnMyData, pnModel, $routeParams, $rootScope) {
                // console.log("W?EWE?W");
                $scope.select = select

                var myData = pnMyData[params.key]()
                console.log(params.key);
                console.log(myData);
                // $scope.select =
                // var myData = pnMyData[params.key]()

                if(myData.data) init()
                else myData.init();
                $scope.$on(params.key, init);
                function init(){
                    console.log('INIT SELECT LIST');
                    $scope.to.options = myData.data
                    console.log($scope.to.options);
                    $rootScope.$broadcast('pnDataReady')
                    if(params.newInventoryType) {
                        $scope.to.options = _.filter($scope.to.options, function(o){
                            console.log(o);
                            return _.contains(["7", "10", "11"], o.id)
                        })
                    }


                    if(params.modifyLabel && params.key==='label_category') {
                        console.log();
                        $scope.select({id: $scope.model.my_label.category})
                    }
                    $scope.pnData = true
                    $rootScope.$broadcast('pnData')
                    // initLoadFromLocalStorage()
                    // initLoadFromRouteParams()

                }
                // // initLoadFromRouteParams()
                //
                // function initLoadFromRouteParams() {
                //     console.log($routeParams);
                //     if($routeParams[params.key]) {
                //         if (isJSON($routeParams[params.key])) {
                //             console.log('IS JSON!!!');
                //             $scope.model[params.key] = JSON.parse($routeParams[params.key])
                //         } else {
                //             console.log('IS NOT JSON');
                //             $scope.model[params.key] = $routeParams[params.key]
                //         }
                //     }
                //     console.log($scope.model);
                //     function isJSON(text) {
                //         console.log(text);
                //         if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                //         replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                //         replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                //             console.log('true');
                //             return true
                //
                //         }else{
                //             console.log('false');
                //             return false
                //
                //         }
                //     }
                // }
                // function initLoadFromLocalStorage() {
                //     console.log('Not initing from local storage. Feature disabled. ');
                //     // var ids = _.pluck($scope.model[params.key], 'id')
                //     // console.log(ids);
                //     // _.map(ids,function (id) {
                //     //     console.log($scope.rows);
                //     //     var f = _.findWhere($scope.rows, {id: id})
                //     //     if (f) f.$selected = true
                //     //     console.log(f);
                //     // })
                // }
                function select (item){
                    $scope.selected = item
                    $scope.model[$scope.options.key] = item;
                    console.log($scope.model[$scope.options.key]);
                    if(item.pnAction) {
                        console.log('pnAction!');
                        item.pnOnSelectAction();
                    }
                    pnModel[$scope.options.key] = $scope.model[$scope.options.key]
                    $rootScope.$broadcast('selected_'+$scope.options.key)
                    console.log('selected_'+$scope.options.key);
                    console.log(pnModel);

                }
            }
        }
        if (params.hideExpression) _pnSelectList.hideExpression = params.hideExpression;
        return _pnSelectList;
    }

    f.pnAutocomplete = function(params) {
        var _pnAutocomplete = {
            key: params.key,
            type: 'pnAutocomplete',
            templateOptions: {
                label: params.label,
                labelProp: '',
                options: [],
                optional: params.optional
            },
            controller: function ($scope, pnMyData) {
                // console.log("W?EWE?W");

                var myData = pnMyData[params.key]()
                // $scope.select =
                // var myData = pnMyData[params.key]()

                if(myData.data) init()
                else myData.init();

                $scope.$on(params.key, init);

                function init(){
                    $scope.to.options = myData.data
                    // console.log($scope.to.options);
                    _.map($scope.to.options, function(o){
                        o.name = o.label;
                    })
                    if(params.myLocation) {
                        $scope.to.options = _.filter($scope.to.options, {ubi: sessionStorage.ubi})
                    }
                    // $scope.$ap
                    // $scope.pnData = true

                    initLoadFromLocalStorage()

                }

                function initLoadFromLocalStorage() {
                    //     console.log(params.key);
                    //     console.log($scope.model[params.key]);
                    //     if(!$scope.model[params.key]) return
                    //     console.log($scope.model[params.key].label);
                    //     $scope.searchText = $scope.model[params.key][0].label
                    // var ids = _.pluck($scope.model[params.key], 'id')
                    // console.log(ids);
                    // _.map(ids,function (id) {
                    //     console.log($scope.rows);
                    //     var f = _.findWhere($scope.rows, {id: id})
                    //     if (f) f.$selected = true
                    //     console.log(f);
                    // })
                }

                $scope.querySearch = function(query) {
                    console.log(query);
                    console.log(_.map($scope.to.options.filter(createFilterFor(query)),function(r){return r}))
                    return _.map($scope.to.options.filter(createFilterFor(query)),function(r){return r})
                }
                function createFilterFor(query) {
                    var lowercaseQuery = angular.uppercase(query);
                    return function filterFn(v) {
                        v.name = angular.uppercase(v.name);
                        // console.log(v.name.indexOf(lowercaseQuery) );
                        // console.log(lowercaseQuery);
                        return (v.name.indexOf(lowercaseQuery) !== -1);
                    };
                }
                $scope.selectedItemChange = function(item) {
                    $scope.model[params.key] = [item]

                };
                $scope.searchText = ""

            }
        }

        if (params.hideExpression) _pnAutocomplete.hideExpression = params.hideExpression;
        return _pnAutocomplete;
    }
    f.pnSelectTable = function(params) {
        if (!params) return console.log('ERORR! NO PARAMS FOR pnSelectTable. Failing. ');
        return {
            key: params.key,
            type: 'pn-select-table',
            templateOptions: {
                label: params.label,
                desc: params.desc,
                labelProp: '',
                options: [],
                hideSelected: params.hideSelected
            },
            hideExpression: params.hideExpression,
            controller: function ($scope, pnMyData, pnCols, pnModel, pnShowCols, MyLabels, pnLocalStorage, pnActionButtonsData, $mdDialog, pnDB, pnItemNotes, $rootScope, pnBrowseClick) {
                var myData = [];
                initMyData();
                initCols();
                initMyLabels();
                initItemNotes();

                $scope.$on('item_notes', initItemNotes)
                function initItemNotes() {
                    pnItemNotes.notesByConcerningId = {}
                    $scope.notes = []
                    pnDB.getFromDB('select * from item_notes where ubi="'+sessionStorage.ubi+'" and deleted <> "1"').then(function (res) {
                        console.log(res);

                        $scope.notes = res.data

                        _.map($scope.notes, function (note) {
                            console.log(note);
                            if(!pnItemNotes.notesByConcerningId[note.concerning_id]) pnItemNotes.notesByConcerningId[note.concerning_id] = []
                            pnItemNotes.notesByConcerningId[note.concerning_id].push(note)
                            // console.log(pnItemNotes);
                        })
                        $scope.notesByConcerningId = pnItemNotes.notesByConcerningId
                        $rootScope.$broadcast('initNotes')
                        console.log(pnItemNotes);

                    })
                }
                function initMyLabels() {
                    console.log(MyLabels);
                    if(MyLabels.data) initMyLabels2()
                    else MyLabels.init()
                    $scope.$on('my_label', initMyLabels2)
                };
                function initMyLabels2() {
                    $scope.myLabels = MyLabels.data
                    $scope.selectedLabel = {}
                }

                function initCols() {

                    $scope.cols = pnCols(params.key)

                    $scope.showCols = {}
                    _.map($scope.cols, function(col){

                        $scope.showCols[col.id] = col
                        if(col.detail) toggleShowCol(col.id)

                    })
                    pnShowCols.setShowCalls($scope.showCols)

                };
                $scope.toggleShowCol = toggleShowCol

                function toggleShowCol(id) {
                    console.log(id);
                    console.log($scope.showCols);
                    console.log($scope.showCols[id]);
                    $scope.showCols[id].hide = !$scope.showCols[id].hide
                    pnShowCols.setShowCalls($scope.showCols)
                }

                function initMyData() {
                    myData = pnMyData[params.key]();
                    if (!myData) return console.log('ERROR! pnMyData undefined for ' + params.key);
                    if (myData.data) init();
                    else myData.init();
                    $scope.$on(params.key, init);
                };
                // if ($scope. && params.browse) showAll()

                function init(){

                    $scope.rows = myData.data;
                    // if ($scope.rows && params.browse) showAll()

                    if (params.hideExport) {
                        $scope.hideExport = true
                    }
                    if (params.hideChangeColumns) {
                        $scope.hideChangeColumns = true
                    }
                    if(params.waste) {
                        $scope.rows = _.filter($scope.rows, { inventorystatus: 1 });
                    };
                    if(params.newPlant) {
                        var newtypes = ['Clone', 'Seed', 'Mature Plant', 'Plant Tissue'];
                        $scope.rows = _.filter($scope.rows, function(item) {
                            return _.contains(newtypes, item.inventorytypelabel);
                        });
                    }
                    if(params.passedQA) {
                        $scope.rows = _.filter($scope.rows, function(item){
                            if(!item.qa.potency) return
                            if (item.qa.potency.Total) return true
                        });
                    }
                    if (params.harvest){
                        $scope.rows = _.filter($scope.rows, {harvestscheduled: 1});
                    };
                    if (params.destroy) {
                        $scope.rows = _.filter($scope.rows, {removescheduled : 1});
                    };
                    if(params.cure) {
                        $scope.rows = _.filter($scope.rows, {plantStatus : 'Growing'});
                    };
                    if(params.flowerOrOpm) {
                        $scope.rows = _.filter($scope.rows, function(item){
                            var flowerOrOpmTypes = [6, 9];
                            if (_.contains(flowerOrOpmTypes, item.inventorytype)) return item;
                        });
                    };
                    if(params.unfulfilled){
                        $scope.rows = _.filter($scope.rows, {fulfilled : 0});
                    };

                    if(params.newInventorySource) {
                        $scope.rows = _.filter($scope.rows, function(o){
                            return _.contains([7,10,11], o.inventorytype)
                        })
                    };

                    if(params.qa_untested) {
                        $scope.rows = _.filter($scope.rows, function(o){
                            return o.result == 0
                        })
                        $scope.rows = _.filter($scope.rows, function(o){
                            return o.deleted != 1
                        })
                    }
                    if(params.filterManifest) {
                        filterManifest()
                        $scope.$on('selected_manifests', initMyData)
                        function filterManifest() {
                            $scope.rows = _.filter($scope.rows, function(o){
                                if (!o.manifestid) return false
                                console.log($scope.model.manifests[0]);
                                return $scope.model.manifests[0].manifestid == o.manifestid
                            })
                        }

                    }
                    if(params.key==='page_template') {
                        if(params.modifyLabel) {
                            $scope.select(JSON.parse($scope.model.my_label.page_template))
                        }

                        _.map($scope.to.options, function (o) {
                            o.label = o.labelName
                        })
                        if (params.remove) {
                            console.log('REMOVE!!!!');
                            if(sessionStorage.ubi != '603347225') {
                            $scope.rows = _.filter($scope.rows, function (o) {
                                console.log(o);
                                console.log(o.isDefaultTemplate);
                                if (o.isDefaultTemplate === "0") return o
                                else return
                            })
                            console.log($scope.rows);
                        }}
                    }
                    if (!$scope.rows || $scope.rows.length === 0) {
                        $scope.noData = true
                        return
                    }



                };
                $scope.actionButtons = pnActionButtonsData.data
                console.log($scope.actionButtons);
                $scope.classForSelectTableDiv = function() {
                    return "container";
                };
                $scope.classForRow = function(row) {
                    if(!row.$selected) return ''
                    if(row.$selected) return 'green darken-3 white-text'
                };
                $scope.search = {};
                $scope.sortHand = function(col) {
                    if (col.id === $scope.predicate) {
                        if ($scope.reverse) return 'fa fa-hand-o-down'
                        else return 'fa fa-hand-o-up'
                    } else return ''
                };
                $scope.getdatestringfor = getdatestringfor
                $scope.setSort = function(col) {
                    console.log(col);
                    $scope.predicate = col.id;
                    $scope.reverse = !$scope.reverse;
                };
                $scope.labelItems = {}

                $scope.selectLabel =function (my_label) {
                    $scope.selectedLabel = my_label
                    $scope.model.page_template  = JSON.parse(my_label.page_template)
                    pnModel.my_label = my_label
                    console.log(my_label);
                    console.log(pnModel);
                    $rootScope.$broadcast('selected_my_label')
                }

                $scope.select= function($event, item){
                    if(params.browse){
                        return pnBrowseClick($event, item)
                    }
                    if(!params.multiple) deselectAll();
                    item.$selected = !item.$selected
                    $scope.model[$scope.options.key] = [];
                    $scope.rows.map(function(i){
                        if (i.$selected) $scope.model[$scope.options.key].push(i)
                    })
                    console.log($scope.model[$scope.options.key]);
                    pnModel[$scope.options.key] = $scope.model[$scope.options.key]
                    if(params.singular) {
                        $scope.model[$scope.options.key] = $scope.model[$scope.options.key][0]
                    }
                    $rootScope.$broadcast('selected_'+$scope.options.key)


                };


                if($scope.rows) deselectAll();
                function deselectAll() {
                    if(!$scope.rows) return
                    _.map($scope.rows, function(i){
                        return i.$selected = false
                    })
                    if($scope.model[$scope.options.key]) $scope.model[$scope.options.key] = []
                };


                // For show all rows feature
                function showAll(){
                    $scope.itemsPerPage = $scope.rows.length
                }
                $scope.showAll = showAll
                //
                $scope.collapse = collapse
                collapse()
                function collapse() {
                    $scope.itemsPerPage = 50;
                }

                // $scope.getMaxHeight = function () {
                //
                //     // .table-scroll tbody {
                //     //     max-height: 350px;
                //     //     overflow-y: auto;
                //     //     display: block;
                //     //     width: 100%;
                //     //     table-layout: fixed;
                //     // }
                //     // "max-height: 350px; overflow-y: auto; display: block; width: 100%; table-layout: fixed;"
                //
                //     return "max-height: 350px; overflow-y: auto; display: block; width: 100%; table-layout: fixed;"
                // }

                // $scope.showNoResults= function() {
                //     var filtered = $filter('filter')($scope.rows, $scope.search)
                //     if (filtered.length === 0) return $scope.noData = true
                //     else return false
                // }
                // For exporting feature
                $scope.pnExport = function() {

                    var arrObj = []
                    var filtered = $filter('filter')($scope.rows, $scope.search)
                    console.log(filtered.length);

                    _.map(filtered, function(row) {
                        var o = {}

                        _.map($scope.cols, function(col) {
                            if(row[col.id]) {
                                console.log(row[col.id]);
                                row[col.id] = '' + row[col.id]
                                row[col.id] = row[col.id].replace(/,/g, '')
                                o[col.label] = row[col.id];
                            }
                        })
                        arrObj.push(o);

                    })
                    console.log(arrObj);

                    console.log('downloadCSV');
                    downloadCSV()
                    function downloadCSV() {
                        var data, filename, link;
                        var csv = convertArrayOfObjectsToCSV({
                            data: arrObj
                        });
                        if (csv == null) return;

                        filename =  params.label +'_' + Date.now() + '.csv';

                        if (!csv.match(/^data:text\/csv/i)) {
                            csv = 'data:text/csv;charset=utf-8,' + csv;
                        }
                        data = encodeURI(csv);

                        link = document.createElement('a');
                        link.setAttribute('href', data);
                        link.setAttribute('download', filename);
                        link.click();
                    }

                    function convertArrayOfObjectsToCSV(args) {
                        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

                        data = args.data || null;
                        if (data == null || !data.length) {
                            return null;
                        }

                        columnDelimiter = args.columnDelimiter || ',';
                        lineDelimiter = args.lineDelimiter || '\n';

                        keys = Object.keys(data[0]);

                        result = '';
                        result += keys.join(columnDelimiter);
                        result += lineDelimiter;

                        data.forEach(function(item) {
                            ctr = 0;
                            keys.forEach(function(key) {
                                if (ctr > 0) result += columnDelimiter;

                                result += item[key];
                                ctr++;
                            });
                            result += lineDelimiter;
                        });

                        return result;
                    }
                }
            },
        };
    };
    f.pnActionGridTable = function(params) {

        return {
            key: params.key,
            type: 'pnActionGridTable',
            templateOptions: {

                // label: params.label,
            },
            controller: function ($scope, pnCols, TraceabilityMenuService) {

                console.log(params.key);
                $scope.paths = TraceabilityMenuService.getActionsForViewDatagory(params.key)
                // $scope.paths = TraceabilityMenuService.paths()['/traceability/'+params.key]


                // $scope.showActionButtons = params.showActionButtons
                // console.log($scope.showActionButtons);
                // DON'T ADD ANY CODE HERE. THIS HOLDS A ISOLATED SCOPE DIRECTIVE!
            },

            hideExpression: "!model[" + "\'" + params.key+ "\']",

        }
    }


    f.pnCuratedDetailsTable = function(params) {

        return {
            key: params.key,
            type: 'pnCuratedDetailsTable',
            templateOptions: {

                // label: params.label,
            },
            controller: function ($scope, pnCols) {
                $scope.showActionButtons = params.showActionButtons
                console.log($scope.showActionButtons);
                // DON'T ADD ANY CODE HERE. THIS HOLDS A ISOLATED SCOPE DIRECTIVE!
            },

            hideExpression: "!model[" + "\'" + params.key+ "\']",

        }
    }

    // f.pnDetailsTable = function(params) {
    //
    //     return {
    //         key: params.key,
    //         type: 'pnDetailsTable',
    //         templateOptions: {
    //             // label: params.label,
    //         },
    //         controller: function ($scope) {
    //
    //             // console.log($scope.model);
    //             // console.log($scope.model[$scope.options.key]);
    //             // $scope[params.key] = $scop
    //             // $scope.getdatestringfor = getdatestringfor
    //             // $scope.gettimestring = gettimestring
    //
    //         },
    //         // cxxcç≈≈≈≈≈≈≈≈ΩΩΩΩΩΩΩΩΩΩΩßßßß
    //         // hideExpression: '!model['+params.key+']',
    //         hideExpression: "!model[" + "\'" + params.key+ "\']",
    //
    //     }
    // }
    f.pnDateTimePicker = function(params){
        return {
            key: params.key,
            type: 'mydatetime',
            templateOptions: {
                label: params.label,
            },
            hideExpression: params.hideExpression,
            controller: function($scope, $rootScope) {
                $scope.dateTimeChanged = function() {
                    console.log('dateTimeChanged');
                    $rootScope.$broadcast('hoursChanged')
                }
            }
        }
    };
    f.pnHoursWorked = function() {
        return {
            key: 'hours_worked',
            type: 'pnHoursWorked',
            hideExpression: '!model.time_out',
            controller: function($scope) {

                init();

                $scope.$on('hoursChanged', init)

                function init() {

                    $scope.model.hours_worked  = Math.round(Math.abs($scope.model.time_out - $scope.model.time_in) / 36e5 * 100) / 100
                }


            }
        }
    }
    f.pnManifestDetailsTable = function() {

        return {
            key: 'manifests',
            type: 'pnManifestDetailsTable',
            templateOptions: {
                label: 'Manifest Details',
            },
            controller: function ($scope, $window) {
                console.log($scope.model);
                console.log($scope.model[$scope.options.key]);
                // $scope[params.key] = $scop
                $scope.getdatestringfor = getdatestringfor
                $scope.gettimestring = gettimestring


            },
            // cxxcç≈≈≈≈≈≈≈≈ΩΩΩΩΩΩΩΩΩΩΩßßßß
            hideExpression: '!model.manifests',

        }
    }
    f.manifest_stops = function(params) {
        return {
            key: 'stops',
            type: params.type,
            templateOptions: {
                // placeholder: 'Recipient',
                label: params.label,
                // labelProp: 'label',
                // valueProp: 'license',
                options: []
            },
            controller: function ($scope) {
                console.log($scope.model);
            },
            hideExpression: params.hideExpression

        }
    }


    f.select_vendor = function(params){
        var type = ""
        if(params.multiple) type = "pn-select-multiple-vendors"
        else type = "pn-select-vendor"

        var _select_vendor = {
            key: 'vendors',
            type: type,
            templateOptions: {
                // placeholder: 'Recipient',
                label: params.label,
                labelProp: 'label',
                // valueProp: 'license',
                options: []
            },
            controller: function ($scope, Vendors) {
                if(!$scope.model.vendors)$scope.model.vendors = [];
                if(Vendors.data) init()
                else Vendors.init()
                function init () {
                    $scope.to.options = _.map(Vendors.data, function(v){
                        v.name = v.label
                        return v
                    })
                }
                $scope.$on('vendors', init)
                $scope.querySearch = function(query) {
                    console.log(_.map($scope.to.options.filter(createFilterFor(query)),function(vendor){return vendor}));
                    return _.map($scope.to.options.filter(createFilterFor(query)),function(vendor){return vendor})
                }
                function createFilterFor(query) {
                    var lowercaseQuery = angular.uppercase(query);
                    return function filterFn(vendor) {
                        return (vendor.name.indexOf(lowercaseQuery) !== -1);
                    };
                }
                $scope.searchText = ""
                $scope.$on('pnData', init)

                $scope.selectedItemChange = function(item) {
                    console.log('selected!');
                    console.log(item);
                    // var item = _.map($scope.to.options.filter(createFilterFor(query)),function(vendor){return vendor})
                    // console.log(item);
                    // $scope.model.vendors

                };
            }
        }
        if (params.hideExpression) _select_vendor.hideExpression = params.hideExpression
        return _select_vendor
    }

    // f.add_manifest_stop_button = {
    //     key: 'manifest_stops',
    //     type: 'pn-button',
    //     templateOptions: {
    //         label: 'Add Stop',
    //         buttonClass: 'btn btn-raised white-text'
    //     },
    //     controller: function ($scope) {
    //         $scope.stops = 1;
    //         $scope.onClick = function(){
    //             $scope.stops++;
    //         }
    //     }
    // };

    f.manifest_approximate_departure = {
        key: 'approximate_departure',
        type: 'mydatetime',
        templateOptions: {
            label: 'Date and Time of Departure',
        },
    }
    f.manifest_approximate_arrival = {
        key: 'approximate_arrival',
        type: 'mydatetime',
        templateOptions: {
            label: 'Date and Time of Arrival',
            labelProp: 'label',
        },
    }
    // function removedeleted (r) {
    //     if (!r) return
    //     for(var i = r.length - 1; i >= 0; i--) {
    //         if(r[i].deleted != 0) {
    //             r.splice(i, 1);
    //         }
    //     }
    //     return r;
    // }


    // function fail (res) {
    //     console.log("Field Data Service Connect Service Response success=0 " + res.error);
    //     alert = $mdDialog.alert({
    //         title: 'Error! Washington State Liquor and Cannabis Board Traceability says: ',
    //         content: res.error,
    //         ok: 'Close'
    //     });
    //     $mdDialog
    //     .show( alert )
    //     .finally(function() {
    //         alert = undefined;
    //         console.log(res.error);
    //         if (res.error == "Your session has expired.") {
    //             console.log('res.error!!!');
    //             $location.path('/login');
    //         }
    //     });
    // }

    function sortbykey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }
    f.quantity = function (params) {
        return {
            key: 'quantity',
            type: 'myquantity', // change to select, async sync_inventory
            templateOptions: {
                label: params.label,
            }
        }
    }
    // f.quantity =
    // };
    f.pnQuantityField = function(params){
        return {
            key: params.key,
            type: 'myquantity', // change to select, async sync_inventory
            templateOptions: {
                label: params.label,
            },
            hideExpression: params.hideExpression
        };
    };
    f.enter_adjust_reason = {
        key: 'adjust_reason',
        type: 'pn-input',
        templateOptions: {
            label: 'Enter the reason for the adjustment.',
        }
    };
    f.select_adjust_type = {
        key: 'adjust_type',
        type: 'pn-select',
        templateOptions: {
            label: 'Select the Adjustment Type.',
            options: [
                {id: 1, label: 'General Inventory Audit'},
                {id: 2, label: 'Theft'},
                {id: 3, label: 'Seizure by Law Enforcement'},
                {id: 4, label: 'Correcting a Mistake'},
                {id: 5, label: 'Moisture Loss'},
                {id: 6, label: 'Depletion'},
            ],
            labelProp: 'label',
        },
        controller: function ($scope) {
            $scope.select = function(option){
                console.log(option);
                $scope.selected = option

                $scope.model.adjust_type = option
            }
            $scope.pnData = true
        }
    };
    function gettypemap () {
        var typemap = {
            5: {label:'Kief', weighable:true},
            6: {label: 'Flower', weighable:true},
            7: {label: 'Clone', weighable: true},
            9: {label: 'Other Plant Material (stems, leaves, etc to be processed)', weighable: true},
            10: {label: 'Seed', weighable: true},
            11: {label: 'Plant Tissue', weighable: true},
            12: {label: 'Mature Plant', weighable: true},
            13: {label: 'Flower Lot', weighable: true},
            14: {label: 'Other Plant Material Lot', weighable: true},
            15: {label: 'Bubble Hash', weighable: true},
            16: {label: 'Hash', weighable: true},
            17: {label: 'Hydrocarbon Wax', weighable: true},
            18: {label: 'CO2 Hash Oil', weighable: true},
            19: {label: 'Food Grade Solvent Extract', weighable: true},
            20: {label: 'Infused Dairy Butter or Fat in Solid Form', weighable: true},
            21: {label: 'Infused Cooking Oil', weighable: true},
            22: {label: 'Solid Marijuana Infused Edible', weighable: false},
            23: {label: 'Liquid Marijuana Infused Edible', weighable: false},
            24: {label: 'Marijuana Extract for Inhalation', weighable: false},
            25: {label: 'Marijuana Infused Topicals', weighable: false},
            26: {label: 'Sample Jar', weighable: false},
            27: {label: 'Waste', weighable: true},
            28: {label: 'Usable Marijuana', weighable: false},
            29: {label: 'Wet Flower', weighable: true},
            30: {label: 'Marijuana Mix', weighable: true},
            31: {label: 'Marijuana Mix Packaged', weighable: false},
            32: {label: 'Marijuana Mix Infused', weighable: false}
        }
        return typemap;
    };
    function inventorytypeinfoarray () {
        var infoarray = [
            {
                'label': 'Kief',
                'id': '5',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Flower',
                'id': '6',
                'category': 'Plant',
                convertable: true
            },
            {
                'label': 'Clone',
                'category': 'Plant',
                'id': '7'
            },
            {
                'label': 'Other Plant Material',
                'category': 'Plant',
                'id': '9',
                convertable: true
            },
            {
                'label': 'Seed',
                'category': 'Plant',
                'id': '10'
            },
            {
                'label': 'Plant Tissue',
                'category': 'Plant',
                'id': '11'
            },
            {
                'label': 'Mature Plant',
                'category': 'Plant',
                'id': '12'
            },
            {
                'label': 'Flower Lot',
                'category': 'Plant',
                convertable:true,
                'id': '13'
            },
            {
                'label': 'Other Plant Material Lot',
                'category': 'Plant',
                'id': '14',
                convertable: true
            },
            {
                'label': 'Bubble Hash',
                'id': '15',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Hash',
                'id': '16',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Hydrocarbon Wax',
                'id': '17',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'CO2 Hash Oil',
                'id': '18',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Food Grade Solvent Extract',
                'id': '19',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Infused Dairy Butter or Fat in Solid Form',
                'id': '20',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Infused Cooking Oil',
                'id': '21',
                'category': 'Intermediate Product (for QA testing)',
                derivative: true
            },
            {
                'label': 'Solid Marijuana Infused Edible',
                'id': '22',
                'category': 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Liquid Marijuana Infused Edible',
                'id': '23',
                'category': 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Marijuana Extract for Inhalation',
                'id': '24',
                'category': 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Marijuana Infused Topicals',
                'id': '25',
                'category': 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Sample Jar',
                'id': '26',
                'category': 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Waste',
                'id': '27',
                'category': 'Waste',
                waste: true
            },
            {
                'label': 'Usable Marijuana',
                'id': '28',
                'category': 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Wet Flower',
                'id': '29',
                'category': 'Plant',
            },
            {
                'label': 'Marijuana Mix (Shake & Trim)',
                'category': 'Intermediate Product (for QA testing)',
                'id': '30',
                derivative: true
            },
            {
                'label': 'Packaged Marijuana Mix (Shake & Trim)',
                'id': '31',
                category: 'End Product (for sale)',
                derivative: true
            },
            {
                'label': 'Infused Marijuana Mix (Shake & Trim)',
                'id': '32',
                category: 'End Product (for sale)',
                derivative: true
            }, ];
            infoarray.map( function(type) {
                type.weighable = getinventorytypeinfo(type.id).weighable
            })
            return infoarray
        }

        f.new_user_permissions = function(){
            return {
                key:'new_user_permissions',
                type: 'new_user_permissions',
                templateOptions: {
                    label: 'Next, deselect any permissions you do not wish the new user to have'
                },
                controller: function($scope){
                    // console.log('new_user_permissions');

                    var a = {
                        "inventory_convert": 1,
                        "sale_dispense": 1,
                        "sale_modify": 1,
                        "sale_void": 1,
                        "sale_refund": 1,
                        "justauthenticate": 1,
                        "employee_add": 1,
                        "employee_modify": 1,
                        "employee_remove": 1,
                        "vehicle_add": 1,
                        "vehicle_modify": 1,
                        "vehicle_remove": 1,
                        "plant_room_add": 1,
                        "plant_room_modify": 1,
                        "plant_room_remove": 1,
                        "inventory_room_add": 1,
                        "inventory_room_modify": 1,
                        "inventory_room_remove": 1,
                        "plant_destroy_schedule": 1,
                        "plant_destroy_schedule_undo": 1,
                        "plant_destroy": 1,
                        "plant_harvest_schedule": 1,
                        "plant_harvest_schedule_undo": 1,
                        "plant_harvest": 1,
                        "plant_new": 1,
                        "plant_new_undo": 1,
                        "plant_convert_to_inventory": 1,
                        "plant_cure": 1,
                        "plant_yield_modify": 1,
                        "plant_waste_weigh": 1,
                        "inventory_new": 1,
                        "inventory_manifest_lookup": 1,
                        "inventory_transfer_inbound": 1,
                        "inventory_transfer_inbound_modify": 1,
                        "inventory_transfer_lookup": 1,
                        "inventory_transfer_outbound": 1,
                        "inventory_transfer_outbound_modify": 1,
                        "inventory_transfer_outbound_void": 1,
                        "plant_move": 1,
                        "plant_modify": 1,
                        "inventory_adjust": 1,
                        "inventory_adjust_usable": 1,
                        "inventory_sample": 1,
                        "inventory_qa_check": 1,
                        "inventory_qa_check_all": 1,
                        "inventory_qa_sample": 1,
                        "inventory_qa_sample_void": 1,
                        "inventory_qa_sample_results": 1,
                        "inventory_manifest_pickup": 1,
                        "inventory_manifest_modify": 1,
                        "inventory_manifest": 1,
                        "inventory_manifest_void": 1,
                        "inventory_manifest_void_stop": 1,
                        "inventory_manifest_void_items": 1,
                        "inventory_create_lot": 1,
                        "inventory_split": 1,
                        "user_add": 1,
                        "user_modify": 1,
                        "user_remove": 1,
                        "inventory_move": 1,
                        "inventory_destroy_schedule": 1,
                        "inventory_destroy_schedule_undo": 1,
                        "inventory_destroy": 1,
                        "tax_obligation_file": 1,
                        "nonce_replay": 1,
                        "sync_vehicle": 1,
                        "sync_employee": 1,
                        "sync_plant_room": 1,
                        "sync_inventory_room": 1,
                        "sync_inventory": 1,
                        "sync_plant": 1,
                        "sync_plant_derivative": 1,
                        "sync_manifest": 1,
                        "sync_inventory_transfer": 1,
                        "sync_inventory_transfer_inbound": 1,
                        "sync_sale": 1,
                        "sync_tax_report": 1,
                        "sync_vendor": 1,
                        "sync_qa_lab": 1,
                        "sync_check": 1,
                        "sync_inventory_adjust": 1,
                        "sync_inventory_qa_sample": 1,
                        "sync_inventory_sample": 1,
                        "inventory_manifest_void_stop": 1,
                        "inventory_manifest_void_items": 1,
                        "inventory_transfer_outbound_return_lookup": 1,
                        "inventory_transfer_outbound_return": 1,
                        "inventory_convert_undo": 1,
                        "inventory_manifest_third_party": 1,
                        "sync_third_party_transporter": 1,
                        "card_lookup": 1,
                        "inventory_qa_sample_non_mandatory": 1,
                        "plant_harvest_undo": 1,
                        "plant_cure_undo": 1
                    }
                    // $scope.all = _.keys(a)
                    $scope.all = a
                    $scope.model.new_user_permissions = $scope.all
                    console.log($scope.all);
                    $scope.togglePerm = function(perm){
                        if($scope.all[perm] === 1) {
                            $scope.all[perm] = 0
                            console.log('UNCHECK');
                        } else {
                            $scope.all[perm] = 1
                        }
                    }

                    $scope.checkAll = function () {
                        _.map($scope.all, function (value, perm) {
                            $scope.all[perm] = 1
                        })
                    }

                    $scope.uncheckAll = function () {
                        _.map($scope.all, function (value, perm) {
                            $scope.all[perm] = 0
                        })
                    }

                }
            }

        }
        function getinventorytypeinfo (typeid) {
            var typemap = gettypemap();
            return typemap[typeid];
        }
        function gettimestring (unixtime) {
            return new Date(unixtime * 1000).toLocaleString();
        }
        function getdatestringfor (unixtime) {
            return new Date(unixtime * 1000).toLocaleDateString();
        }
        function fielddata (field) {
            return f[field];
        }

        return {
            fielddata: fielddata,
            f: f
        };
    };


    // function pnTableValueFormatter(data, col) {
    //     // if (col.quantityLabel)
    //     // console.log('called');
    //     if(!data ) return ''
    //     // console.log(data);
    //     if (col.sessiontime) return col.sessiontime //getdatestringfor(data)
    //     if (col.atTime) return getdatestringfor(data/1000)
    //     if (col.dollars) return '$'+numberWithCommas(data)
    //     return data
    //
    //     function numberWithCommas(x) {
    //         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     }
    // };
