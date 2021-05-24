<?php
  $apikey="21165319-74b00e5a51d65f5ad978a43c8";
  $curl = curl_init();
  $tipologia=$_GET["search"];
  $dati=array("key"=>$apikey,"q"=>$tipologia,"image_type"=>"photo");
  $dati=http_build_query($dati);
 curl_setopt($curl, CURLOPT_URL,"https://pixabay.com/api?".$dati);
 curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  echo $result;
  curl_close($curl);
  ?>
