<?php
require_once 'dbconfig.php';
require_once 'auth.php';
$username=checkAuth();
if(($username)&&isset($_GET["id_prodotto"])){
$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
// Leggi eventi//
$id_prodottoinput=$_GET['id_prodotto'];
$query='INSERT INTO preferiti(username,id_prodotto) VALUES("'.$username.'" ,"'.$id_prodottoinput.'")';
mysqli_query($conn,$query);
mysqli_close($conn);
}
?>
