<?php

include "./../database.php";
// ob_start();
// echo "123!";
$params = json_decode(file_get_contents('php://input'),true);
// // $data = $params["request"];
// // $requestJSON = json_encode($data);
$email = $params["username"];
$password = $params["password"];
$ubi = $params["license_number"];
$user_id = $params["user_id"];
$name = $params["name"];
// echo "123!" . $name;
DB::insertUpdate('users', array(
  'email' => $email,
  'password' => $password,
  'ubi' => $ubi,
  'user_id' => $user_id,
  'name' => $name,
  // 'ubi' => $ubi,
  // 'age' => $age,
  // 'intelligence' => $intelligence
));
echo "User Set"
?>
