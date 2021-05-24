<?php
require_once 'dbconfig.php';
require_once 'auth.php';
$username=checkAuth();
if(($username)&&isset($_GET["prodotto"])){
$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
$id_prodotto=$_GET["prodotto"];
$query="DELETE FROM carrello WHERE username='".$username."' AND id_prodotto='".$id_prodotto."' ";
 mysqli_query($conn,$query);
 mysqli_close($conn);
}
?>
