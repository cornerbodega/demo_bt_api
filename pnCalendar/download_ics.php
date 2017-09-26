<?php

include 'ICS.php';


header('Content-type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename=invite.ics');

$ics = new ICS(array(
  'location' => $_GET['location'],
  'description' => $_GET['description'],
  'dtstart' => $_GET['dtstart'],
  'dtend' => $_GET['dtend'],
  'dtstamp' => $_GET['dtstamp'],
  'summary' => $_GET['summary'],
  'url' => $_GET['url']
));

echo $ics->to_string();
// echo  $_GET['dtend'];
