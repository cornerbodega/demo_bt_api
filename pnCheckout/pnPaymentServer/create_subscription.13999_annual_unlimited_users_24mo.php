<?php // Create a customer using a Stripe token

// If you're using Composer, use Composer's autoload:
require_once('../stripe-php-master/init.php');


// Be sure to replace this with your actual test API key
// (switch to the live key later)
\Stripe\Stripe::setApiKey("sk_test_wJq9Uvyw1Auc25rU96HZ5cfD");

try
{
  $customer = \Stripe\Customer::create(array(
    'email' => $_POST['stripeEmail'],
    'source'  => $_POST['stripeToken'],
  ));
  // echo "success"

  \Stripe\Subscription::create(array(
      "customer" => $customer->id,
      'plan' => '13999_annual_unlimited_users_24mo'
  ));
  include "../../Data-Model/php/database.php";
  $data = array(
      'data' => array(
          'email' => $_POST['stripeEmail'],
          'customer' => $customer->id,
          'plan' => '13999_monthly_unlimited_users_24mo'
      ),
      'table' => 'stripe_subscribers'
  );


  DB::insertUpdate($data["table"], $data["data"]);

  header('Location: thankyou.html');

  // header('Location: https://abctraceability.com/wa/#/traceability/' . $_POST['sessionid']);
  exit;
}
catch(Exception $e)
{
  header('Location:oops.html');
  error_log("unable to sign up customer:" . $_POST['stripeEmail'].
    ", error:" . $e->getMessage());
}
