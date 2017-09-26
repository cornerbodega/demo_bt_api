<?php

include "./../database.php";
// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

// $ = json_encode($params["at"]);
$data = json_encode($params["data"]);

// $result = DB::query("SELECT data FROM brs_pos WHERE ubi=%s", $ubi);
// echo json_encode($result);
DB::insertUpdate('businesses', array(
  'data' => $data,
  '_id' => 0,
  // 'age' => $age,
  // 'intelligence' => $intelligence
));
echo $data
?>
