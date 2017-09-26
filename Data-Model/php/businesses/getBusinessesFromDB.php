<?php

include "./../database.php";

$result = DB::query("SELECT data FROM businesses WHERE 1");
echo json_encode($result);


?>
