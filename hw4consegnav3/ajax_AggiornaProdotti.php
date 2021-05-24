<?php
      // Connessione al database
      require_once 'dbconfig.php';
      if(isset($_GET["partipologia"])){
      $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      // Inizializza array di eventi
      $eventi = array();
      $tipologia=$_GET["partipologia"];
      // Leggi eventi//
      $query='SELECT * FROM prodotto where tipologia="'.$tipologia.'" ';
      $res = mysqli_query($conn,$query);
      while($row = mysqli_fetch_assoc($res))
      {
          //COSI FACENDO LO METTE ALLA FINE DEL ARRAY//
            $eventi[] = $row;
      }
      // Ritorna I DATI IN FORMATO JSON COSI POSSO LEGGERLI CON FUNZIONE ONJSON//
      echo json_encode($eventi);
      // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
    }
?>
