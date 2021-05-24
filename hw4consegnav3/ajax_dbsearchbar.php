<?php
      // Connessione al database
      require_once 'dbconfig.php';
      if(isset($_GET["pagina"])&&isset($_GET["values"])){
      $eventi=array();
      $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      $tipologia=$_GET["pagina"];
      $filter=$_GET["values"];
      $query='SELECT * FROM prodotto where tipologia="'.$tipologia.'" AND titolo LIKE "'.$filter.'" ';
      $res=mysqli_query($conn,$query);
      while($row = mysqli_fetch_assoc($res))
      {
          //COSI FACENDO LO METTE ALLA FINE DEL ARRAY//
            $eventi[] = $row;
      }
      // Chiudi
      // Ritorna I DATI IN FORMATO JSON COSI POSSO LEGGERLI CON FUNZIONE ONJSON//
      echo json_encode($eventi);
      mysqli_free_result($res);
      mysqli_close($conn);
    }
?>
