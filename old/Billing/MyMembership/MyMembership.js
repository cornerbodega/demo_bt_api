angular.module("countryApp")
.controller("MyMembershipController", MyMembershipController)

function MyMembershipController(
    $scope,
    $location,
    OfficeOfTheTaxCollecter,
    pnDaysFilter,
    pnDB
) {

    $scope.daysLeft = OfficeOfTheTaxCollecter.daysLeft
    $scope.$on('daysLeft', function(event, d){
        $scope.daysLeft = d
        console.log($scope.daysLeft);
    });
    $scope.ubi = sessionStorage.ubi
    pnDB.getFromDB("select * from billing where status='subscribed' and ubi='"+sessionStorage.ubi+"'")
    .then(init)
    function init(res) {
        console.log(res.data[0]);
        $scope.myMembership = res.data[0]
        // $scope.daysLeft =     $scope.myMembership.at


        $scope.authorizationReferenceId = $scope.myMembership.authorizationReferenceId

    }
    $scope.toCancel = function() {
        $location.path('/traceability/settings/billing/cancel')
    }

}
