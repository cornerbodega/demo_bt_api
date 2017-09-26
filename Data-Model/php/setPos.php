<?php

include "database.php";
// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

$ubi = json_encode($params["ubi"]);
$data = $params["data"];

// $result = DB::query("SELECT data FROM brs_pos WHERE ubi=%s", $ubi);
// echo json_encode($result);
DB::insertUpdate('brs_pos', array(
  'ubi' => $ubi,
  'data' => $data,
  // 'ubi' => $ubi,
  // 'age' => $age,
  // 'intelligence' => $intelligence
));
echo "Pos Set"
?>
