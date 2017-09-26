<?php

include "./../database.php";
require_once("./../lib/PHPExcel_1.7.9/Classes/PHPExcel.php");
ob_start();
$params = json_decode(file_get_contents('php://input'),true);

$url = $params["url"];

// $dbresult = DB::query("SELECT data FROM pn_vendors");
// echo json_encode($dbresult);
//

// $excelFile = './eia/psw01_2016-01-28_17.19.50.xls';
//
// // Create new PHPExcel object
$excelFile = "applicants.xls";

$objPHPExcel = new PHPExcel();

file_put_contents($excelFile, fopen($url, 'r'));
// echo $objPHPExcel;
//
// //  Read your Excel workbook
try
{
    $inputFileType = PHPExcel_IOFactory::identify($excelFile);
    $objReader = PHPExcel_IOFactory::createReader($inputFileType);
    $objPHPExcel = $objReader->load($excelFile);
}
catch(Exception $e)
{
    die('Error loading file "'.pathinfo($excelFile,PATHINFO_BASENAME).'": '.$e->getMessage());
}

$producers_file = './csv/producers.csv';
$processors_file = './csv/processors.csv';
$retailers_file = './csv/retailers.csv';
$medical_file = './csv/medical.csv';
// // Export to CSV file.
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
$objWriter->setSheetIndex(0);   // Select which sheet.
$objWriter->setDelimiter(';');  // Define delimiter
$objWriter->save($producers_file);
$objWriter->setSheetIndex(1);   // Select which sheet.
$objWriter->save($processors_file);
$objWriter->setSheetIndex(2);   // Select which sheet.
$objWriter->save($retailers_file);
$objWriter->setSheetIndex(3);   // Select which sheet.
$objWriter->save($medical_file);

echo "done writing applicant csv files";
?>
