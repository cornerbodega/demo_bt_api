<?php

$host="localhost"; // Host name
$dbun="potnetne_potuser"; // Mysql username
$dbpw="suzi99"; // Mysql password
$mydb="potnetne_potnet"; // Database name
// $mytbl="vendors"; // Table name
$time = time();

require_once 'meekrodb.2.3.class.php';
DB::$user = $dbun;
DB::$password = $dbpw;
DB::$dbName = $mydb;
?>
