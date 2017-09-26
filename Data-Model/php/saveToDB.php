<?php

// include "database.php";
include "./database.php";

// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

// $ubi = $params["ubi"];
DB::insertUpdate($params["table"], $params["data"]);

// $result = DB::query($params["query"]);
// echo json_encode($result);
echo "save to ".$params["table"]." complete"
 
?>
