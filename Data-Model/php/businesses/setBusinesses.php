<?php

include "./../database.php";

ob_start();
$params = json_decode(file_get_contents('php://input'),true);



// $dbresult = DB::query("SELECT data FROM pn_vendors");
// echo json_encode($dbresult);
//

// $excelFile = './eia/psw01_2016-01-28_17.19.50.xls';
//
// // Create new PHPExcel object

$producers_file = './csv/producers.csv';
$processors_file = './csv/processors.csv';
$retailers_file = './csv/retailers.csv';
$medical_file = './csv/medical.csv';

$producers = array_map('str_getcsv', file($producers_file));
$processors = array_map('str_getcsv', file($processors_file));
$retailers = array_map('str_getcsv', file($retailers_file));
$medical = array_map('str_getcsv', file($medical_file));

$file=$producers_file;
$csv= file_get_contents($file);
$array = array_map("str_getcsv", explode("\n", $csv));
$json = json_encode($array);
// print_r($json);
echo $json;

// LOAD DATA INFILE $producers_file
//  INTO TABLE 'producers'
//  FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"'
//  LINES TERMINATED BY '\n'
// (
// name,
// license,
// ubi,
// )
// set
// (
// field4 = concat(@variable1,@variable2)
// );
// echo json_encode($producers[0]);
// echo json_encode($producers[1]);
// echo json_encode($producers[2]);

// echo json_encode($producers);
// echo array_values($producers);
// $applicants = array(
//     'producers' => json_encode($producers),
//     'processors' => json_encode($processors),
//     'retailers' => json_encode($retailers),
//     'medical' => json_encode($medical)
// );

// echo json_encode($applicants);

// DB::insertUpdate('users', array(
//   'email' => $email,
//   'password' => $password,
//   'ubi' => $ubi,
//   // 'age' => $age,
//   // 'intelligence' => $intelligence
// ));

?>
