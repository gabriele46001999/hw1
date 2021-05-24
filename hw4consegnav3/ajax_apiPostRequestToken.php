<?php
// App key
$client_id ="3804dd7deadec313723271ba41b1a5a0bd0a9e61";
$client_secret ="MNku1cmfoVC65TS3kpC1dFUZ1/tF9WUpxCpf6Sp6iGpSEwAIoRGgz3CumZcH2oy8950nVG3dgLJX9DkP+t9yM48v7r6EglKti0uHUVRGKgfETwFj13UfskCFM24k16He";

//INIZIALIZZO CURL//
$curl = curl_init();
//SETTO OPTION=URL//
curl_setopt($curl, CURLOPT_URL, "https://api.vimeo.com/oauth/authorize/client");
//SETTO IL METODO POST//
curl_setopt($curl, CURLOPT_POST, 1);
//METTO QUI I CAMPI CHE METTEVO IN BODY//
curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
//METTO QUI I CAMPI CHE METTEVO IN HEADERS//
$headers = array("Authorization: Basic ".base64_encode($client_id.":".$client_secret),
                  "Content-Type:application/x-www-form-urlencoded",
                  "Accept:application/vnd.vimeo.*+json;version=3.4");
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//ESEGUO IL CURL//
$result = curl_exec($curl);
echo $result;  //RITORNO IL FILE JSON CON DENTRO IL TOKEN//
curl_close($curl);
