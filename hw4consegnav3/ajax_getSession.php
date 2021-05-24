<?php
require_once 'auth.php';
$username=checkAuth();
if($username){
  echo json_encode($username);
}
else{
  echo json_encode(null);
}
 ?>
