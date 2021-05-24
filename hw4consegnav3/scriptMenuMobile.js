//ASSOCIO UN SELETTORE AL DIV SU MOBILE CON LE 3 RIGHE//
let divlink=document.querySelector(".linkmobile");
divlink.classList.add("hidden");
const menu=document.querySelector("#menu");
menu.addEventListener("click",showlink);
const linemob=document.querySelectorAll(".linemobile");


function closemenuMobile(event){
  const divlinkmobile=event.currentTarget.parentNode;
  divlinkmobile.classList.add("hidden");
  menu.classList.remove("hidden");
  for(linea of linemob){
  linea.classList.remove("hidden");
}
}

function showlink(event){
  divlink.classList.remove("hidden");
  divlink.innerHTML="";
  menu.classList.add("hidden");
  for(linea of linemob){
  linea.classList.add("hidden");
}

const linkHome=document.createElement("a");
linkHome.setAttribute("href","mhw1.html");
linkHome.textContent="Home";
divlink.appendChild(linkHome);
const linkComputer=document.createElement("a");
linkComputer.setAttribute("href","Computer.html");
linkComputer.textContent="Computer";
divlink.appendChild(linkComputer);
const linkSmartphone=document.createElement("a");
linkSmartphone.setAttribute("href","Smartphone.html");
linkSmartphone.textContent="Smartphone";
divlink.appendChild(linkSmartphone);
const linkAccessori=document.createElement("a");
linkAccessori.setAttribute("href","Accessori.html");
linkAccessori.textContent="Accessori";
divlink.appendChild(linkAccessori);
const linkcarrello=document.createElement("a");
const linkIfSession=document.createElement("a");
if(username!=null){
  linkcarrello.setAttribute("href","carrello.html");
  linkcarrello.textContent="Carrello";
  divlink.appendChild(linkcarrello);
  linkIfSession.setAttribute("id","registrato");
  linkIfSession.setAttribute("href","logout.php");
  linkIfSession.textContent="Logut";
  divlink.appendChild(linkIfSession);
}
else{
  linkIfSession.setAttribute("href","register.php");
  linkIfSession.textContent="Registrati";
  divlink.appendChild(linkIfSession);
}
const closespan=document.createElement("span");
closespan.textContent="Chiudi Menu";
divlink.appendChild(closespan);
closespan.addEventListener("click",closemenuMobile);
}


let linkweb=document.querySelector(".flex-itemnav");
let username=null;
session();

function usernameJson(json){
username=json;
console.log(username);
gestionelink();
}


function sessionResponse(response){
  return response.json();
}



//VEDO SE L'UTENTE E REGISTRATO AL CARICAMENTO DELLA PAGINA//
function session(){
  fetch("http://localhost/hw4consegnav3/ajax_getSession.php").then(sessionResponse).then(usernameJson);
}

function gestionelink(){
  const link=document.createElement("a");
  const link2=document.createElement("a");
  if(username!=null){
    link2.setAttribute("href","carrello.html");
    link2.textContent="Carrello";
    linkweb.appendChild(link2);
    link.setAttribute("id","registrato");
    link.setAttribute("href","logout.php");
    link.textContent="Logut";
    linkweb.appendChild(link);
  }
  else{
    link.setAttribute("href","register.php");
    link.textContent="Registrati";
    linkweb.appendChild(link);
  }
}
