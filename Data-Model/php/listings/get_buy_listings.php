<?php

// include "database.php";
include "./../database.php";

// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

// $ubi = $params["ubi"];

$result = DB::query("SELECT * FROM wtb_listings WHERE 1");
echo json_encode($result);


?>
