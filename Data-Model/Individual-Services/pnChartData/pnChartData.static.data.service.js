angular.module('countryApp')
.factory('pnChartData', pnChartData)

function pnChartData(pnColorBank) {
    // var inventory = pnMyData.inventory()

    function getColorsFor(chartData) {

        var Colors = {};
        // var names =
        var chosenColors = []
        var n = _.keys(chartData).length

        function randomColor() {

            var chosen = ""
            selectColor()

            function selectColor() {
                var rand = _.sample(pnColorBank);
                if (_.contains(chosenColors, rand)) selectColor()
                else {
                    chosen = rand
                    chosenColors.push(rand)
                }

            }
            // console.log(chosenColors);
            if (chosenColors.length > n) console.log('Uh oh we need more colors!!');
            return chosen;
        };

        var c = []

        for(var i = 0; i < n; i++ ){
            c.push(randomColor())
        }

        return c
    }
    function formatter(params) {
        console.log(params);
        var sums = {}
        var keyProp = params.keyProp;
        var valueProp = params.valueProp;

        if(!!params.period) {
            var f = []
            if(params.period != 'All') {
                _.map(params.data, function(item) {
                    console.log(item.period.indexOf(params.period) != -1);
                    if(item.period.indexOf(params.period) != -1) f.push( item)

                })
                params.data = f
            }

        }
        // console.log(keyProp);
        // console.log(valueProp);
        _.map(params.data, function (item) {
            // console.log(item);
            // console.log(item[keyProp]);
            console.log(+item[valueProp]);
            // console.log(params.);
            if(!sums[item[keyProp]]) sums[item[keyProp]] = 0
            sums[item[keyProp]] += +item[valueProp]
        })
        console.log(sums);
        var rounded_sums = {}
        _.map(sums,function (value, key) {
            rounded_sums[key] = value.toFixed(2)
        })
        var numbered_sums = []
        _.map(rounded_sums, function(value, key){
            numbered_sums.push({value: value, key: key})
         });
         console.log(numbered_sums);
         var sorted_sums = _.sortBy(numbered_sums, function (d) {
             console.log(d);
             return +d.value * -1
         })
        console.log(sorted_sums);
        var labels = []
        var rdata = []
        _.map(sorted_sums, function (v) {
            labels.push(v.key)
            rdata.push(v.value)
        })

        return {
            labels: labels,
            data:  rdata,
            frontUnits: params.frontUnits,
            backUnits: params.backUnits,
            colors: getColorsFor(sorted_sums)
        }
    }
    var _pnChartData = {
        formatter: formatter,
        // format: function (params) {
        //     var report = params.key
        //     var data = params.data
        //
        //     var r = {}
        //     r.inbound_transfers_by_vendor = function () {
        //         console.log(params);
        //         console.log(data);
        //         var f = []
        //         if(params.period) {
        //             _.map(data, function(item) {
        //                 console.log(item.period.indexOf(params.period) != -1);
        //                 if(item.period.indexOf(params.period) != -1) f.push( item)
        //
        //             })
        //             data = f
        //         }
        //
        //         var outbound_transfers = data
        //         var vendors_sums = {}
        //         var rounded_vendors_sums = {}
        //         _.map(outbound_transfers, function (transfer) {
        //             if(!vendors_sums[transfer.toLabel]) vendors_sums[transfer.vendorName] = 0
        //             vendors_sums[transfer.toLabel]  += +transfer.price
        //         })
        //         _.map(vendors_sums,function (value, key) {
        //             rounded_vendors_sums[key] = value.toFixed(2)
        //         })
        //
        //
        //         var numbered_vendor_sums = []
        //         _.map(rounded_vendors_sums, function(value, key){
        //             numbered_vendor_sums.push({value: value, key: key})
        //          });
        //          console.log(numbered_vendor_sums);
        //          var sorted_vendors_sums = _.sortBy(numbered_vendor_sums, function (d) {
        //              console.log(d);
        //              return +d.value * -1
        //          })
        //         console.log(sorted_vendors_sums);
        //         vendors_sums = sorted_vendors_sums
        //         var labels = []
        //         var rdata = []
        //         _.map(sorted_vendors_sums, function (v) {
        //             labels.push(v.key)
        //             rdata.push(v.value)
        //         })
        //
        //         return {labels: labels,
        //             data:  rdata,
        //             frontUnits: '$ ',
        //             colors: getColorsFor(vendors_sums)
        //         }
        //     }
        //
        //     r.outbound_transfers_by_vendor = function () {
        //         console.log(params);
        //         console.log(data);
        //         var f = []
        //         if(params.period) {
        //             _.map(data, function(item) {
        //                 console.log(item.period.indexOf(params.period) != -1);
        //                 if(item.period.indexOf(params.period) != -1) f.push( item)
        //
        //             })
        //             data = f
        //         }
        //
        //         var outbound_transfers = data
        //         var vendors_sums = {}
        //         var rounded_vendors_sums = {}
        //         _.map(outbound_transfers, function (transfer) {
        //             if(!vendors_sums[transfer.toLabel]) vendors_sums[transfer.toLabel] = 0
        //             vendors_sums[transfer.toLabel]  += +transfer.price
        //         })
        //         _.map(vendors_sums,function (value, key) {
        //             rounded_vendors_sums[key] = value.toFixed(2)
        //         })
        //
        //
        //         var numbered_vendor_sums = []
        //         _.map(rounded_vendors_sums, function(value, key){
        //             numbered_vendor_sums.push({value: value, key: key})
        //          });
        //          console.log(numbered_vendor_sums);
        //          var sorted_vendors_sums = _.sortBy(numbered_vendor_sums, function (d) {
        //              console.log(d);
        //              return +d.value * -1
        //          })
        //         console.log(sorted_vendors_sums);
        //         vendors_sums = sorted_vendors_sums
        //         var labels = []
        //         var rdata = []
        //         _.map(sorted_vendors_sums, function (v) {
        //             labels.push(v.key)
        //             rdata.push(v.value)
        //         })
        //
        //         return {labels: labels,
        //             data:  rdata,
        //             frontUnits: '$ ',
        //             colors: getColorsFor(vendors_sums)
        //         }
        //     }
        //
        //     r.plants_by_strain = function () {
        //         console.log(data);
        //         var plants = data
        //         var strain_sums = {}
        //
        //         _.map(plants, function (plant) {
        //             if(!strain_sums[plant.strain]) strain_sums[plant.strain] = 0
        //             strain_sums[plant.strain]++
        //         })
        //         var numbered_strains_sums = []
        //         _.map(strain_sums, function(value, key){
        //             numbered_strains_sums.push({value: value, key: key})
        //          });
        //          console.log(numbered_strains_sums);
        //          var sorted_strains_sums = _.sortBy(numbered_strains_sums, function (d) {
        //              console.log(d);
        //              return +d.value * -1
        //          })
        //         var labels = []
        //         var rdata = []
        //         _.map(sorted_strains_sums, function (v) {
        //             labels.push(v.key)
        //             rdata.push(v.value)
        //         })
        //
        //         return {labels:labels,
        //             data: rdata,
        //             colors: getColorsFor(sorted_strains_sums)
        //         }
        //     }
        //     r.inventory_by_strain = function () {
        //         var inventory = data
        //         // strain vs quantity
        //         // var strains = _.uniq(_.pluck(inventory, 'strain'))
        //         var strain_sums = {}
        //         var roundedStrainSums = {}
        //         // _.map(strains, function (strain) {
        //         //
        //         // })
        //         _.map(inventory, function (item) {
        //             // console.log(item);
        //             if(!strain_sums[item.strain]) strain_sums[item.strain] = 0
        //             strain_sums[item.strain] += +item.remaining_quantity
        //         })
        //         _.map(strain_sums, function (value, key) {
        //             roundedStrainSums[key] = value.toFixed(2)
        //         })
        //         strain_sums = roundedStrainSums
        //
        //         // console.log(strain_sums);
        //         return {labels: _.keys(strain_sums),
        //             data:  _.values(strain_sums),
        //             colors: getColorsFor(strain_sums),
        //             backUnits: 'g'
        //         }
        //     }
        //     r.inventory_by_type = function () {
        //         var inventory = data
        //         var type_sums = {}
        //         var roundedTypeSums = {}
        //
        //         _.map(inventory, function (item) {
        //             console.log(item.pnReportQuantity)
        //             if(!type_sums[item.inventorytypelabel]) type_sums[item.inventorytypelabel] = 0
        //              type_sums[item.inventorytypelabel] += item.pnReportQuantity
        //         })
        //         _.map(type_sums, function (value, key) {
        //             roundedTypeSums[key] = value.toFixed(2)
        //             console.log(value);
        //         })
        //         type_sums = roundedTypeSums
        //         console.log(type_sums);
        //         return {labels: _.keys(type_sums),
        //             data:  _.values(type_sums),
        //             colors: getColorsFor(type_sums),
        //             backUnits: 'g'
        //         }
        //     }
        //     if (!r[report]) return console.log('Error! No Format Function for ' + report);
        //     return r[report]()
        // },
        whatDataIsNeededForReport: function (report) {
            var r = {}
            r.outbound_transfers_by_vendor = function () {
                return ['outbound_transfers']
            }
            r.inventory_by_strain = function () {
                return ['inventory']
            }
            r.inventory_by_type = function () {
                return ['inventory']
            }
            if (!r[report]) return console.log('Error! No Report for ' + report);
            return r[report]()
        },
        // inventory_by_strain: function () {
        //     // var r = {}
        //     // r.labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
        //     // r.data =[12, 19, 3, 5, 2, 3]
        //     // return r
        // },
        // outbound_transfers_by_vendor: function () {
        //
        // }
    }

    return _pnChartData
}
