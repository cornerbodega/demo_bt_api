<?php


ob_start();
$params = json_decode(file_get_contents('php://input'),true);

$curl = curl_init();

$data = $params["request"];
$requestJSON = json_encode($data);
// $user = $params["user"];
// $email = json_encode($user["email"]);
$ubi = json_encode($user["ubi"]);

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://wslcb.mjtraceability.com/serverjson.asp",
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

$response = curl_exec($curl);
$err = curl_error($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;

}
curl_close($curl);
