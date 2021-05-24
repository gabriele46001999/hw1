<?php
//VEDO SE LA SESSIONE E PRESENTE SE E PRESENTE REINDIRIZZO ALLA HOME//
require_once 'auth.php';
$username=checkAuth();
 if($username){
//SE SI ANDIAMO ALLA HOME//
  header("Location:mhw1.html"); //REINDIRITTA L'UTENTE ALLA PAGIAN HOME.PHP,CHE POI E LA HOMEPAGE DEL SITO//
  exit;
}

//SE L'UTENTE DEVE REGISTRARSI//
require_once 'dbconfig.php';
/*VERIFICHIAMO LA PRESENZA DI DATI POST(in action non ho messo nulla nel form quindi i dati li mando a questa pagina stessa),LA FUNZIONE ISSET VERIFICHA SE SONO SETTATI*/
if(isset($_POST["Username"])&&isset($_POST["Password"])&&isset($_POST["Nome"])&&isset($_POST["Cognome"])&&isset($_POST["Indirizzo"])&&isset($_POST["mail"])&&isset($_POST["Accept"])){
  //VERIFICHIAMO CHE SONO CORRETTI, DOVREMMO COLLEGARCI AL DB//
  $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
  //PER EVITARE PROBLEMI CON MYSQL INJECTION//
  $usernameinput=mysqli_real_escape_string($conn,$_POST['Username']);
  $password=mysqli_real_escape_string($conn,$_POST['Password']);
  $nomeinput=mysqli_real_escape_string($conn,$_POST['Nome']);
  $cognomeinput=mysqli_real_escape_string($conn,$_POST['Cognome']);
  $indirizzoinput=mysqli_real_escape_string($conn,$_POST['Indirizzo']);
  $emailinput=mysqli_real_escape_string($conn,$_POST['mail']);
  $passwordinput=password_hash($password, PASSWORD_BCRYPT);
  $query='INSERT INTO utente(username,password,nome,cognome,email,indirizzo) VALUES("'.$usernameinput.'" ,"'.$passwordinput.'","'.$nomeinput.'","'.$cognomeinput.'","'.$emailinput.'","'.$indirizzoinput.'")';
  mysqli_query($conn,$query);
    //PRIMA SALVO LA VARIABILE IN SESSION//
    //REINDIRIZZO ALLA HOMEPAGE//
    $_SESSION["username"]=$_POST["Username"];
    header("Location:mhw1.html"); //REINDIRITTA L'UTENTE ALLA PAGIAN HOME.PHP,CHE POI E LA HOMEPAGE DEL SITO//
    exit;
}
 ?>


<html>
<head>
  <link rel="stylesheet" href="registerMio.css">
  <script src="registerform.js" defer="true"></script>
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,300&display=swap" rel="stylesheet">
</head>
<body>
<!--ABBIAMO UN DIV ERRORE NASCOSTO CHE COMPARE IN CASO DI ERRORE-->
<div class="errore"></div>
<!--IL FORM AL CLICK MANDA I DATI POST-->
<form id="form1" method="post">
<h1>CREA IL TUO ACCOUNT</h1>
<label>Nome<input id="Nome" type="text" name="Nome"></label>
<div id="NomeError">
</div>
<label>Cognome<input id="Cognome"  type="text" name="Cognome"></label>
<div id="CognomeError">
</div>
<label>Email<input id="Email" type="text" name="mail"></label>
<div id="EmailError">
</div>
<label>Indirizzo<input id="indirizzo"  type="text" name="Indirizzo"></label>
<div id="IndirizzoError">
</div>
<label>Username<input id="Username" type="text" name="Username"></label>
<div id="UsernameError">
</div>
<label>Password<input id="Password" type="password" name="Password"></label>
<div id="PasswordError">
</div>
<input id="Accept" type="radio" name="Accept" value="true">Acconsento al furto dei dati personali
<div id="AcceptError">
</div>
<label>&nbsp;<input class="button" type="submit" name="invio" value="invia"></label>
<a href="login.php">SEI GIA REGISTRATO EFFETTUA IL LOGIN</a>
</form>
</body>
</html>
