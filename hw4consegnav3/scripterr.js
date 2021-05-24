const testosearchbox=document.querySelector(".searchbox h1");
const parametro=testosearchbox.textContent;
const preferiti=document.querySelector(".preferiti");
preferiti.classList.add("hidden");
const MAP={};
//ASSOCIO ALLA BARRA DI RICERCA AL EVENTO KEYUP LA FUNZIONE showsearch//
const searchbox=document.querySelector("#searchbox-item input");
searchbox.addEventListener('keyup',showsearch);
//AL CARICAMENTO DELLA PAGINA RICHIEDO IL TOKEN TRAMITE FETCH ALLA PAGINA PHP//
let access_token;
let videonumber;
const body=document.querySelector("body");
const modalview=document.querySelector(".modal-view");
modalview.classList.add("hidden");
fetch("http://localhost/hw4consegnav3/ajax_apiPostRequestToken.php").then(onSuccessToken).then(onJsonToken);
//CHIAMO CHECKUSER CHE CONTROLLA SE SIAMO REGISTRATI O MENO ED ESEGUE LE FUNZIONI AL CARICAMENTO DELLA PAGINA//
let usernameUser=null;
checkUser();


  function usernameJson(json){
  usernameUser=json;
  queryDBprefer();
  //CARICA INIZIALMENTE LA LISTA DI PRODOTTI CHE ABBIAMO DAL DB//
  aggiornaProdotti();
  //OGNI 3 SECONDI ESEGUO refreshQuantity SE SI E REGISTRATI//
  if(usernameUser){
  window.setInterval("refreshQuantity()", 300);
}
}


  function sessionResponse(response){
    return response.json();
  }



  //VEDO SE L'UTENTE E REGISTRATO AL CARICAMENTO DELLA PAGINA//
  function checkUser(){
    fetch("http://localhost/hw4consegnav3/ajax_getSession.php").then(sessionResponse).then(usernameJson);
  }



function refreshJson(json){
  const caselle=document.querySelectorAll(".flex-itemsection");
  //PER OGNI ELEMENTO NEL JSON OTTENGO QUANTITA E MODIFICO QUELLA VISUALIZZATA//
    for(const casella of caselle){
      const  quantita=casella.querySelector("#quantita");
      const divnew=casella.querySelector(".information div");
      const scelta=casella.querySelector("#scelta");
        if(quantita!=null &&divnew!=null && scelta!=null ){   //METTO TALE RIGA PERCHE NON SEMPRE SARANNO VISIBILI MA SOLO QUANDO CLICCO SU SHWOMORE//
        const index=casella.dataset.element.substr(1,1);
        console.log(index);
        const evento=json[index-1];
        quantita.textContent="Quantita:"+evento.quantita;
        if(evento.quantita==0){
          quantita.textContent="Prodotto non Disponbile";
          scelta.classList.add("hidden");
          divnew.classList.add("hidden");
        }
        if(evento.quantita>0){
          scelta.classList.remove("hidden");
          divnew.classList.remove("hidden");
        }
      }
      }
}


function refreshResponse(response){
  return response.json();
}


//OGNI 3 SECODNI AGGIORNO LA VISUALIZZAZIONE DELLA QUANTITA DISPONIBILE ED IN CASO FACCIO SPUNTARE PRODOTTO NON DISPONIBILE//
function refreshQuantity(){
  const tipologia=parametro.substr(15,10);
fetch("http://localhost/hw4consegnav3/ajax_AggiornaProdotti.php?partipologia="+tipologia).then(refreshResponse).then(refreshJson);
}


//FUNZIONE CHE GESTISCE INSERIMENTO NEL CARRELLO//


function jsonInsert(json){
  if(json!=null){
    const error=divnew.querySelector("p");
    if(error!=null){
  error.textContent=json;
}
  else{
    const error=document.createElement("p");
     error.textContent=json;
     divnew.appendChild(error);
  }
}
else{
  const error=divnew.querySelector("p");
  if(error!=null){
error.textContent="Elemento Aggiunto";
}
else{
  const error=document.createElement("p");
   error.textContent="Elemento Aggiunto";
   divnew.appendChild(error);
}
}
}


function responseInsertCarrello(response){
   return response.json();
}

//FUNZIONE PER INSERIRE NEL CARRELLO AL CLICK E DOPO DEVO AGGIORNARE LA QUANTITA DEL PRODOTTO CHE HA QUEL INDICE//
function insertcarrello(event){
  let notnumber=0;
  const preferbutton=event.currentTarget;
   divnew=preferbutton.parentNode;
  const divinformation=divnew.parentNode;
  const casella=divinformation.parentNode;
  const indice=casella.dataset.element;
  const numberelement=casella.querySelector("input").value;
  for(let i=0; i<numberelement.length; i++){
   const carattere=numberelement.charCodeAt(i);
   if(carattere<48 || carattere>57){
      notnumber++; //INCREMENTO IL NUMERO DI NUMERI//
   }
 }
   if(notnumber>0){
     const error=divnew.querySelector("p");
     if(error==null){
       errorp=document.createElement("p");
       errorp.textContent="Inserisci un numero";
       divnew.appendChild(errorp);
   }
   else{
     error.textContent="Inserisci un numero";
   }
   }
   else{
  fetch("http://localhost/hw4consegnav3/ajax_dbInsertCarrello.php?id_prodotto="+indice+"&numero="+numberelement).then(responseInsertCarrello).then(jsonInsert);
}
}
let divnew=null;

//FUNZIONE CHE GESTISCE INSERIMENTO NEL CARRELLO//



function showless(event){
  const bottoneless=event.currentTarget;
  const divinformation=bottoneless.parentNode;
  const casella=divinformation.parentNode;
  divinformation.innerHTML="";
  divinformation.classList.add("hidden");
  const bottonemore=casella.querySelector("span");
  bottonemore.classList.remove("hidden");
}


function showMoreJson(json){
  const messaggeErorr=document.querySelector("#erroreMsg");
  const descrizione=document.createElement("p");
  const prezzo=document.createElement("h3");
  const bottoneless=document.createElement("span");
  bottoneless.classList.add("button");
  bottoneless.textContent="SHOW LESS";
  descrizione.textContent=json.descrizione;
  prezzo.textContent="PREZZO:"+json.prezzo+"€";
  const div=flexitemcliccato.querySelector(".information");
  div.classList.remove("hidden");
  div.appendChild(descrizione);
  div.appendChild(prezzo);
  //SE L'UTENTE E REGISTRATO VIENE VISUALIZZATO LA Quantita//
  //ASSEGNO UN ID A QUANTITA COSI DOPO POSSO RECUPERARLO QUANDO DEVO MODIFICARLO//
  if(usernameUser){
  const quantita=document.createElement("h3");
  quantita.textContent="Quantita:"+json.quantita;
  quantita.setAttribute("id","quantita");
  div.appendChild(quantita);
  const scelta=document.createElement("p");
  scelta.setAttribute("id","scelta");
  scelta.textContent="Scegli Quantita";
  const divscelta=document.createElement("div");
  const input=document.createElement("input");
  input.setAttribute("type","text");
  const immaginecarrello=document.createElement("img");
  immaginecarrello.src="images/aggiungicarrello.jpg";
  if(json.quantita==0){
    quantita.textContent="Prodotto non Disponbile";
    scelta.classList.add("hidden");
    divscelta.classList.add("hidden");
  }
  div.appendChild(scelta);
  divscelta.appendChild(input);
  divscelta.appendChild(immaginecarrello);
  div.appendChild(divscelta);
  immaginecarrello.addEventListener('click',insertcarrello);
}
  div.appendChild(bottoneless);
  bottoneless.addEventListener('click',showless);
}


function showmoreResponse(response){
  return response.json();
}


function showmore(event){
  const bottonemore=event.currentTarget;
  flexitemcliccato=bottonemore.parentNode;
  const id_prodotto=flexitemcliccato.dataset.element;
  bottonemore.classList.add("hidden");
  fetch("http://localhost/hw4consegnav3/ajax_dbShowProdotto.php?prodotto="+id_prodotto).then(showmoreResponse).then(showMoreJson);
}
let flexitemcliccato=null;




//GESTIONE DELLA RICERCA TRAMITE PHP//

function onSearchResponse(response){
  return response.json();
}


function showsearch(event){
  const searchbox=event.currentTarget;
  let filter=searchbox.value.toUpperCase();
  filter='%'+filter+'%';
  filter=encodeURIComponent(filter);
  const tipologia=parametro.substr(15,10); //PRENDE 10 CARATTERI DAL 15 COSI PRENDE SOLAMENTE SMARTPHONE//
  fetch("http://localhost/hw4consegnav3/ajax_dbsearchbar.php?pagina="+tipologia+"&values="+filter).then(onSearchResponse).then(onJsonDb);
}



function rimuovipreferiti(event){
    const dislike=event.currentTarget;
    const divtitle=dislike.parentNode;
    const itempreferiti=divtitle.parentNode;
    const id_prodotto=encodeURIComponent(itempreferiti.dataset.element);
    const flexsection=preferiti.querySelector(".preferiti-container");
    const figli=flexsection.childNodes;
  if(figli.length==1){
    preferiti.classList.add("hidden");
  }
  const preferbuttons=document.querySelectorAll(".flex-itemsection .title img");
  //RIATTIVA IL LISTENER SOLAMENTE DI QUELLO DA ELIMINARE//
  for(const button of preferbuttons){
        if(button.parentNode.parentNode.dataset.element===id_prodotto);
         button.addEventListener("click",insertpreferiti);
}
    fetch("http://localhost/hw4consegnav3/ajax_dbremovePreferiti.php?prodotto="+id_prodotto).then(queryDBprefer);
}




function onJsonDbPreferiti(json){
  const flexsection=preferiti.querySelector(".preferiti-container");
  flexsection.innerHTML="";
  for(preferito of json){
  preferiti.classList.remove("hidden");
  const flexitem=document.createElement("div")
  flexitem.classList.add("item-preferiti");
  flexitem.setAttribute("data-element",preferito.id_prodotto);
  flexsection.appendChild(flexitem)
  const divtitlepreferiti=document.createElement("div");
  divtitlepreferiti.classList.add("title");
  flexitem.appendChild(divtitlepreferiti);
  const title=document.createElement("h1");
  title.textContent=preferito.titolo;
  const immagineunprefer=document.createElement("img");
  immagineunprefer.src='images/unliker.png';
  divtitlepreferiti.appendChild(title);
  divtitlepreferiti.appendChild(immagineunprefer);
  const imgdesc=document.createElement("img");
  imgdesc.src=preferito.immagine;
  flexitem.appendChild(imgdesc);
  const bottonedislike=divtitlepreferiti.querySelector("img");
  bottonedislike.addEventListener("click",rimuovipreferiti);
 }
}


function responsePreferiti(response){
  return response.json();
}


function queryDBprefer(){
  const tipologia=parametro.substr(15,10);
  const text=preferiti.querySelector("h1");
  //QUESTA VERRA ESEGUITA SE L'UTENTE E REGISTRATO//
  if(usernameUser){
fetch("http://localhost/hw4consegnav3/ajax_dbpreferitishow.php?tipo="+tipologia).then(responsePreferiti).then(onJsonDbPreferiti);
}
if(usernameUser===null){
  //SE L'UTENTE NON E REGISTRATO VIENE VISUALIZZATO QUESTO//
  const flexsection=preferiti.querySelector(".preferiti-container");
  preferiti.classList.remove("hidden");
  text.textContent="REGISTRATI PER GESTIRE I PREFERITI E IL CARRELLO";
}
}







//FUNZIONE PER INSERIRE I PREFERITI NEL DATABASE AL CLICK //
function insertpreferiti(event){
  //RICHIEDE LA LISTA DEGLI EVENTI AD UNA PAGINA PHP TRAMITE ajax
   const preferbutton=event.currentTarget;
   const divtitlesection=preferbutton.parentNode;
   const casella=divtitlesection.parentNode;
   const indice=casella.dataset.element;
  const id_prodotto=encodeURIComponent(MAP[indice].id_prodotto);
  fetch("http://localhost/hw4consegnav3/ajax_dbInsertpreferiti.php?id_prodotto="+id_prodotto).then(queryDBprefer);
  preferbutton.removeEventListener("click",insertpreferiti);
}









//PARTE REST API KEY//
//DAL JSON OTTENGO L'SRC DELLA FOTO CHE USERO PER SETTARE LA FOTO DI BACKGROUND DEL HEADER//
function onJson(json)
{
  console.log(json);
  const list=json.hits;
  let numberphoto;
  let pagina=parametro.substr(15,10);
  if(pagina=="Smartphone"){
    numberphoto=14;
  }
  if(pagina=="Computer"){
    numberphoto=3;
  }
  if(pagina=="Accessori"){
    numberphoto=2;
  }
    const src=list[numberphoto].largeImageURL;
    console.log(src);
    const header=document.querySelector("header");
    header.style.backgroundImage="url("+src+")";
  }


  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


  const parametroquery=encodeURIComponent(parametro.substr(15,10));
//All'apertura della pagina, richiediamo L'ACCESSO TRAMITE APIKEY A PIXELBAY
fetch("http://localhost/hw4consegnav3/ajax_apiGET.php?search="+parametroquery).then(onResponse).then(onJson);

//PARTE REST API KEY//




//DAL JSON OTTENUTO ESTRAGGO L SRC DEL VIDEO ED CREO UN COMPONENTE IFRAME CON TALE SRC//
function onJsonTokenVideo(json){
   console.log(json);
   const listvideo=json.data;
   const video=listvideo[videonumber];
   console.log(video);
   const link=video.link;
   //ESTRATTO DAL LINK OTTENUTO DAL JSON IL NUMERO CHE IDENTIFICA IL VIDEO//
   const linkestratto=link.substring(18);
   //OTTENGO IL LINK DA METTERE NEL SRC DEL COMPONENTE IFRAME
   const linkperfetto="https://player.vimeo.com/video/"+linkestratto;
   const videocomponent=document.createElement("iframe");
   videocomponent.src=linkperfetto;
   modalview.appendChild(videocomponent);
}


//RITORNO IL JSON CON IL TOKEN//
function onTokenVideoSuccess(response){
  console.log('Risposta ricevuta');
	return response.json();
}




//FUNZIONE CHE AL CLICK SULLA MODALE,FA RITORNARE LA PAGINA PRECEDENTE//
function onModalClick(event){
  body.classList.remove("noscroll");
  modalview.innerHTML="";
  modalview.classList.add("hidden");
}

//LA FUNZIONE onModalDisplay mostrerà la MODAL ED ESEGUIRA LA FETCH A VIMEO PER OTTENERE IL VIDEO//
function onModalDisplay(event){
  const casella=event.currentTarget.parentNode;
  //NEL FILE JSON RESULT_MAP HO UN NUMBER PER OTTENERE UN VIDEO ESATTO//
  videonumber=MAP[casella.dataset.element].numbervideo;
  const title=casella.querySelector(".flex-itemsection .title h1");
  //ESEGUO LA FETCH PASSANDO COME PARAMETRO IL TITOLO DEL DIV CLICCATO//
  const titleText=encodeURIComponent(title.textContent);
  // All'apertura della pagina, richiediamo il token
  fetch("http://localhost/hw4consegnav3/ajax_apiPost.php?token="+access_token+"&parametro="+titleText).then(onTokenVideoSuccess).then(onJsonTokenVideo);
  modalview.style.top=window.pageYOffset+'px';
  modalview.classList.remove("hidden");
  body.classList.add("noscroll");
  const titledescript=document.createElement("h1");
  titledescript.textContent="CONTENUTO MULTIMEDIALE IN ESECUZIONE";
  modalview.appendChild(titledescript);
  //METTO UN LISTENER SULLA MODALE CHE AL CLICK LA FARA CHIUDERE//
  modalview.addEventListener('click',onModalClick);
}


//ASSOCIO IL TOKEN PRELEVANDOLO DAL FILE JSON RESTITUITO NELLA RESPONSE//
function onJsonToken(json){
   console.log(json);
   access_token=json.access_token;
   }

//RITORNO IL JSON CON IL TOKEN//
function onSuccessToken(response){
	console.log('Risposta ricevuta');
	return response.json();
}
//PARTE PER API VIMEO OAUTH2//


//CARICAMENTO DINAMICO DEI CONTENUTI//
function onJsonDb(json){
   console.log(json);
   //OGNI VOLTA CHE CHIAMO TALE FUNZIONE SVUOTO LA SECTION//
   const section=document.querySelector(".flex-section");
   section.innerHTML="";
    for(evento of json){
      index=evento.id_prodotto;
      MAP[index]=evento;
      const div=document.createElement("div");
      div.setAttribute("data-element",index);
      div.classList.add("flex-itemsection");
      section.appendChild(div);
      const divtitle=document.createElement("div");
      divtitle.classList.add("title");
      const title=document.createElement("h1");
      title.textContent=evento.titolo;
      const immaginelike=document.createElement("img");
      immaginelike.src="images/liker.png";
      divtitle.appendChild(title);
      divtitle.appendChild(immaginelike);
      //SE L'UTENTE REGISTRATO AGGIUNGE IL LISTENER DEI PREFERITI//
      if(usernameUser!=null){
      immaginelike.addEventListener('click',insertpreferiti);
    }
      div.appendChild(divtitle);
      const immaginedesc=document.createElement("img");
      immaginedesc.src=evento.immagine;
      immaginedesc.setAttribute("id","immaginedescrizione");
      div.appendChild(immaginedesc);
      immaginedesc.addEventListener('click',onModalDisplay);
      const p1=document.createElement("p");
      p1.textContent="Clicca sulla foto per vedere il video";
      div.appendChild(p1);
      const divinformation=document.createElement("div");
      divinformation.classList.add("information");
      divinformation.classList.add("hidden");
      div.appendChild(divinformation);
      const bottonemore=document.createElement("span");
      bottonemore.textContent="SHOW MORE";
      bottonemore.classList.add("button");
      div.appendChild(bottonemore);
      bottonemore.addEventListener('click',showmore);
  }
  }



function responseAggiorna(response){
  return response.json();
}

function aggiornaProdotti(){
  const parametroquery=encodeURIComponent(parametro.substr(15,10)); //PRENDE 10 CARATTERI DAL 15 COSI PRENDE SOLAMENTE SMARTPHONE//
  //RICHIEDE LA LISTA DEGLI EVENTI AD UNA PAGINA PHP TRAMITE ajax
  fetch("http://localhost/hw4consegnav3/ajax_AggiornaProdotti.php?partipologia="+parametroquery).then(responseAggiorna).then(onJsonDb);
}
