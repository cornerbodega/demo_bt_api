<?php
namespace PayWithAmazon;
require_once 'pnPayConfig.php';

require_once 'Client.php';
// // Your Login and Pay with Amazon keys are available in your Seller Central account
$params = json_decode(file_get_contents('php://input'),true);
ob_start();
// PHP Associative array

// JSON file path
// $config = 'PATH_TO_JSON_FILE';

// Instantiate the client class with the config type
$client = new Client($config);
// // $client->setSandbox(true);
$requestParameters['amazon_billing_agreement_id'] = $params["amazonBillingAgreementId"];




$requestParameters['merchant_id'] = 'A4KQK2W3E6C9U';
// $requestParameters['closure_reason'] = 'Cancelled Subscription';

// $requestParameters['charge_amount'] = '100';
// $requestParameters['currency_code'] = 'USD';
// $requestParameters['authorization_reference_id'] = $params["authorizationReferenceId"];
$requestParameters['transaction_timeout'] = 0;
// $requestParameters['capture_now'] = true; //`true` for Digital goods
// $requestParameters['charge_note'] = 'Potnet.net Subscription';
// $requestParameters['charge_order_id'] = $params["authorizationReferenceId"];
// $requestParameters['store_name'] = 'Potnet.net';
// $requestParameters['custom_information'] = 'Any_Custom_String';
// $requestParameters['mws_auth_token'] = null;

// Get the Authorization response from the charge method
$response = $client->GetBillingAgreementDetails($requestParameters);

// &AmazonBillingAgreementId=C01-8824045-7416542
// &ClosureReason=Closing%20OR%20for%20Test
// &Action=CloseBillingAgreement
// &SellerId=YOUR_SELLER_ID_HERE
// &SignatureMethod=HmacSHA256
// &SignatureVersion=2
// &Timestamp=2013-12-11T12%3A32%3A42.000Z
// &Version=2013-01-01
// &Signature=yrpMpoDfGLu567t611z27v4yJ8SURIVMKcy26sJrwYc%3D

echo $response->toJson();

?>
