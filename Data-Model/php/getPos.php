<?php

// include "database.php";
include "database.php";

// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

$ubi = json_encode($params["ubi"]);


$result = DB::query("SELECT data FROM brs_pos WHERE ubi=%s", $ubi);
echo json_encode($result);
// DB::insertUpdate('users', array(
//   'email' => $email,
//   'password' => $password,
//   'ubi' => $ubi,
//   // 'age' => $age,
//   // 'intelligence' => $intelligence
// ));

?>
