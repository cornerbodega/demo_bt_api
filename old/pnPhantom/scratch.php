<?php

   use JonnyW\PhantomJs\Client;

   $client = Client::getInstance();

   $request  = $client->getMessageFactory()->createRequest();
   $response = $client->getMessageFactory()->createResponse();

   $request->setMethod('GET');
   $request->setUrl('http://jonnyw.me');

   $client->send($request, $response);

   if($response->getStatus() === 200) {
       echo $response->getContent();
   }
 ?>
