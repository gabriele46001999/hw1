<?php
      // Connessione al database
      require_once 'dbconfig.php';
      require_once 'auth.php';
      $username=checkAuth();
      if($username){
    $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
      // Inizializza array di preferiti
      $carrello = array();
      // Leggi eventi//
      $query='SELECT prod.id_prodotto,prod.titolo,prod.immagine,prod.descrizione,prod.prezzo,C.quantita FROM prodotto AS prod INNER JOIN carrello AS C ON prod.id_prodotto=C.id_prodotto INNER JOIN utente AS u ON C.username=u.username WHERE C.username="'.$username.'" ';
      $res = mysqli_query($conn,$query);
      while($row = mysqli_fetch_assoc($res))
      {
          //COSI FACENDO LO METTE ALLA FINE DEL ARRAY//
            $carrello[] = $row;
      }
      // Ritorna I DATI IN FORMATO JSON COSI POSSO LEGGERLI CON FUNZIONE ONJSON//
      echo json_encode($carrello);
      // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
    }
?>
