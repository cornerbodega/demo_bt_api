
var countryApp = angular.module('countryApp', [
'ngRoute', // Single-page Angular Routing
'ngMaterial', // Angular Material CSS Theme
'angular-loading-bar', // Loading bar for http requests
'firebase', // For AngularFire binding
'underscore', // For filtering, utility functions
'ng-uploadcare', // For cloud image upload
// 'pn-labs', //
'vs-repeat', // Virtual repeat for large lists
'ng-currency', // For prices
'formly', // For form abstractions
'ngResource', // For async data
'yaru22.angular-timeago',
'io-barcode',
'ngSanitize',
'bbModule',
'dndLists',
'bc.TelephoneFilter',
'angularTrix',
'angularUtils.directives.dirPagination',
'md.data.table',
// '',
]);
// console.log('%cpotnet.net', 'font-size:100px;color:#fff;text-shadow:0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px  0 #aaa, 0 6px 0 rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);')
prettyPrint('ABC Traceability', '', 70);

function prettyPrint(string, color, size) {
console.log('%c' + string, 'font-size:'+ (size || '100') + 'px;color:'+ (color || '#fff') + ';text-shadow:0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px  0 #aaa, 0 6px 0 rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);')
}

countryApp.config(function($routeProvider, $locationProvider) {
$locationProvider.hashPrefix('');
$routeProvider
// .when('/opportunities/notes', {
//     templateUrl: 'pnCalendar/opportunities/notes/notes.view.html',
//     controller: 'pnOpportunitiesNotesController',
// })
// .when('/opportunities', {
//     templateUrl: 'pnCalendar/opportunities/opportunities.view.html',
//     controller: 'pnOpportunitiesController',
// })
.when('/appointment', {
    templateUrl: 'pnCalendar/appointment/appointment.view.html',
    controller: 'pnAppointmentController',
})
.when('/traceability/settings/checkout/:id', {
    templateUrl: 'pnCheckout/checkout/checkout.view.html',
    controller: 'pnCheckoutController',
})
.when('/traceability/settings/select_plan/', {
    templateUrl: 'pnCheckout/select_plan/select_plan.view.html',
    controller: 'pnSelectPlanController',
})
.when('/abc_MSA', {
    templateUrl: 'pnMasterSubscriptionAgreement/master_subscription_agreement.view.html',
    controller: 'pnMasterSubscriptionAgreementController',
})
.when('/cdmenu', {
    templateUrl: 'pnCustomerDevelopment/menu/customer_development_menu.view.html',
    controller: 'pnCustomerDevelopmentMenuController',
})
.when('/customer_development/menu', {
    templateUrl: 'pnCustomerDevelopment/menu/customer_development_menu.view.html',
    controller: 'pnCustomerDevelopmentMenuController',
})
.when('/customer_development/sales_and_phone_by_license', {
    templateUrl: 'pnCustomerDevelopment/pnSalesAndPhoneByLicense/sales_and_phone_by_license.view.html',
    controller: 'pnSalesAndPhoneByLicenseController',

})
.when('/customer_development/pnBusinessModelCanvas', {
    templateUrl: 'pnCustomerDevelopment/pnBusinessModelCanvas/business_model_canvas.view.html',
    controller: 'pnBusinessModelCanvasController',
})

.when('/customer_development/pnCustomerDevelopmentChecklists', {
    templateUrl: 'pnCustomerDevelopment/pnCustomerDevelopmentChecklists/customer_development_checklists.view.html',
    controller: 'pnCustomerDevelopmentChecklistsController',
    resolve:{
        customerDevelopmentChecklistItems: function (pnDB) {
            return pnDB.getFromDB('select * from customerDevelopmentChecklistItems')
        }
    }
})
.when('/customer_development/book_notes', {
    templateUrl: 'pnCustomerDevelopment/book_notes/book_notes.view.html',
    controller: 'pnCustomerDevelopmentBookNotesController',
})
.when('/forum/topic/:topic_category/:topic_id', {
    templateUrl: 'pnForum/topic/topic.view.html',
    controller: 'pnTopicController',
})
.when('/forum/documentation', {
    templateUrl: 'pnForum/topics/forum-topics.view.html',
    controller: 'pnForumTopicsController',
})
.when('/forum/:topic_category/draft', {
    templateUrl: 'pnForum/draft/forum-draft.view.html',
    controller: 'pnForumDraftController',
})
.when('/forum/tips_tricks', {
    templateUrl: 'pnForum/topics/forum-topics.view.html',
    controller: 'pnForumTopicsController',
})

.when('/forum/feature_requests', {
    templateUrl: 'pnForum/topics/forum-topics.view.html',
    controller: 'pnForumTopicsController',
})
.when('/forum/bugs', {
    templateUrl: 'pnForum/topics/forum-topics.view.html',
    controller: 'pnForumTopicsController',
})

.when('/forum/how_do_i', {
    templateUrl: 'pnForum/topics/forum-topics.view.html',
    controller: 'pnForumTopicsController',
})

.when('/forum/news', {
    templateUrl: 'pnForum/topics/forum-topics.view.html',
    controller: 'pnForumTopicsController',
})

.when('/forum', {
    templateUrl: 'pnForum/splash/forum-splash.view.html',
    controller: 'pnForumSplashController',
})
.when('/traceability/usage', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/forum', {
    templateUrl: 'pnForum/splash/forum-splash.view.html',
    controller: 'pnForumSplashController',
})
.when('/forum/subscriptions/:email', {
    templateUrl: 'pnForum/subscription/forum-subscriptions.view.html',
    controller: 'pnForumSubscriptionsController',
})
.when('/forum/subscriptions', {
    templateUrl: 'pnForum/subscription/forum-subscriptions.view.html',
    controller: 'pnForumSubscriptionsController',
})
.when('/traceability/reports', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})

.when('/traceability/settings/sync', {
    templateUrl: 'Sync/sync.view.html',
    controller: 'SyncController'
})

.when('/terms', {
    templateUrl: 'Terms/terms.html'
})

.when('/traceability/labels3', {
    controller: 'pnLabels3Controller',
    templateUrl: 'pnLabels3/pnLabels3.view.html'
})
.when('/traceability/labels2', {
    controller: 'pnLabels2Controller',
    templateUrl: 'pnLabels2/pnLabels2.view.html'
})

.when('/print_labels', {
    controller: 'pnPrintLabelsPageController',
    templateUrl: 'pnPrint/pnPrintLabelsPage.view.html'
})
.when('/user_guide', {
    controller: 'UserManualController',
    templateUrl: 'UserManual/UserManual.view.html'
})
.when('/traceability/settings/user_guide', {
    controller: 'UserManualController',
    templateUrl: 'UserManual/UserManual.view.html'
})
.when('/subscriptionSuccessController',{
    templateUrl: 'pnSubscriptionSuccess/pnSubscriptionSuccess.view.html',
    controller: 'pnSubscriptionSuccessController'
})
// .when('/pnSubscribe',{
//     templateUrl: 'pnSubscriptionSuccess/pnSubscriptionSuccess.view.html',
//     controller: 'pnSubscriptionSuccessController'
// })
.when('/cctbeta2', {
    templateUrl: 'Splash/pnBetaSignUp/beta-sign-up.view.html',
    controller: 'pnBetaSignUpController',
    resolve: {
        affiliate: function() { return "David Portney at Cannabis Compliance Training"; },
        vendors: function(Vendors) {
            return Vendors.getVendorsFromDB();
        }
    }
})
.when('/betasignup', {
    templateUrl: 'Splash/pnBetaSignUp/beta-sign-up.view.html',
    controller: 'pnBetaSignUpController',
    resolve: {
        affiliate: function(){ return false; },
        vendors: function(Vendors) {
            return Vendors.getVendorsFromDB();
        }
    }
})
//  Sign Up
.when('/sign-up', {
    templateUrl: 'Splash/pnBetaSignUp/beta-sign-up.view.html',
    controller: 'pnBetaSignUpController',
    resolve: {
        affiliate: function(){ return false; },
        vendors: function(Vendors) {
            return Vendors.getVendorsFromDB();
        }
    }
})
.when('/log-in', {
    templateUrl: 'Splash/Log-In/log-in.view.html',
    controller: 'LogInController',
    resolve: {
        affiliate: function(){ return false; },
        vendors: function(Vendors) {
            return Vendors.getVendorsFromDB();
        }
    }
})
.when('/demo', {
    templateUrl: 'pnDemo/pnDemo.view.html',
    controller: 'pnDemoController',
    resolve: {
        affiliate: function(){ return false; },
        vendors: function(Vendors) {
            return Vendors.getVendorsFromDB();
        },
        demoCredentials: function () {
            return { username: "demo@abctraceability.com", password: "1AbcTraceabilityDemo!"}
        }
    }
})
.when('/', {
    templateUrl: 'abcSplash/abcSplash.view.html',
    controller: 'abcSplashController'

})
.when('/splash', {
    templateUrl: 'Splash/splash.view.html',
    controller: 'SplashController'
    // templateUrl: 'Landmazon/Landmazon.html',
    // controller: 'LandmazonController'
    // templateUrl: 'Sign-Up/Sign-Up.html',
    // controller: 'SignUpController',
})
.when('/traceability/settings/features', {
    templateUrl: 'Features/features.view.html',
    controller: 'FeaturesController'

})
.when('/traceability/location/users/user_add', { //
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/users/user_remove', { //
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/users', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/settings', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/timesheet', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/timesheet/browse_timesheet', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/timesheet/timesheet_entry_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/timesheet/timesheet_entry_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/timesheet/timesheet_entry_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})

// Labels
.when('/traceability/timesheet/view_labels', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/label_templates', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/labels', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/labels/generate_labels', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/label_view', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/label_templates/label_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/label_templates/label_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/label_templates/label_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/label_templates', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
// Page Templates
.when('/traceability/labels/page_templates', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/labels/page_templates/page_templates_view', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/page_templates/page_templates_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/page_templates/page_templates_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/labels/page_templates/page_templates_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})

// History
.when('/traceability/history', {
    templateUrl: 'History/history.view.html',
    controller: 'HistoryController',
})
.when('/traceability/settings/undo', {
    templateUrl: 'Undo/undo.view.html',
    controller: 'UndoController',
})
.when('/traceability/settings/billing', {
    templateUrl: 'Billing/billing.view.html',
    controller: 'BillingController',
})
.when('/traceability/settings/billing/my_billing_agreement', {
    templateUrl: 'Billing/MyBillingAgreement/my_billing_agreement.view.html',
    controller: 'MyBillingAgreementController',
})
.when('/traceability/settings/billing/my_membership', {
    templateUrl: 'Billing/MyMembership/my_membership.view.html',
    controller: 'MyMembershipController',
})
.when('/traceability/new_client', {
    templateUrl: 'Billing/NewClient/new_client_billing.view.html',
    controller: 'NewClientController',
})
.when('/traceability/new_client/payments', {
    templateUrl: 'Billing/Payments/payments.view.html',
    controller: 'PaymentsController',
})
.when('/traceability/settings/billing/cancel', {
    templateUrl: 'Billing/Cancel/cancel.view.html',
    controller: 'CancelController',
})
.when('/traceability/settings/billing/payments/payment-confirmation', {
    templateUrl: 'Billing/Payments/Confirmation/confirmation.view.html',
    controller: 'PaymentConfirmationController',
})
.when('/landmazon-login-successful', {
    templateUrl: 'Landmazon/landmazon-login-successful.html',
    controller: 'LandmazonLoginSuccessfulController',
})

.when('/landmazon/associate_traceability_credentials', {
    templateUrl: 'Landmazon/associate-credentials.html',
    controller: 'AssociateCredentialsController',
    // templateUrl: 'Traceability-Form/traceability-form.view.html',
    // controller: 'TraceabilityFormController',
    // templateUrl: 'Landmazon/new-user.html',
    // controller: 'LandmazonNewUserController',
})
.when('/traceability/settings/associate_traceability_credentials', {
    templateUrl: 'Landmazon/associate-credentials.html',
    controller: 'AssociateCredentialsController',
})
.when('/traceability/settings/logout', {
    templateUrl: 'Logout/logout.view.html',
    controller: 'LogoutController',
})
// .when('/publish', { // Page to create a new Want To Sell listing
//     templateUrl: 'Publish-Wts-Wizard/Publish-Wts-Wizard.html',
//     controller: 'PublishWtsWizardController',
// })
// .when('/product/:id', { // Product Detail page
//     templateUrl: 'Product/Product.html',
//     controller: 'ProductController',
//
// })
.when('/traceability/favorite_vendors', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/favorite_vendors/favorite_vendor_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/favorite_vendors/favorite_vendor_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/favorite_vendors/view_favorite_vendors', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/labs', {
    templateUrl: 'Labs/Labs.html',
    controller: 'LabsController',
})
.when('/labs/:id', {
    templateUrl: 'Labs/Labs-Detail.html',
    controller: 'LabsDetailController',
})
// .when('/market', {
//     templateUrl: 'Market/Market.html',
//     controller: 'MarketController',
// })
// .when('/market', { // View community posts page
//     templateUrl: 'Market/Market.html',
//     controller: 'MarketController',
// })
// .when('/landing', { // Sign up/ sign in/ demo login page
//     templateUrl: 'landing/landing.html',
//     controller: 'LandingController',
// })


//  BEGIN TRACEABILITY MERGE
// Main Traceability Menu
.when('/traceability/:sessionid', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/market', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/market/want_to_sell', {
    // templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    // controller: 'TraceabilityMenuController',
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/market/create/want_to_sell', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
// .when('/traceability/market/create/want_to_buy', {
//     templateUrl: 'Traceability-Form/traceability-form.view.html',
//     controller: 'TraceabilityFormController',
// })
.when('/traceability/market/browse_market', {
        templateUrl: 'Traceability-Form/traceability-browse.view.html',
        controller: 'TraceabilityFormController',
    // templateUrl: 'Market/want-to-sell.view.html',
    // controller: 'ViewAllWantToSellController',
    // templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    // controller: 'TraceabilityMenuController',
})
// .when('/traceability/market/all/for_sale', {
//     templateUrl: 'Market/want-to-sell.view.html',
//     controller: 'ViewAllWantToSellController',
// })
.when('/traceability/market/browse_market/request_manifest/:id', {
    templateUrl: 'Market/Request-Manifest/request-manifest.view.html',
    controller: 'RequestManifestController',
})
// .when('/traceability/market/all/want_to_buy_listings', {
//     templateUrl: 'Market/want-to-buy.view.html',
//     controller: 'ViewAllWantToBuyController',
// })
// .when('/traceability/market/mine', {
//     // templateUrl: 'Traceability-Menu/traceability-menu.view.html',
//     // controller: 'TraceabilityMenuController',
//     templateUrl: 'Market/want-to-sell.view.html',
//     controller: 'ViewMyWantToSellController',
// })
.when('/traceability/market/manifest_request_inbox', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',

    // templateUrl: 'Market/Respond-To-Manifest-Requests/respond-to-manifest-requests.view.html',
    // controller: 'RespondToManifestRequestsController',
})
.when('/traceability/market/manifest_request_inbox/generate_manifest_for_request', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
// .when('/traceability/market/mine/want_to_sell', {
//     templateUrl: 'Market/want-to-sell.view.html',
//     controller: 'ViewMyWantToSellController',
// })
// .when('/traceability/market/mine/want_to_buy', {
//     templateUrl: 'Market/want-to-buy.view.html',
//     controller: 'ViewMyWantToBuyController',
// })
.when('/traceability/help', {
    templateUrl: 'views/Help/Help.html',
    controller: 'HelpController',

})
.when('/traceability/sales', {
    templateUrl: 'views/history/History.html',
    controller: 'HistoryController',
})
.when('/traceability/tax_report', {
    templateUrl: 'views/history/History.html',
    controller: 'HistoryController',
})
.when('/traceability/location', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/transfers/outbound', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/transfers/outbound/browse_outbound_transfers', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/transfers', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
// .when('/traceability/inventory/qa_lab', {
//     templateUrl: 'Labs/Labs.html',
//     controller: 'LabsController',
// })
.when('/traceability/plants/plant_move', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_move', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_yield_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_convert_to_inventory', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_cure', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_waste_weigh', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_harvest', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_harvest_schedule', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_destroy', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_destroy_schedule', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/plant_destroy_schedule_undo', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/inventory_rooms/inventory_room_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',

})
.when('/traceability/location/rooms/inventory_rooms/inventory_room_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/inventory_rooms/inventory_room_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/plant_rooms/plant_room_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/plant_rooms/plant_room_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/plant_rooms/plant_room_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory_rooms/browse_inventory_rooms', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/inventory_rooms/browse_inventory_rooms', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/plant_rooms/browse_plant_rooms', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/rooms/inventory_rooms', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/location/rooms/plant_rooms', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/location/rooms', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/plants/plant_new', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/browse_plants', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/transfers/inbound', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/transfers/inbound/inventory_transfer_inbound', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/transfers/inbound/inventory_transfer_inbound_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/employees/employee_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/employees/employee_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/employees/employee_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/employees/browse_employees', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/vehicles/vehicle_remove', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',

})
.when('/admin', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/admin/clients', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/vehicles/vehicle_add', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/vehicles/browse_vehicles', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/location/vehicles', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/location/employees', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/manifests', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/manifests/modify_manifest', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/manifests/modify_manifest/inventory_manifest_modify', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})

.when('/traceability/manifests/modify_manifest/inventory_manifest_void_items', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/manifests/inventory_manifest_void', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/qa', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/transfers/outbound/inventory_transfer_outbound', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/transfers/outbound/inventory_transfer_outbound_return', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/transfers/outbound/inventory_transfer_outbound_void', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/manifests/inventory_manifest', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})


.when('/traceability/inventory', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
.when('/traceability/inventory/inventory_new', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_sample', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/qa/inventory_qa_sample_void', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/qa/inventory_qa_sample', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/qa/inventory_qa_sample_non_mandatory', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/qa/browse_qa_sample', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_destroy', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_convert', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_convert_undo', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_split', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/plants/inventory_create_lot', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_destroy_schedule_undo', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_destroy_schedule', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/inventory_adjust', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/inventory/browse_inventory', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/manifests/browse_manifests', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',
})
.when('/traceability/dashboard', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})

.when('/samples', {
    templateUrl: 'Traceability-Form/traceability-form.view.html',
    controller: 'TraceabilityFormController',
})

.when('/traceability/transfers/inbound/transfers_view_inbound', {
    templateUrl: 'Traceability-Form/traceability-browse.view.html',
    controller: 'TraceabilityFormController',

})
.when('/traceability', {
    templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    controller: 'TraceabilityMenuController',
})
// .when('/login', {
//     templateUrl: 'views/Landing/Landing.html',
//     controller: 'LoginController',
// })
// .when('/print_id/:id/:desc/:date', {
//     templateUrl: 'views/print.html',
//     controller: 'PrintController',
// })
.otherwise({
    redirectTo: '/'
});
});

countryApp.config(function($mdThemingProvider) {
$mdThemingProvider.theme('default')
// .primaryPalette('pink')
.accentPalette('orange');
});

function print(message) {
console.log(message);
};

function getdatestringfor (unixtime) {
// console.log(unixtime);
return new Date(unixtime * 1000).toLocaleDateString();
// return unixtime *
};

function gettimestring (unixtime) {
// console.log(unixtime);
return new Date(unixtime * 1000).toLocaleString();
// return unixtime *
};
// function getdatestringforDateNow (unixtime) {
//     // console.log(unixtime);
//     return new Date(unixtime).toLocaleDateString();
//     // return unixtime *
// };

function gettimestring (unixtime) {
// console.log(unixtime);
return new Date(unixtime * 1000).toLocaleString();
// return unixtime *
};

function isObject(obj) {
// console.log('isObject');
// console.log(obj);
// console.log(obj === Object(obj))
return obj === Object(obj);
};
function isNumber(n) {
// console.log(s);
// console.log(!isNaN(parseFloat(n)) && isFinite(n));
return !isNaN(parseFloat(n)) && isFinite(n);
}
function sortbykey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
});
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
