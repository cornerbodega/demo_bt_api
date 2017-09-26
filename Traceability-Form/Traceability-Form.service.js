(function(){
    angular
    .module('countryApp')

    .factory('TraceabilityFormService', TraceabilityFormService )

    function TraceabilityFormService(
        $location,
        FormDataService,
        FormRequestFormatter,
        FormConfirmAndSubmit,
        MarketSubmitService
    ) {
        return {
            task: function (path) {
                console.log(path);
                var p = path.split('/')
                var task = p[p.length-1];
                console.log(task);
                if (!task) return console.log('No task');
                return task
            },
            fields: function (path) {
                return FormDataService.getForm(this.task(path))
            },
            onSubmit: function ($event, path, model, fields) {
                console.log(sessionStorage.taxPayer);

                // Tax Collecter! Make sure they've paid!
                if (sessionStorage.taxPayer==='false') {

                    console.log('NOT A TAXPAYER ... YET!');
                    return $location.path('/traceability/new_client')
                }

                // If so, Format and Submit Services - proceed to format and submit their request

                model.action = this.task(path)

                var request = FormRequestFormatter(model)

                // Non-Traceability Actions. Don't send to the LCB.
                if(_.contains([
                    'want_to_sell',
                    'want_to_buy',
                    'timesheet_entry_add',
                    'timesheet_entry_remove',
                    'favorite_vendor_add',
                    'favorite_vendor_remove',
                    'page_templates_add',
                    'page_templates_remove',
                    'page_templates_modify',
                    'label_add',
                    'label_remove',
                    'label_modify',
                ], model.action)) {
                    MarketSubmitService.submit(request)
                }
                else {
                    FormConfirmAndSubmit.showDialog($event, request, fields)
                }


                // console.log(JSON.stringify(request));
            }
        }
    }



})();
