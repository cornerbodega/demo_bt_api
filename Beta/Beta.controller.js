angular.module("countryApp")
.controller("BetaController", BetaController)

function BetaController($scope,
    affiliate,
    vendors,
    Vendors,
    FieldDataService,
    pnMail,
    pnDB
){
    $scope.affiliate = affiliate
    $scope.vendors = Vendors.data

    $scope.model = {};
    $scope.fields = [
        {
            label: 'Name',
            key: 'name',
            type: 'text'
        },
        {
            label: 'Email',
            key: 'email',
            type: 'email'
        },
        // {
        //     label: 'Phone',
        //     key: 'phone',
        //     type: 'text'
        // },
        // {
        //     label: 'UBI',
        //     key: 'license_number',
        //     type: 'text'
        // },

    ];
    $scope.selectedItemChange = function(vendor) {
        if(!vendor) return $scope.model.license_number = false
        $scope.model.license_number = vendor.ubi
        $scope.model.companyName = vendor.name
    };

    $scope.querySearch = function(query) {
        // console.log(query);
        if (!$scope.vendors) return []
        return _.map($scope.vendors.filter(createFilterFor(query)),function(vendor){return {name: vendor.name, ubi: vendor.ubi}})
        // return ""
    }
    function createFilterFor(query) {
        var lowercaseQuery = angular.uppercase(query);
        return function filterFn(vendor) {
            // console.log(vendor);
            // console.log(vendor);
            // console.log(lowercaseQuery);
            vendor.name = angular.uppercase(vendor.name)
            return (vendor.name.indexOf(lowercaseQuery) !== -1);
        };
    }
    function isValid() {
        if (!$scope.model.license_number) {
            $scope.error = "Please select your 502 business"
            return false
        }
        if (!$scope.model.name) {
            $scope.error = "Please enter your name"
            return false
        }
        if (!$scope.model.email) {
            $scope.error = "Please enter your email address"
            return false
        }

        // console.log($scope.model);
        $scope.error = false
        return true
    }

    $scope.submitButton = { icon: 'fa-pencil-square-o', label: 'Sign Up for Beta' }
    $scope.signUpForBeta = function() {

        if (!isValid()) return
        
        //
        // pnMail.sendEmail({
        //     fromEmail: "marvin@potnet.net",
        //     fromName: "Potnet.net",
        //     templateUrl: "beta_welcome.html",
        //     subject: "Potnet.net Beta Access",
        //     toEmail: $scope.model.email,
        //     toName: $scope.model.name,
        //     companyName: $scope.model.companyName,
        //     companyUbi: $scope.model.companyUbi
        // })

        // pnDB.saveToDB('beta_users', {
        //     email: $scope.model.toEmail,
        //     name: $scope.model.name,
        //     companyName: $scope.model.companyName,
        //     ubi: $scope.model.license_number,
        //     at: Date.now()
        // })
        // $scope.success = "Thanks "+$scope.model.name+"! We sent a welcome email with a link to the beta to " + $scope.model.email
        //


        // Validate Form
        // If Valid
        // Save this data to beta_users table
        // Send an email to beta users with link to log in page

        // popup with an email has been sent to form.email containing a link to the Sign In Page.

    }

}
