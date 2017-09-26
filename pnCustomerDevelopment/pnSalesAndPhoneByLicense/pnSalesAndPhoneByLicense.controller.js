angular.module('countryApp')
.controller('pnSalesAndPhoneByLicenseController', pnSalesAndPhoneByLicenseController)

function pnSalesAndPhoneByLicenseController($scope, pnDB, Vendors, $rootScope, pnBrowseClick, pnItemNotes) {

    if(!sessionStorage.ubi) sessionStorage.ubi = '603347225'

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

    $scope.browseClick = pnBrowseClick

    getModelFromDB()
    $scope.selected = [];
    $scope.query = {
       order: 'name',
       limit: 5,
       page: 1
     };
     $scope.myOrder = {}
    //  $scope.getProspects = function () {
    //     //  $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    //     $scope.promise = getModelFromDB($scope.query, success).$promise;
    //  };
    function getModelFromDB(q, s) {
        return pnDB.getFromDB('select * from prospects_master')
        .then(success)

    }

    function success(res) {
        console.log(res);
        $scope.prospects = res.data.sort(firstBy("type", -1).thenBy(function (v) {
            return +v.producerAvgSalesById
        }, -1))
        $scope.pnData = true

    }
    // UNCOMMENT TO REFRESH DATA
    // refresh()
    $scope.$on('pnData', saveModelToDB)

    function saveModelToDB() {
        var vendorsModel = []
        $scope.vendors.map(function (vendor, i) {
            var model = {}
            model.id = i
            model.vendorName            = vendor.vendorName
            model.producerSalesById     = $scope.producerSalesById[vendor.location]
            model.producerAvgSalesById  = $scope.producerAvgSalesById[vendor.location]
            model.producerNumMonthsById = $scope.producerNumMonthsById[vendor.location]
            model.type                  = vendor.type
            model.license               = vendor.location
            model.phone                 = $scope.phoneModelById[vendor.location]
            vendorsModel.push(model)
            pnDB.saveToDB('prospects_master', model).then(function (res) {
                console.log(res);
            })
        })

        console.log(vendorsModel);
    }
    function refresh(){

        $scope.producerSalesById = {}
        $scope.producerAvgSalesById = {}
        $scope.producerNumMonthsById = {}
        $scope.vendorsById = {}
        $scope.phoneModelById = {}
        $scope.statusModelById = {}
        $scope.dateCreatedById = {}

        if (!Vendors.data) Vendors.init()
        if($scope.vendors) $scope.pnData = true
        $scope.$on('vendors', function () {
            $scope.vendors = sortVendorsByLocationType(Vendors.data)

            // console.log(Vendors);
            var inString = '('
            _.map($scope.vendors, function (vendor) {
                // console.log(vendor);
                if (vendor.location=='412600') {
                    console.log('FOUND IT!!');
                    console.log(vendor);

            }
                $scope.vendorsById[vendor.location] = vendor
                inString += '"'+vendor.location + '",'
                // getProducerSalesByLicense(vendor.location)

            })
            // console.log($scope.vendorsById['412600']);
            inString = inString.slice(0, -1) + ')'
            getProducerSalesByLicense(inString)

            getPhoneByLicense(inString)


            function sortVendorsByLocationType(vendors) {
                console.log(vendors);
                return _.sortBy(vendors, 'locationtype')
            }
        })



        function getProducerSalesByLicense(inString) {
            // console.log(inString);
            // pnDB.getFromDB('select license, totalSales from sales_043017 where license in '+inString+' and period = "4/1/2017 - 4/30/2017"')
            pnDB.getFromDB('select license, totalSales from sales_043017 where license in '+inString)
            .then(function (res) {
                console.log(res.data);
    //
                // $scope.producerSales = res.data
                _.map(res.data, function (d) {
                    // console.log(d);
                    if (!$scope.producerSalesById[d.license]) $scope.producerSalesById[d.license] = 0
                    if (!$scope.producerNumMonthsById[d.license]) $scope.producerNumMonthsById[d.license] = 0
                    $scope.producerNumMonthsById[d.license]++
                    $scope.producerSalesById[d.license] += +d.totalSales

                    // console.log($scope.producerSalesById[d.license]);
                })
                _.map($scope.producerSalesById, function (sales, id) {
                    $scope.producerAvgSalesById[id] = sales / $scope.producerNumMonthsById[id]
                })

                $scope.vendors = _.filter($scope.vendors, function (v) {
                    // console.log(v.phone);
                    return !!$scope.producerSalesById[v.location]

                })
                $scope.pnData = true
                $rootScope.$broadcast('pnData')
                // global [lcoaton]
            })


        }

        function getPhoneByLicense(inString) {
            pnDB.getFromDB('select license, phone, status, DateCreated from applicants_043017 where license in '+inString)
            .then(function (res) {
                // console.log(res.data);
                _.map(res.data, function (d) {

                    $scope.phoneModelById[d.license] = d.phone
                    $scope.statusModelById[d.license] = d.status

                    $scope.dateCreatedById[d.license] = new Date(d.DateCreated.substring(0,4) +' '+ d.DateCreated.substring(5,6)  +' '+ d.DateCreated.substring(7,8)).toLocaleString()
                })


                $scope.vendors = _.filter($scope.vendors, function (v) {
                    // console.log(v.phone);
                    return !!$scope.phoneModelById[v.location]

                })
                $scope.vendors = _.filter($scope.vendors, function (v) {
                    // console.log(v.phone);
                    return $scope.statusModelById[v.location] != 'CLOSED (PERMANENT)'

                })


            })


        }

    }

}
