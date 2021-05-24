<?php

// Utilizzo il token,PRIMA ESEGUO JSON_DECODE CHE LO FA PASSARE DA JSON AD OGGETTO SENNO NON POSSO ACCEDERVI//
 $token = $_GET["token"];  //MI PRENDO IL TOKEN PASSATO COME PARAMETRO ALLA RICHIESTA FETCH(GET)//
 $curl2 = curl_init();
 $data = http_build_query(array("query" => $_GET["parametro"]));
  curl_setopt($curl2, CURLOPT_URL, "https://api.vimeo.com/videos?".$data); //FACCIO RICHIESTA GET ACCODANDO I DATI//
  //AGGIUGNO HEADERS//
  $headers2 = array("Authorization: Bearer ".$token);
  curl_setopt($curl2, CURLOPT_HTTPHEADER, $headers2);
  curl_setopt($curl2, CURLOPT_CERTINFO, true);
  curl_setopt($curl2, CURLOPT_VERBOSE, 1);
  curl_setopt($curl2, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl2, CURLOPT_FOLLOWLOCATION, true);
  $result2 = curl_exec($curl2);
  //DA LATO JAVASCRIPT HO BISOGNO DI UN OGGETTO JSON,PER RITORNARE QUALCOSA BASTA FARE ECHO DI QUALCOSA,RESULT E GIA UN JSON,SE NON LO ERA USAVO (JSON_ENCODE($RESULT)
  echo $result2;
  curl_close($curl2);
?>
