function checkNome(event){
		const nomevalore=event.currentTarget.value;
		divNomeError.innerHTML="";
		if(nomevalore.length==0){
			error=divNomeError.querySelector("p");
		if(error==null){
    const perror=document.createElement("p");
		perror.textContent="inserisci nome";
		divNomeError.appendChild(perror);
    divNomeError.classList.remove("hidden");
	}
		}
}

function checkCognome(event){
		const cognomevalore=event.currentTarget.value;
		divCognomeError.innerHTML="";
		if(cognomevalore.length==0){
		error=divCognomeError.querySelector("p");
		if(error==null){
    const perror=document.createElement("p");
		perror.textContent="inserisci cognome";
		divCognomeError.appendChild(perror);
    divCognomeError.classList.remove("hidden");
		}
	}
}

function checkIndirizzo(event){
		const indirizzovalore=event.currentTarget.value;
		divIndirizzoError.innerHTML="";
		if(indirizzovalore.length==0){
			error=divIndirizzoError.querySelector("p");
			if(error==null){
    const perror=document.createElement("p");
		perror.textContent="inserisci indirizzo";
		divIndirizzoError.appendChild(perror);
    divIndirizzoError.classList.remove("hidden");
	}
		}
}


function usernamecheckJson(json){
	varUsernameError=false;
	if(json!=null){
	 //STAMPARE L'ERRORE NELLA PAGINA//
	//SE C'ERA GIA UN ERORRE PRIMA LO MODIFICHI SENNO LO CREI//
	const errore=divUsernameError.querySelector("p");
	if(errore==null){
	 const perror=document.createElement("p");
	 perror.textContent=json;
	 divUsernameError.appendChild(perror);
	 divUsernameError.classList.remove("hidden");
	}
	else{
		 error.textContent=json;
		 divUsernameError.classList.remove("hidden");
	}
	varUsernameError=true;
	}
	}

function usernamecheckResponse(response){
	return response.json();
}

function checkUsername(event){
	  varUsernameError=false;
		const usernamevalore=event.currentTarget.value;
		divUsernameError.innerHTML="";
		if(usernamevalore.length==0){
		error=divUsernameError.querySelector("p");
		if(error==null){
    const perror=document.createElement("p");
		perror.textContent="inserisci username";
		divUsernameError.appendChild(perror);
    divUsernameError.classList.remove("hidden");
	}
		varUsernameError=true;
	}else{
		const usernamecheck=encodeURIComponent(usernamevalore);
		fetch("http://localhost/hw4consegnav3/ajax_checkUsername.php?valueCheck="+usernamecheck).then(usernamecheckResponse).then(usernamecheckJson);
	}
}


//QUESTO APPOSTO//
function checkPassword(event){
	varPasswordError=false;
	let numeri=0;
	let maiuscole=0;
	let minuscole=0;
	const passwordvalore=event.currentTarget.value;
	divPasswordError.innerHTML="";
		//CONTROLLO CHE LA PASSOWRD CONTENGA UNA MINUSCOLA,MAIUSCOLA,CONTENGA NUMERI  E SIA MAGGIORE DI 8 CARATTERI//
			for(let i=0; i<passwordvalore.length; i++){
			 const carattere=passwordvalore.charCodeAt(i);
			 if(carattere>=48 && carattere<=57){
				 numeri++; //INCREMENTO IL NUMERO DI NUMERI//
			 }
			 if(carattere>=65 && carattere<=90){
				 maiuscole++; //INCREMENTO IL NUMERO DI MAIUSCOLE//
			 }
			 if(carattere>=97 && carattere<=122){
				 minuscole++;  //INCREMENTO IL NUMERO DI MINUSCOLE//
			 }
		 }
		if(passwordvalore.lenght<8||numeri==0||maiuscole==0||minuscole==0){
		error=divPasswordError.querySelector("p");
		if(error==null){
    const perror=document.createElement("p");
		perror.textContent="inserisci Password di 8 caratteri che include lettere Maiuscole e Numeri";
		divPasswordError.appendChild(perror);
    divPasswordError.classList.remove("hidden");
	}
		varPasswordError=true;
		}
}






function emailcheckJson(json){
//LA VARIABILE E FALSE//
varEmailError=false;
if(json!=null){
 //STAMPARE L'ERRORE NELLA PAGINA//
//SE C'ERA GIA UN ERORRE PRIMA LO MODIFICHI SENNO LO CREI//
const errore=divEmailError.querySelector("p");
if(errore==null){
 const perror=document.createElement("p");
 perror.textContent=json;
 divEmailError.appendChild(perror);
 divEmailError.classList.remove("hidden");
}
else{
	 error.textContent=json;
	 divEmailError.classList.remove("hidden");
}
varEmailError=true;
}
}


function emailcheckResponse(response){
	return response.json();
}


//CONTROLLO CHE L'EMEAIL SIA UNIVOCA NON E PRESENTE NEL DATABASE//
function checkEmail(event){
	//INIZIALMENTE L'ERRORE E FALSE//
	varEmailError=false;
	const email=event.currentTarget;
	const emailvalore=email.value;
  divEmailError.innerHTML="";
if(emailvalore.indexOf("@")==-1){
	const errore=divEmailError.querySelector("p");
	if(errore==null){
		const perror=document.createElement("p");
		perror.textContent="Inserisci una E-mail valida";
		divEmailError.appendChild(perror);
		divEmailError.classList.remove("hidden");
	}
	//SE NON HA LA CHIOCCIOLA HA ERRORE//
    varEmailError=true;
	}
	//SE LA CHIOCCIOLA LA HA CONTROLLO NEL DATABASE//
else{
const emailcheck=encodeURIComponent(emailvalore);
fetch("http://localhost/hw4consegnav3/ajax_checkEmail.php?valueCheck="+emailcheck).then(emailcheckResponse).then(emailcheckJson);
}
}


//TALE FUNZIONE SE CI SONO ERRORI EVITA CHE I DATI VENGONO INVIATI//
function validazioneTotal(event){
	const form=event.currentTarget;
	const nomevalore=nome.value;
	const cognomevalore=cognome.value;
	const indirizzovalore=indirizzo.value;
	const usernamevalore=username.value;
	const passwordvalore=password.value;
	const acceptvalore=form.querySelector("#Accept").checked;
  diverrore.innerHTML="";
	divAcceptError.innerHTML="";

//SE I CAMPI SONO VUOTI NON DEVE MANDARE I DATI//
	if(nomevalore.length==0||cognomevalore.length==0||indirizzovalore.length==0|| usernamevalore.length==0||passwordvalore.length==0){
		  event.preventDefault();
			const h3=document.createElement("h3");
			h3.textContent="Compila tutti i campi";
			diverrore.appendChild(h3);
			diverrore.classList.remove("hidden");
	}
	//SE NON ACCETTI IL FURTO DEI DATI NON LI MANDA//
	if(acceptvalore==false){
		event.preventDefault();
		const h3=document.createElement("h3");
		h3.textContent="Acconsenti al furto dei dati";
		divAcceptError.appendChild(h3);
		divAcceptError.classList.remove("hidden");
	}

 //SE SI E VERIFICATO UN ERRORE O PASSWORD O EMAIL O USERNAME NON MANDA I DATI//
	if(varPasswordError!=false||varEmailError!=false||varUsernameError!=false){
		event.preventDefault();
	}
}


//AGGIUNGO SELETTORE AD OGNI ELEMENTO DI INPUT//
const nome=document.querySelector("#Nome");
nome.addEventListener("blur",checkNome);
const cognome=document.querySelector("#Cognome");
cognome.addEventListener("blur",checkCognome);
const email=document.querySelector("#Email");
email.addEventListener("blur",checkEmail);
const indirizzo=document.querySelector("#Indirizzo");
indirizzo.addEventListener("blur",checkIndirizzo);
const username=document.querySelector("#Username");
username.addEventListener("blur",checkUsername);
const password=document.querySelector("#Password");
password.addEventListener("blur",checkPassword);



//PRENDO IL SELETTORE DEL FORM//
const form=document.querySelector("#form1");
form.addEventListener("submit",validazioneTotal);
const diverrore=document.querySelector(".errore");
diverrore.classList.add("hidden");


//MI PRENDO IL SELETTORE DI OGNI DIVERRORE//
const divNomeError=document.querySelector("#NomeError");

const divCognomeError=document.querySelector("#CognomeError");

const divEmailError=document.querySelector("#EmailError");

const divIndirizzoError=document.querySelector("#IndirizzoError");

const divUsernameError=document.querySelector("#UsernameError");

const divPasswordError=document.querySelector("#PasswordError");

const divAcceptError=document.querySelector("#AcceptError");


//VARIABILI USATE PER IL CONTROLLO//
let varPasswordError=null;
let varUsernameError=null;
let varEmailError=null;
