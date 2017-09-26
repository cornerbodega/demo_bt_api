<?php
/**
 * This example shows sending a message using PHP's mail() function.
 */

require '../PHPMailerAutoload.php';

$params = json_decode(file_get_contents('php://input'),true);
//PARAMS FORMAT:
// fromEmail
// fromName
// toEmail
// toName
// subject
// templateUrl (relative to this file)



//Create a new PHPMailer instance
$mail = new PHPMailer;
//Set who the message is to be sent from
$mail->setFrom($params["fromEmail"], $params["fromName"]);
//Set an alternative reply-to address
$mail->addReplyTo($params["fromEmail"], $params["fromName"]);
//Set who the message is to be sent to
$mail->addAddress($params["toEmail"], $params["toEmail"]);
//Set the subject line
$mail->Subject = $params["subject"];
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML(file_get_contents($params["templateUrl"]), dirname(__FILE__));
$mail->Body = $params["body"];
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
// $mail->addAttachment('images/potlogo-36.png');

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo . " ..." . $params;
} else {
    echo "Message sent!";
}
