<?php
require_once 'dbconfig.php';
$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
$username=mysqli_real_escape_string($conn,$_GET["valueCheck"]);
// Leggi eventi//
$query='SELECT * FROM utente where username="'.$username.'" ';
$res = mysqli_query($conn,$query);
$row = mysqli_fetch_assoc($res);
if($row!=null){
  echo json_encode("Username gia presente");
}
else{
  echo json_encode(null);
}
mysqli_free_result($res);
mysqli_close($conn);
 ?>
