<?php
ob_start();

$params = json_decode(file_get_contents('php://input'),true);

$curl = curl_init();

$data = $params["data"];
$requestJSON = json_encode($data);
$url = $params["url"];



curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => $requestJSON,
    CURLOPT_HTTPHEADER => array(
        "content-type: application/json"
    ),
));
//
$response = curl_exec($curl);
$err = curl_error($curl);
//
if ($err) {
    echo "cURL Error #:" . $err . " " . $url;
} else {
    echo $response;
};
?>
