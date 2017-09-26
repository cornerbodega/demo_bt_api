<?
/**
 * Licensed under Creative Commons 3.0 Attribution
 * Copyright Adam Wulf 2013
 */
$params = json_decode(file_get_contents('php://input'),true);

include("config.php");
include("include.classloader.php");

$classLoader->addToClasspath(ROOT);


$mysql = new MySQLConn(DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);

$db = new JSONtoMYSQL($mysql);

// create some json
$obj = $params["data"];
// $obj = json_decode('{"id":3,"asdf" : "asfd"}');

// save it to a table
// $db->save($obj, "apple_juice");
// echo $obj;
// echo array_values($obj);
$db->save($obj, "inventory");

foreach ($obj as $value) {

    // if (!is_null($value))
    // if (!empty($value)) {
    //     if !(is_array($value)) {
    // //     foreach($value as &$v) {
    // //         if (is_array($v)) {
    // //             $v = json_encode($v);
    // //             // echo "found an array";
    // //         }
    // //     }
    // //     // if (is_array($value)) {
    //     //     $value = json_encode($value);
    //     //     // echo "found an array";
    //     $db->save($value, $params["table"]);
    //     echo "saved! " .$value." ". $params["table"];
    //     }
    //     // echo $value;
    //
    // };
};
// echo json_encode($obj);


?>
