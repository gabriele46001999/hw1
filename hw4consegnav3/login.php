<?php
//VERIFICHIAMO SE E PRESENTE LA VARIABILE NELLA SESSIONE(ABBIAMO GIA EFFETTUATO L'ACCESSO)//
require_once 'auth.php';
$username=checkAuth();
   if($username){
  //SE SI ANDIAMO ALLA HOME//
    header("Location:mhw1.html"); //REINDIRITTA L'UTENTE ALLA PAGIAN HOME.PHP,CHE POI E LA HOMEPAGE DEL SITO//
    exit;
}

//INIZIALIZZO UN VARIABILE ERRORE//
require_once 'dbconfig.php';
$errore=array();
/*VERIFICHIAMO LA PRESENZA DI DATI POST(in action non ho messo nulla nel form quindi i dati li mando a questa pagina stessa),LA FUNZIONE ISSET VERIFICHA SE SONO SETTATI*/
if(isset($_POST["Username"])&&isset($_POST["Password"])){
  //VERIFICHIAMO CHE SONO CORRETTI, DOVREMMO COLLEGARCI AL DB//
  $conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
  //PER EVITARE PROBLEMI CON MYSQL INJECTION//
  $usernameinput=mysqli_real_escape_string($conn,$_POST['Username']);
  $passwordinput=mysqli_real_escape_string($conn,$_POST['Password']);
  $query='SELECT * FROM utente WHERE username="'.$usernameinput.'"';
  $res=mysqli_query($conn,$query)or die(mysqli_error($conn));
  if(mysqli_num_rows($res)>0){
    $entry=mysqli_fetch_assoc($res);
    if (password_verify($passwordinput, $entry['password'])) {
    //LE CRENDENZIALI SONO CORRETTE RINDIRIZZO ALLA HOMEPAGE//
    //PRIMA SALVO LA VARIABILE IN SESSION SE NON HO CLICCATO SU RICORDA L'ACCESSO//
    if(empty($_POST['Remember'])){
    $_SESSION["username"]=$_POST["Username"];
  }
  //SE L'UTENTE HA CLICCATO CHE VUOLE ESSERE RICORDATO//
  else{
    $token=random_bytes(12);
    $user=$entry['username'];
    $hash=password_hash($token,PASSWORD_BCRYPT);
    $expires=strtotime("+365 day");
    $querycochie='INSERT INTO cookies(username,hash,expires)VALUES("'.$user.'","'.$hash.'","'.$expires.'")';
    $rescochie=mysqli_query($conn,$querycochie)or die(mysqli_error($conn));
    setcookie("username", $user, $expires);
    setcookie("id", mysqli_insert_id($conn), $expires);
    setcookie("token", $token, $expires);
  }
  mysqli_close($conn);
  header("Location:mhw1.html"); //REINDIRITTA L'UTENTE ALLA PAGIAN DESTHOME.PHP,CHE POI E LA HOMEPAGE DEL SITO//
  exit;
}
  else{
     $errore[]="PASSWORD NON CORRETTA";
}
  }
  else{
    $errore[]="USERNAME NON CORRETTO";
  }
}
 ?>


<html>
<head>
  <link rel="stylesheet" href="loginform.css">
  <script src="login.js" defer="true"></script>
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,300&display=swap" rel="stylesheet">
</head>
<body>
<?php
//SE LA VARIABILE ERRORE ==TURE STAMPA UN H1 CON CRENDENZIALI NON VALIDE//
if($errore){
  $lunghezza=count($errore); //LUNGHEZZA ARRAY//
 for($i=0;$i<$lunghezza;$i++){
 echo "<p class='errore'>".$errore[$i]."</p>";
 }
}
?>
<!--SE LA VARIABILE ERRORE ==TURE STAMPA UN H1 CON CRENDENZIALI NON VALIDE//-->
<div class="errorediv"></div>
<!--ABBIAMO UN DIV AMMUCIATO CHE VERRA VISUALIZZATO SE LASCIO QUALCHE CAMPO VUOTO-->
<form id="form1" method="post">
<h1>EFFETTUA IL LOGIN</h1>
<!-- IN TAL MODO RICORDO L'USERNAME SCRITTO PRIMA-->
<label>Username<input type="text" name="Username"<?php
if(isset($_POST["Username"])){
  echo "value=".$_POST['Username'];
}
?> ></label>
<label>Password<input type="password" name="Password"></label>
<input type="checkbox" name="Remember" value="true">Ricorda l'accesso
<label>&nbsp;<input class="button" type="submit" name="invio" value="invia"></label>
<a href="register.php">REGISTRATI SUBITO</a>
</form>
</body>
</html>
