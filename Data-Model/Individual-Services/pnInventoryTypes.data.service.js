angular.module("countryApp")
.factory("pnInventoryTypes", pnInventoryTypes)

function pnInventoryTypes(pnDB, $rootScope) {
    var _w = {
        init: init,
    };

    init();

    function init() {
        var invmap = {
            5: {label:'Kief', weighable:true},
            6: {label: 'Flower', weighable:true},
            7: {label: 'Clone', weighable: true},
            9: {label: 'Other Plant Material', weighable: true},
            10: {label: 'Seed', weighable: false, seed: true},
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
            22: {label: 'Solid Infused Edible', weighable: false},
            23: {label: 'Liquid Infused Edible', weighable: false},
            24: {label: 'Extract for Inhalation', weighable: false},
            25: {label: 'Infused Topicals', weighable: false},
            26: {label: 'Sample Jar', weighable: false},
            27: {label: 'Waste', weighable: true},
            28: {label: 'Usable Flower', weighable: false},
            29: {label: 'Wet Flower', weighable: true},
            30: {label: 'Marijuana Mix', weighable: true},
            31: {label: 'Marijuana Mix Packaged', weighable: false},
            32: {label: 'Marijuana Mix Infused', weighable: false}
        }
        var t = []
        _.map(invmap, function(val, key){
            t.push({id: key, label: val.label})
        })
        _w.data = t
        // pnDB.getFromDB('select * from pnInventoryTypes where ubi="'+sessionStorage.ubi+'" and deleted <> "1" order by `at` desc')
        // .then(function(res){
        //     console.log(res);
        //     var times = []
        //     _.map(res.data, function(d){
        //         console.log(d.time_in);
        //         d.time_in = new Date(d.time_in).toLocaleString().replace(/,/g, '')
        //         d.time_out = new Date(d.time_out).toLocaleString().replace(/,/g, '')
        //         console.log(new Date(d.time_in));
        //         times.push(d)
        //     })
        //     // console.log(res.data.time_in);
        //     // console.log(res.data.time_in);
        //     _w.data =times
        //     console.log(_w.data);
        //     $rootScope.$broadcast('pnInventoryTypes')
        //
        // })
        //
    }



    return _w;
}
// function getDetailsForBillingAgreement(amazonBillingAgreementId) {
//     return pnProxy("https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnGetBillingAgreementDetails.php",
//     {amazonBillingAgreementId: amazonBillingAgreementId})
// }
// function getMyBillingAgreement() {
//     return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed"')
// }
