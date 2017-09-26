(function(){
    angular
    .module('countryApp')
    .controller('TraceabilityBrowseController', ['$scope','$location', 'TraceabilityMenuService', TraceabilityBrowseController ])

    function TraceabilityBrowseController($scope, $location, TraceabilityMenuService) {
        // console.log('wtf');
        // if(pnData.data.inventory) init()
        //
        // function init() {
        //     $scope.rows = pnData.data.inventory
        //     $scope.pnData = true
        //
        // }
        // // $scope.$on('pnData', function(){
        // //     // console.log('We have Data!!');
        // //     init()
        // // })
        // $scope.actions = []
        // // $scope.
        // $scope.getSelected = function(){
        //      return _.filter($scope.rows, {$selected: true})
        // }
        // $scope.classForRow = function(row) {
        //     if(!row.$selected) return ''
        //     if(row.$selected) return 'pnGreenDarken3 white-text'
        // }
        // $scope.toggleSelectRow = function(row) {
        //     row.$selected = !row.$selected;
        // }
        // $scope.search = {}
        // $scope.sortHand = function(col) {
        //     if (col.id === $scope.predicate) {
        //         if ($scope.reverse) return 'fa fa-hand-o-down'
        //         else return 'fa fa-hand-o-up'
        //     } else return ''
        // }
        // $scope.setSort = function(col) {
        //     console.log(col);
        //     $scope.predicate = col.id;
        //     $scope.reverse = !$scope.reverse;
        // }
        // $scope.selectAll = function() {
        //     console.log('Select All!');
        // }
        // $scope.cols = [
        //     {id: 'id', label: 'ID'},
        //     {id: 'strain', label: 'Strain'},
        //     {id: 'inventorytypelabel', label: 'Type'},
        //     {id: 'pnQuantitiyLabel', label: 'Amount'},
        //     {id: 'thc', label: 'THC'},
        //     {id: 'cbd', label: 'CBD'},
        //     {id: 'roomLabel', label: 'Room'},
        //
        //     // {id: 'strain', label: 'Name'}
        // ];
        // $scope.rows = [
        //     // {id: 0, name: 'Marvin Holappa'},
        //     // {id: 1, name: 'Marvin Rhone'}
        // ];

    }



})();
