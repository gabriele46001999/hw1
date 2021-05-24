<?php
      // Connessione al database
      require_once 'dbconfig.php';
      require_once 'auth.php';
      $username=checkAuth();
      if(($username)&&isset($_GET["tipo"])){
    $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      // Inizializza array di preferiti
      $preferiti = array();
      $tipologiainput=$_GET["tipo"];
      // Leggi eventi//
     $query='SELECT prod.id_prodotto,prod.titolo,prod.immagine FROM prodotto AS
      prod INNER JOIN preferiti AS pref ON prod.id_prodotto=pref.id_prodotto
      INNER JOIN utente AS u ON pref.username=u.username WHERE pref.username="'.$username.'"
       AND prod.tipologia="'.$tipologiainput.'"';
      $res = mysqli_query($conn,$query);
      while($row = mysqli_fetch_assoc($res))
      {
          //COSI FACENDO LO METTE ALLA FINE DEL ARRAY//
            $preferiti[] = $row;
      }
      // Ritorna I DATI IN FORMATO JSON COSI POSSO LEGGERLI CON FUNZIONE ONJSON//
      echo json_encode($preferiti);
      // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
    }
?>
