<?php

// include "database.php";
include "./../database.php";

// ob_start();
$params = json_decode(file_get_contents('php://input'),true);

$ubi = $params["ubi"];

$result = DB::query("SELECT * FROM wtb_listings WHERE creator_ubi =%s ORDER BY `wtb_id` DESC", $ubi);
echo json_encode($result);


?>
