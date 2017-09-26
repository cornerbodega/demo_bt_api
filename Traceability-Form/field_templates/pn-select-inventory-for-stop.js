
// (function(){
    angular
    .module('countryApp')

    .directive('pnSelectInventoryForStop', function(Inventory, $log, pnCols, $rootScope, $location, $window) {
        return {
            restrict: 'E',
            templateUrl: 'Traceability-Form/field_templates/pn-select-table.html',
            link: function($scope, element, attrs) {
                initCols()
                function initCols() {
                    // $scope.cols = [];
                    // _.map(pnCols(params.key), function(col){
                    //     if(!col.detail) return $scope.cols.push(col);
                    // });
                    $scope.toPrintLabels = function () {
                        var ids = JSON.stringify(_.pluck($scope.model[$scope.options.key], 'id'))
                        // console.log(ids);
                        $window.open('https://abctraceability.com/wa/#/traceability/labels/label_view2?sessionid='+sessionStorage.sessionid, '_blank')
                        // $location.path('/traceability/labels/label_view2').search({selected: ids, label_category: $scope.options.key, sessionid: sessionStorage.sessionid})
                    }
                    $scope.cols = pnCols('inventory')

                    // For editing columns
                    $scope.showCols = {}
                    _.map($scope.cols, function(col){
                        col.hide = col.detail
                        col.hide = JSON.parse(localStorage.getItem(col.id));
                        // console.log(localStorage.getItem(col.id));
                        console.log(col.hide);
                        $scope.showCols[col.id] = col
                    })

                };
                // For show all rows feature
                $scope.showAll = function(){
                    $scope.itemsPerPage = $scope.rows.length
                }
                $scope.collapse = collapse
                collapse()
                function collapse() {
                    $scope.itemsPerPage = 100000
                }
                $scope.toggleShowCol = function(id) {
                    console.log(id);
                    console.log($scope.showCols);
                    console.log($scope.showCols[id]);
                    $scope.showCols[id].hide = !$scope.showCols[id].hide
                    localStorage.setItem(id, $scope.showCols[id].hide)
                    console.log();
                    // console.log(localStorage.getItem(id));

                }

                console.log(attrs.stop);
                $scope.stop = attrs.stop;
                if (!$scope.model.stops){
                    $scope.model.stops = {};
                }
                if (!$scope.model.stops[$scope.stop-1]) {
                    $scope.model.stops[$scope.stop-1] = {};
                }
                if (!$scope.model.stops[$scope.stop-1].inventoryitems) {
                    $scope.model.stops[$scope.stop-1].inventoryitems = []
                }

                $scope.currentStopModel = $scope.model.stops[$scope.stop-1]
                // if (!$scope.model.stops[$scope.stop-1].inventoryitems) $scope.model.stops[$scope.stop-1].inventoryitems = {}
                // $scope.model.stops[$scope.stop-1].inventoryitems = $scope.model.stops[$scope.stop-1].inventoryitems
                $scope.model.inventoryitems = $scope.model.stops[$scope.stop-1].inventoryitems


                $scope.options.key = 'inventoryitems'
                console.log('SELECT INVENTORY FOR STOP');
                $scope.to = {label: "Inventory", options: []}
                $scope.$on('item_selected', function(e, item){
                    console.log('Selected@@');
                    $scope.toggleItemToStop(item)
                    // console.log(item);
                })
                $scope.classForSelectTableDiv = function() {
                    return ""
                }
                if(Inventory.data) init()
                else Inventory.init();

                function init() {
                    console.log('INIT!!!');
                    console.log(Inventory.data);
                    $scope.rows   = Inventory.data;
                    $scope.pnData = true;
                    initLoadFromLocalStorage()
                };
                function initLoadFromLocalStorage() {
                    var ids = _.pluck($scope.model.inventoryitems, 'id')
                    console.log(ids);
                    _.map(ids,function (id) {

                        // console.log($scope.rows);
                        var f = _.findWhere($scope.rows, {id: id})
                        console.log(f);

                        if (f) select(f)
                        console.log(f);

                        // select(f)
                        console.log(f);
                    })
                    // console.log($scope.who);
                    // $rootScope.$apply()

                }
                $scope.$on('inventory', init);
                $scope.classForRow = function(item) {
                    if (itemIsSelected(item)) return 'md-3-line green darken-3 white-text'
                    else return ''

                }
                function itemIsSelected(item) {
                    return _.contains($scope.model.stops[$scope.stop-1].inventoryitems, item)
                }
                $scope.select= select

                 function select ($event, item){
                    console.log('select item!');
                    console.log(item);

                    $scope.model.stops[$scope.stop-1].inventoryitems= [];

                    item.$selected = !item.$selected
                    // if(_.contains($scope.model.stops[$scope.stop-1].inventoryitems), item) {
                    //     var i = $scope.model.stops[$scope.stop-1].inventoryitems.indexOf(item)
                    //     $scope.model.stops[$scope.stop-1].inventoryitems.splice(i, 1)
                    // }
                    $scope.rows.map(function(i){
                        if (i.$selected) $scope.model.stops[$scope.stop-1].inventoryitems.push(i)
                    })
                    console.log($scope.model.stops[$scope.stop-1].inventoryitems);
                    $scope.model.inventoryitems = $scope.model.stops[$scope.stop-1].inventoryitems
                }
                if($scope.rows) deselectAll();
                function deselectAll() {
                    if(!$scope.rows) return
                    _.map($scope.rows, function(i){
                        return i.$selected = false
                    })
                    if($scope.model.stops[$scope.stop-1].inventoryitems) $scope.model.stops[$scope.stop-1].inventoryitems = []
                };

                $scope.search = {};
                $scope.sortHand = function(col) {
                    if (col.id === $scope.predicate) {
                        if ($scope.reverse) return 'fa fa-hand-o-up'
                        else return 'fa fa-hand-o-down'
                    } else return ''
                }
                $scope.setSort = function(col) {
                    console.log(col);
                    $scope.predicate = col.id;
                    $scope.reverse = !$scope.reverse;
                }

                // $scope.tags = []
                // console.log($scope.model)
                // $scope.querySearch = function(query) {
                //     return $scope.rows.filter(createFilterFor(query));
                // }
                //
                // function createFilterFor(query) {
                //     var lowercaseQuery = angular.uppercase(query);
                //     return function filterFn(item) {
                //             item.name =   item.pnQuantitiyLabel + " " + item.strain + " "+ item.inventorytypelabel + " " + item.id
                //             return (item.name.indexOf(lowercaseQuery) !== -1);
                //         return
                //     };
                // }
                // $scope.model.stops[$scope.stop-1].inventoryitems.inventoryitems = []
                // $scope.chipChanged = function($chip) {
                //     console.log($chip);
                //     // $scope.model.stops[$scope.stop-1].inventoryitems.inventoryitems = tags
                // }
                // $scope.pnSetDate() {
                //     console.log($scope.model.stops[$scope.stop-1].inventoryitems);
                // }
            }
        }
    })
