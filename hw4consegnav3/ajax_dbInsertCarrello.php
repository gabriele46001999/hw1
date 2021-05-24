<?php
require_once 'dbconfig.php';
require_once 'auth.php';
$username=checkAuth();
if(($username)&&isset($_GET["id_prodotto"])&&isset($_GET["numero"])){
  $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
//FACCIO UNA SELECT SE IL PRODOTTO CON QUEL USERNAME NON CE NEL CARRELLO LO AGGIUNGO SE C'E UN ENTRY FACCIO UN UPDATE
$id_prodottoinput=$_GET['id_prodotto'];
$quantita=mysqli_real_escape_string($conn,$_GET['numero']);
//SELEZIONO LA QUANTITA DAL DATABASE PRODOTTO//
$querySelectProduct='SELECT * FROM prodotto WHERE id_prodotto="'.$id_prodottoinput.'"';
$resSelectProduct=mysqli_query($conn,$querySelectProduct);
$rowProduct=mysqli_fetch_assoc($resSelectProduct);
if($quantita>$rowProduct['quantita']){
  echo json_encode("Quantita scelta non disponibile");
}
else{
$querySelect='SELECT * FROM carrello WHERE username="'.$username.'" AND id_prodotto="'.$id_prodottoinput.'"';
$resSelect=mysqli_query($conn,$querySelect);
$row=mysqli_fetch_assoc($resSelect);
//SE RIGA NON E PRESENTE FACCIO L'INSERT//
if(!$row){
$query='INSERT INTO carrello(username,id_prodotto,quantita,Acquistato)VALUES("'.$username.'" ,"'.$id_prodottoinput.'","'.$quantita.'",0)';
mysqli_query($conn,$query);
}
//SE LA RIGA E PRESENTE FACCIO L'UDATE//
else{
  $queryUpdate='UPDATE carrello SET quantita=quantita+"'.$quantita.'" WHERE username="'.$username.'" AND id_prodotto="'.$id_prodottoinput.'"';
  mysqli_query($conn,$queryUpdate);
}
echo json_encode(null);
}

//CHIUDO CONNESSIONE//
mysqli_close($conn);
}
?>
