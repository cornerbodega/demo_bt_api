angular.module('countryApp')
.factory('pnSubscriptionPlans', pnSubscriptionPlans)

function pnSubscriptionPlans () {
    return [
        { label: '$139.99 per month (24-month service agreement, billed annually)', id: '13999_annual_unlimited_users_24mo', price: 13999, orderTerm: 24, billingTerm: 12},
        { label: '$149.99 per month (24-month service agreement, billed monthly)',  id: '14999_monthly_unlimited_users_24mo', price: 14999, orderTerm: 24,  billingTerm: 1 },

    ];
}
