<?php
      // Connessione al database
      require_once 'dbconfig.php';
      require_once 'auth.php';
      $username=checkAuth();
      if($username){
      $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      $id_prodotto=$_GET["prodotto"];
      // Leggi eventi//
      $query='UPDATE carrello SET quantita=quantita+1  WHERE  id_prodotto="'.$id_prodotto.'" AND username="'.$username.'" ';
      mysqli_query($conn,$query);
      // Chiudi
      mysqli_close($conn);
    }
?>
