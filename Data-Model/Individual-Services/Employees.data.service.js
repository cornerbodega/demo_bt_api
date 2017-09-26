angular.module("countryApp")
.factory("Employees", [
    'pnPost',
    '$rootScope',
    Employees,
])

function Employees(pnPost, $rootScope) {
    var _employees = {
        init: init
    };

    function init() {
        var _raw = {}
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'employee', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            _employees.data = formatEmployees(res.data.employee);
            console.log(_employees.data);

            $rootScope.$broadcast('employees');
        })
    }
    // console.log(pnPost);


    function formatEmployees(employee){
        // var employees = []
        _.map(employee, function(e) {
            e.label = e.employee_name
            e.id = e.employee_id
            e.birthday = e.birthmonth + '/'+ e.birthday + '/' + e.birthyear
            e.hireday = e.hiremonth + '/'+ e.hireday + '/' + e.hireyear
            // {id: 'birthday', label: 'Day Born'},
            // {id: 'birthyear', label: 'Year Born'},
            // {id: 'birthmonth', label: 'Month Born'},
            // {id: 'hireyear', label: 'Year Hired'},
            // {id: 'hiremonth', label: 'Month Hired'},
            // {id: 'hireday', label: 'Day Hired'},
        })
        return employee
    };

    return _employees;

};
