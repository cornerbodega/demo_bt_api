angular.module("countryApp")
.factory("pnStaticData", [
    pnStaticData
])

function pnStaticData() {

    var _pnStaticData = {
        marketingSampleType: function() {
            return [
                {
                    id: 2,
                    label:'Employee Sample'
                },
                {
                    id: 1,
                    label: 'Vendor Sample'
                },
                {
                    id: 0,
                    label: 'Sample for Consumption'
                }
            ]
        },
        manifestDeliveryTypes: function() {
            return [
                {
                    id: 0,
                    label: 'I will deliver'
                },
                {
                    id: 1,
                    label: 'Recipient will pick up'

                },
                // {
                //     id: 2,
                //     label: 'Third Party Transporter'
                // }
            ]
        },
        manifestDestinationTypes: function() {
            return [
                {
                    id: 0,
                    label: 'I-502 Vendor(s)'
                },
                {
                    id: 1,
                    label: 'QA Lab'

                },
                // {
                //     id: 2,
                //     label: 'Third Party Transporter'
                // }
            ]
        }
    }
    return  _pnStaticData

}
