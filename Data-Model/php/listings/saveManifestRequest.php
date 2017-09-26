<?php

include "./../database.php";
// ob_start();
// echo "123!";
$params = json_decode(file_get_contents('php://input'),true);
// // $data = $params["request"];
// // $requestJSON = json_encode($data);
// echo "123!" . $params["item_id"];
// $req = array(
//    'item_id' => $params["item_id"],
//    'strain' => $params["strain"],
//    'image' => $params["image"],
//    'price' => $params["price"],
//    'item_type' => $params["item_type"],
//    'amount' => $params["amount"],
//    'cbd' => $params["cbd"],
//    'thc' => $params["thc"],
//    'creator_ubi' => $params["creator_ubi"],
//    'creator_amazon_user_id' => $params["creator_amazon_user_id"],
//    'at' => $params["at"]
// );
// echo json_encode($listing);
DB::insertUpdate('wts_manifest_requests', $params);
// DB::insertUpdate('wts_listings', array(
//     'item_id' => $params["item_id"];
//     'strain' => $params["strain"];
//     'image' => $params["image"];
//     'price' => $params["price"];
//     'item_type' => $params["item_type"];
//     'amount' => $params["amount"];
//     'cbd' => $params["cbd"];
//     'thc' => $params["thc"];
//     'creator_ubi' => $params["creator_ubi"];
//     'creator_amazon_user_id' => $params["creator_amazon_user_id"];
// ));
echo "WTS Listing Set"
?>
