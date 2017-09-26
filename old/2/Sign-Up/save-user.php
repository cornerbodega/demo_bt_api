<?php

include "../Data-Model/php/database.php";
// ob_start();
$params = json_decode(file_get_contents('php://input'),true);
// $data = $params["request"];
// $requestJSON = json_encode($data);
$email = json_encode($params["username"]);
$password = json_encode($params["password"]);
$ubi = json_encode($params["license_number"]);


// $mysqli->query("SELECT * FROM login WHERE username='"
//   . $mysqli->real_escape_string($username) . "' AND password='"
//   . $mysqli->real_escape_string($password) . "'");


DB::insertUpdate('users', array(
  'email' => $email,
  'password' => $password,
  'ubi' => $ubi,
  // 'age' => $age,
  // 'intelligence' => $intelligence
));






// $conn = new mysqli($host, $dbun, $dbpw, $mydb);
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// $users_sql = "INSERT INTO `users` (`email`, `password`, `ubi`)
//     VALUES ('".$email."', '".$password."', '".$ubi."');" ;
// $conn->query($users_sql);
// echo "success " . "$email" . "  " . "$password". "  " . "$ubi " . $conn->query($users_sql);
?>
