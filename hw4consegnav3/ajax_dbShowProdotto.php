<?php
      // Connessione al database
      require_once 'dbconfig.php';
      if(isset($_GET["prodotto"])){
      $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      $id_prodotto=$_GET["prodotto"];
      // Leggi eventi//
      $query='SELECT * FROM prodotto where id_prodotto="'.$id_prodotto.'" ';
      $res = mysqli_query($conn,$query);
      $row = mysqli_fetch_assoc($res);
      // Ritorna I DATI IN FORMATO JSON COSI POSSO LEGGERLI CON FUNZIONE ONJSON//
      echo json_encode($row);
      // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
    }
?>
