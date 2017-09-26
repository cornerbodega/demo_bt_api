<?php

$host="localhost"; // Host name
$dbun="merhone_potuser"; // Mysql username
$dbpw="suzi99"; // Mysql password
$mydb="merhone_bt_demo_db"; // Database name
// $mytbl="vendors"; // Table name
$time = time();

require_once 'meekrodb.2.3.class.php';
DB::$user = $dbun;
DB::$password = $dbpw;
DB::$dbName = $mydb;
?>
