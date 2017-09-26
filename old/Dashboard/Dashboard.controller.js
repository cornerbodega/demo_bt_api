(function(){
    angular
    .module('countryApp')
    .controller('DashboardController', ['$scope','$location','pnData', 'TraceabilityMenuService','pnCols','pnCategories','pnSelected', DashboardController ])

    function DashboardController($scope, $location, pnData, TraceabilityMenuService, pnCols, pnCategories, pnSelected) {
        $scope.rows = []
        $scope.categories = pnCategories()
        // $scope.categories = [
        //     {
        //         label: 'Plants',
        //         id: 'plants',
        //         icon: 'fa-lemon-o',
        //         cols: pnCols('plants')
        //     },
        //     {
        //         label: 'Inventory',
        //         id: 'inventory',
        //         icon: 'fa-barcode',
        //         cols: pnCols('inventory')
        //         // cols: [
        //         //         {id: 'strain', label: 'Strain'},
        //         //         {id: 'inventorytypelabel', label: 'Type'},
        //         //         {id: 'pnQuantitiyLabel', label: 'Amount'},
        //         //         {id: 'thc', label: 'THC'},
        //         //         {id: 'cbd', label: 'CBD'},
        //         //         {id: 'roomLabel', label: 'Room'},
        //         //         {id: 'id', label: 'ID'}
        //         //     ],
        //     },
        //     // { label: 'Drivers', id: 'employees', icon: 'fa-users' },
        //     { label: 'Location', id: 'location', icon: 'fa-building-o' }
        // ];
        $scope.selectCategory = selectCategory;
        // selectCategory($scope.categories[1]);

        if(pnData.data.inventory) {
            // $scope.rows = pnData.data.inventory
            pnLoaded()
        }

         // var start_time = Date.now();
        $scope.$on('pnData', function(){
            console.log('We have Data!!');
            // $scope.rows = pnData.data.inventory
            pnLoaded();
            // $scope.pnData = true

            // clearInterval($scope.loadingInterval);



        })
        // $scope.loadingDots = [1];
        // $scope.loadingInterval = setInterval(function(){ console.log($scope.loadingDots); $scope.loadingDots.push(1) }, 10000);

        /* later */
        function selectCategory(category) {
            $scope.selectedCategory = category
            $scope.catActions = TraceabilityMenuService.paths()['/traceability/'+category.id];
            $scope.rows = rowsForCategory(category.id);
            // $scope.cols = colsForCategory(category.id);
            // $scope.cols =
            // console.log(TraceabilityMenuService.paths);
            console.log(category);
            console.log($scope.catActions);
        }

        $scope.selectAction = function(action) {
            pnSelected.selected = _.filter($scope.rows, {$selected:true})
            $location.path('/traceability/'+$scope.selectedCategory.id +'/'+action.id)
        }
        // function colsForCategory(id) {
        //     if (id === 'inventory') {
        //      return [
        //         {id: 'strain', label: 'Strain'},
        //         {id: 'inventorytypelabel', label: 'Type'},
        //         {id: 'pnQuantitiyLabel', label: 'Amount'},
        //         {id: 'thc', label: 'THC'},
        //         {id: 'cbd', label: 'CBD'},
        //         {id: 'roomLabel', label: 'Room'},
        //         {id: 'id', label: 'ID'},
        //     ];
        //     }
        // }
        function rowsForCategory(id) {
            if (id === 'plants') return pnData.data.plants
            if (id === 'inventory') { return pnData.data.inventory }
            if (id === 'location') {return $scope.rows = []}
        }

        function pnLoaded() {
            console.log('pnLoaded');
            // $scope.selectCategory($scope.categories[1]);
            console.log($scope.rows);
            // $scope.$apply()
            $scope.pnData = true;
        }
        $scope.classForCategory = function(category) {
            if (!$scope.selectedCategory) return ''
            else if (category.id === $scope.selectedCategory.id) return 'pnUnderline'
            else return ''
        }
        // $scope.actions =

            $scope.getSelected = function(){
             return _.filter($scope.rows, {$selected: true})
        }
        $scope.classForRow = function(row) {
            if(!row.$selected) return ''
            if(row.$selected) return 'green darken-3 white-text'
        }
        $scope.toggleSelectRow = function(row) {
            row.$selected = !row.$selected;
            pnSelected.selected = _.filter($scope.rows, {$selected: true})
        }
        $scope.search = {}
        $scope.sortHand = function(col) {
            if (col.id === $scope.predicate) {
                if ($scope.reverse) return 'fa fa-hand-o-down'
                else return 'fa fa-hand-o-up'
            } else return ''
        }
        $scope.setSort = function(col) {
            console.log(col);
            $scope.predicate = col.id;
            $scope.reverse = !$scope.reverse;
        }
        $scope.selectAll = function() {
            console.log('Select All!');
        }
        //
        // $scope.rows = [
        //     // {id: 0, name: 'Marvin Holappa'},
        //     // {id: 1, name: 'Marvin Rhone'}
        // ];

    }



})();
