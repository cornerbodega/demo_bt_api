angular.module("countryApp").factory("MarketSubmitService", MarketSubmitService)

function MarketSubmitService(
    $location,
    pnDB,
    pnDialog,
    Timesheet,
    MyTimesheet,
    FavoriteVendors,
    PageTemplates,
    MyLabels,
    $q
){
    return {
        submit: submit
    }

    function submit(request) {
        if(request.action==="label_modify") {
            console.log(request);
            return MyLabels.modifyLabel(request).then(function(){
                pnDialog.message("Success! Label has been updated in the system.")
                MyLabels.init()
            })
        }
        if(request.action==="label_remove") {
            console.log(request);
            return MyLabels.removeLabel(request.id).then(function(){
                pnDialog.message("Success! Label removed from the system.")
                MyLabels.init()
            })
        }
        if(request.action==="label_add") {
            return MyLabels.addLabel(request).then(function(){
                pnDialog.message("Success! Label entered into the system.")
                MyLabels.init()
            })
        }
        if(request.action==="page_templates_modify") {
            return PageTemplates.addPageTemplate(request)
            .then(function(){
                pnDialog.message("Success! Page Template modifications have been saved in the system.")
                PageTemplates.init()
            })
        }
        if(request.action==="page_templates_remove") {
            return PageTemplates.remove(request.id)
            .then(function(res){
                console.log(res);
                pnDialog.message("Success! Page Template has been removed.")
                PageTemplates.init()
            })
        }
        if(request.action==="page_templates_add") {
            // console.log(request);
            // delete request.action
            //  pnDB.saveToDB('page_templates', request)
            return PageTemplates.addPageTemplate().then(function(res){
                console.log(res);
                pnDialog.message("Success! Page Template has been created.")
                PageTemplates.init()
            })

        }
        if(request.action === "favorite_vendor_remove") {
            var locations = _.pluck(request.favorite_vendors, 'location')
            var a = _.map(locations, function(loc){
                return pnDB.saveToDB('favorite_vendors', {
                    id: sessionStorage.myLocation + loc,
                    deleted: 1
                })
            })
            return $q.all(a).then(function (res) {
                console.log(res);
                // console.log('Timesheet Saved');
                FavoriteVendors.init().then(function(){ pnDialog.message("Removal Successfull")})



            });
        }
        if(request.action==="favorite_vendor_add") {
            var a = _.map(request.vendors, function(v) {
                return pnDB.saveToDB('favorite_vendors', {
                    favoriter: sessionStorage.myLocation,
                    favorited: v.location,
                    id: sessionStorage.myLocation + v.location,
                    deleted: 0
                })
            })
            var names = _.pluck(request.vendors, 'vendorName')
            console.log(names);
            var names_string = ""
            _.map(names, function(n){
                names_string += n
                if (n != names[names.length-1]) names_string +=', '

            })
            return $q.all(a).then(function (res) {
                console.log(res);
                pnDialog.message("Success! " + names_string + ' have been added to Favorite Vendors.')
                FavoriteVendors.init()

            })
        }
        if (request.action==="want_to_sell") {
            return pnDB.saveWantToSellListings(request.new_want_to_sell_listings).then(function (res) {
                console.log(res);
                $location.path('/traceability/market/browse_market');
            });
        }
        if (request.action==="timesheet_entry_add") {
            return pnDB.saveToDB('timesheet', {
                ubi: sessionStorage.ubi,
                name: request.name,
                time_in: request.time_in,
                time_out: request.time_out,
                time_out: request.time_out,
                hours_worked: request.hours_worked,
                username: request.username,
                at: request.at
            }).then(function (res) {
                console.log(res);
                // console.log('Timesheet Saved');
                pnDialog.message("Success! " +request.hours_worked + " hours logged for "+ request.name)
                Timesheet.init()
                MyTimesheet.init()
                // $location.path('/traceability/market/browse_market');
            });
        }
        if (request.action==="timesheet_entry_remove") {
            return pnDB.saveToDB('timesheet', {
                id: request.timesheet.id,
                deleted: 1
            }).then(function (res) {
                console.log(res);
                // console.log('Timesheet Saved');
                pnDialog.message("Entry Removed Successfully")
                Timesheet.init()
                MyTimesheet.init()
                // $location.path('/traceability/market/browse_market');
            });
        }
        else {
            return console.log('ERROR!!! UNHANDLED ACTION: ' + request.action);
        }
        // if (request.action==="want_to_buy") {
        //     pnDB.saveWantToBuyListing(request).then(function (res) {
        //         $location.path('/traceability/market/mine/want_to_buy');
        //     });
        // }
    };

    // function pnDialog


};
