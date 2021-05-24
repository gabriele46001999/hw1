
<?php
      // Connessione al database
      require_once 'dbconfig.php';
      require_once 'auth.php';
      $username=checkAuth();
      //DEFINISCO UN ARRAY DOVE AVRO id_prodotto-->quantita//
      $errori=array();
      if($username){
      $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      $queryQuantityCarrello='SELECT id_prodotto,quantita FROM  carrello  WHERE username="'.$username.'" ';
      $rescarrello = mysqli_query($conn,$queryQuantityCarrello);
      while($row = mysqli_fetch_assoc($rescarrello))
      {
          //OTTENGO UN ARRAY IN CUI HO GLI ELEMENTI NEL CARRELLO CON LA LORO QUANTITA//
            $carrello[] = $row;
      }

      //echo "PRODOTTI CARRELLO";
      //echo "<pre>";
      //print_r($carrello);
      //echo "</pre>";


         //MI FACCIO RESTITUIRE LA QUANTITA DISPONIBILE DALLA TABELLA PRODOTTO//
         $query="SELECT p.titolo,p.quantita FROM prodotto AS p INNER JOIN carrello AS c ON
          c.id_prodotto=p.id_prodotto AND c.username='".$username."'";
         $resProduct = mysqli_query($conn,$query);
         while($rowProdotti = mysqli_fetch_assoc($resProduct))
         {
             //OTTENGO UN ARRAY IN CUI HO i prodotti con  LA LORO QUANTITA//
            $prodotti[] = $rowProdotti;
         }
         //echo "PRODOTTI DISPONIBILI";
         //echo "<pre>";
         //print_r($prodotti);
         //echo "</pre>";

     $lunghezza=count($carrello);
     for($i=0;$i<$lunghezza;$i++){
       $arrayn=array();
       $arraycarr=$carrello[$i];
       $arrayproduct=$prodotti[$i];
       //echo "CARRELLO";
       //echo "PRODOTTO NUMERO".$arraycarr["id_prodotto"]. " VALE ".$arraycarr["quantita"]."<br>";
       //echo "DISPONIBILI";
       //echo "PRODOTTO NUMERO".$arrayproduct["id_prodotto"]. " VALE ".$arrayproduct["quantita"]."<br>";
       if($arraycarr["quantita"]>$arrayproduct["quantita"]){
         $errori[]=$prodotti[$i];
       }
     }

  if(count($errori)==0){
    //SETTO ACQUISTATO =1 PER GESTIRE CORRETTAMENTE IL TRIGGER//
    $querySetAcq="UPDATE carrello SET Acquistato=1 WHERE username='".$username."'";
    mysqli_query($conn,$querySetAcq);
    $query="DELETE FROM carrello WHERE username='".$username."'";
      mysqli_query($conn,$query);
    $errori=null;
  }
  //ALLA FINE RITORNA SEMPRE ERRORI IN FORMATO JSON//
    echo json_encode($errori);
   //LIBERO RISORSE//
  mysqli_free_result($rescarrello);
  mysqli_free_result($resProduct);
    // Chiudi Connessione
    mysqli_close($conn);
}
?>
