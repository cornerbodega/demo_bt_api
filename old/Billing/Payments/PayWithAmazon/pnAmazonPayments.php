<?php
namespace PayWithAmazon;
//
require_once 'Client.php';
require_once 'pnPayConfig.php';
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




$requestParameters['seller_id'] = 'A4KQK2W3E6C9U';
$requestParameters['charge_amount'] = $params["charge_amount"];
$requestParameters['currency_code'] = 'USD';
$requestParameters['authorization_reference_id'] = $params["authorizationReferenceId"];
$requestParameters['transaction_timeout'] = 0;
$requestParameters['capture_now'] = true; //`true` for Digital goods
$requestParameters['charge_note'] = 'Potnet.net Subscription';
$requestParameters['charge_order_id'] = $params["authorizationReferenceId"];
$requestParameters['store_name'] = 'Potnet.net';
// $requestParameters['custom_information'] = 'Any_Custom_String';
// $requestParameters['mws_auth_token'] = null;

// Get the Authorization response from the charge method
$response = $client->charge($requestParameters);



echo $response->toJson();

?>
