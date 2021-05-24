<?php
      // Connessione al database
      require_once 'dbconfig.php';
      require_once 'auth.php';
      $username=checkAuth();
      if(($username)&&isset($_GET['prodotto'])){
      $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      $id_prodottoinput=$_GET['prodotto'];
      //AL CLICK VADO A FARE UNA SELECT E MI PRENDO LA QUANTITA//
      $querySelect="SELECT * FROM carrello WHERE username='".$username."' AND id_prodotto='".$id_prodottoinput."' ";
      $resSelect=mysqli_query($conn,$querySelect);
      $entry=mysqli_fetch_assoc($resSelect);
   //DALLA RIGA MI PRENDO LA QUANTITA//
      $quantita=$entry['quantita'];
      if($quantita>1){
      $queryUpdate="UPDATE carrello SET quantita=quantita-1 WHERE username='".$username."' AND id_prodotto='".$id_prodottoinput."' ";
      mysqli_query($conn,$queryUpdate);
    }
    //SE NON E MAGGIORE DI 0 ELIMINO L'ELEMENTO//
  else{
      $query="DELETE FROM carrello WHERE username='".$username."' AND id_prodotto='".$id_prodottoinput."' ";
       mysqli_query($conn,$query);
    }
     mysqli_free_result($resSelect);
     mysqli_close($conn);
    }
?>
