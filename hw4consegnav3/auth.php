<?php
	session_start();
  require_once 'dbconfig.php';

	function checkAuth(){
    GLOBAL $dbconfig;
		if(!isset($_SESSION['username'])){
			if(isset($_COOKIE['username']) && isset($_COOKIE['id']) && isset($_COOKIE['token'])){
				$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
				$username=$_COOKIE['username'];
				$id=$_COOKIE['id'];
				$query="SELECT * FROM  cookies where username='".$username."' and id='".$id."' ";
				$res=mysqli_query($conn, $query);
				$cookie=mysqli_fetch_assoc($res);
				if($cookie){
					if(time()>$cookie['expires']){
						$query1="DELETE  FROM  cookies where id='".$id."' ";
						mysqli_query($conn, $query1);
						header('Location: logout.php');
						exit;
					}else if(password_verify($_COOKIE['token'], $cookie['hash'])){
						return $_COOKIE['username'];
						mysql_close($conn);
					}
				}
			}
		}else{
			return $_SESSION['username'];
		}
	}
?>
