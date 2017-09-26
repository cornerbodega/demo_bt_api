<?php

// include "database.php";
include "./../database.php";

// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

$user_id = $params["user_id"];


$result = DB::query("SELECT * FROM users WHERE user_id =%s", $user_id);
echo json_encode($result);
// DB::insertUpdate('users', array(
//   'email' => $email,
//   'password' => $password,
//   'ubi' => $ubi,
//   // 'age' => $age,
//   // 'intelligence' => $intelligence
// ));

?>
