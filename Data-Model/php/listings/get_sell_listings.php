<?php

include "./../database.php";

$params = json_decode(file_get_contents('php://input'),true);


$result = DB::query("SELECT * FROM wts_listings WHERE 1 ORDER BY `at` DESC");
echo json_encode($result);


?>
