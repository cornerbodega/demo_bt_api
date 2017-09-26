<?php
$params = json_decode(file_get_contents('php://input'),true);

// echo $params['access_token'];
// verify that the access token belongs to us
$c = curl_init('https://api.amazon.com/auth/o2/tokeninfo?access_token=' . urlencode($params['access_token']));
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

$r = curl_exec($c);
curl_close($c);
$d = json_decode($r);

if ($d->aud != 'amzn1.application-oa2-client.7036efc75e4a44188c6383a265f079f1') {
  // the access token does not belong to us
  header('HTTP/1.1 404 Not Found');
  echo 'Page not found';
  exit;
}

// exchange the access token for user profile
$c = curl_init('https://api.amazon.com/user/profile');
curl_setopt($c, CURLOPT_HTTPHEADER, array('Authorization: bearer ' . $params['access_token']));
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

$r = curl_exec($c);
curl_close($c);

echo $r;
?>
