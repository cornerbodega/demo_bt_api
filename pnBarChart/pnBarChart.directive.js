angular.module('countryApp')
.directive('pnBarChart', pnBarChart)

function pnBarChart(pnMyData, pnChartData, pnDataBank) {
    return {
        link: function ($scope, elem, attrs) {
            _myDoughnutChart = null
            function makeChart() {
                console.log('Make Chart ');
                var ctx = document.getElementById('myChart')
                // ctx
                // ctx.clearRect(0, 0, ctx.width, ctx.height)


                if(!$scope.chartData) return console.log('No $scope.chartData. Exiting... ');
                var data = {
                    labels: $scope.chartData.labels,
                    datasets: [
                        {
                            data: $scope.chartData.data,
                            backgroundColor: $scope.chartData.colors,
                            hoverBackgroundColor: $scope.chartData.colors,
                        }
                    ]
                };
                if(!!_myDoughnutChart) _myDoughnutChart.destroy()
                _myDoughnutChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: data,
                    options: {
                        legend: {display: false}
                    }
                });
            }
            // chartDataUpdated
            $scope.$watch('model.reportPeriod', function (newVal, oldVal) {
                console.log($scope.model.inventory);
                if(!_myDoughnutChart) return
                _myDoughnutChart.destroy()
                makeChart()
            })
            $scope.$watch('model.inventory', function (newVal, oldVal) {
                console.log($scope.model.inventory);
                makeChart()
            })
            $scope.$watch('model.outbound_transfers', function (newVal, oldVal) {
                console.log($scope.model.outbound_transfers);
                makeChart()
            })
            $scope.$watch('model.plants', function (newVal, oldVal) {
                console.log($scope.model.plants);
                makeChart()
            })
            $scope.$watch('model.inbound_transfers', function (newVal, oldVal) {
                console.log($scope.model.inbound_transfers);
                makeChart()
            })
            // $scope.$on($scope.params.key, init1);

            //     if(myData.data) init1()
            //     else myData.init();
            //     $scope.$on($scope.params.key, init1);
            //     function init1(){
            //         console.log('init1');
            //         $scope.chartData = pnChartData.format({key: $scope.params.key, data: myData.data})
            //         pnChartData.data = $scope.chartData
            //         init()
            //         // $rootScope.$broadcast('chartData', $scope.chartData)
            //     }
            //     // if(pnChartData.data) init()
            //     // else(pnChartData.getDataFor())
            //     // $scope.$on('chartData', init)
            //     // $scope.$on('selected_chart_type', function () {
            //     //     console.log('selected_chart_type');
            //     //     init()
            //     // })
            //     // console.log($scope.model.chart_type);
            //     // $scope.$watch('model.chart_type.id',function (newVal, oldVal) {
            //     // //     if (newVal === oldVal) return
            //     //     console.log('Model.chart_type changed ' + newVal );
            //     //     init()
            //     // })
            //     function init() {
            //         var ctx = document.getElementById('myChart')
            //         if (!pnChartData.data) return console.log('No pnChartData. exiting....');
            //
            //         $scope.chartData = pnChartData.data
            //         console.log($scope.chartData);
            //         var data = {
            //             labels: $scope.chartData.labels,
            //             datasets: [
            //                 {
            //                     data: $scope.chartData.data,
            //                     backgroundColor: $scope.chartData.colors,
            //                     hoverBackgroundColor: $scope.chartData.colors,
            //                 }
            //             ]
            //         };
            //         var myDoughnutChart = new Chart(ctx, {
            //             type: 'doughnut',
            //             data: data,
            //             options: {
            //                 legend: {position: 'bottom'}
            //             }
            //         });
            //     }
        }
    }
}


// var myChart = new Chart(ctx, {
//     type: 'bar',
//     xLabels: $scope.chartData.xLabels,
//     yLabels: $scope.chartData.yLabels,
//     data: {
//         labels: $scope.chartData.labels,
//         datasets: [{
//             label: $scope.chartData.title,
//             data: $scope.chartData.data,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
