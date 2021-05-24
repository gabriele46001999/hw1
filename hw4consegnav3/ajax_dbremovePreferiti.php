<?php
      // Connessione al database
      require_once 'dbconfig.php';
      require_once 'auth.php';
      $username=checkAuth();
      if(($username)&&isset($_GET["prodotto"])){
  $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      $prodotto=$_GET["prodotto"];
      $query="DELETE FROM preferiti WHERE username='".$username."' AND id_prodotto='".$prodotto."' ";
      mysqli_query($conn,$query);
      // Chiudi Connessione
      mysqli_close($conn);
    }
?>
