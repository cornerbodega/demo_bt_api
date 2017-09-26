<?php

$params = json_decode(file_get_contents("php://input"), true);

echo 'email: ' . $params['email'];

?>
