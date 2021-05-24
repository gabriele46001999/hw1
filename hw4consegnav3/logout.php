<?php
  //APRO LA SESSIONE//
	session_start();
	session_destroy();
  require_once 'dbconfig.php';
  //DISTRUGGO LA SESSIONE COSI ELIMINO $_SESSION["username"];
  //SE INVECE I cookie SONO SETTATI ELIMINO DAL DATABASE  IL cookie E SETTO I COOCKIE A STRINGA VUOTA//
	if(isset($_COOKIE['username']) && isset($_COOKIE['token']) && isset($_COOKIE['id'])){
	  $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
		$id=mysqli_real_escape_string($conn, $_COOKIE['id']);
		$username=mysqli_real_escape_string($conn, $_COOKIE['username']);
		$query="SELECT id, hash FROM cookies where id='".$id."' and username='".$username."';";
		$res=mysqli_query($conn, $query);
		$cookie=mysqli_fetch_assoc($res);
		if($cookie){
			if(password_verify($_COOKIE['token'], $cookie['hash'])){
				$query1="DELETE FROM cookies where id='".$id."';";
				mysqli_query($conn, $query1);
				mysqli_close($conn);
			}
		}
		setcookie('username','');
		setcookie('id','');
		setcookie('token','');
	}
	header('Location: login.php');
	exit;
?>
