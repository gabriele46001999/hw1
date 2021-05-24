//AL CARICAMENTO DELLA PAGINA CHIAMO AGGIORNACarrello//
aggiornaCarrello();
const testosearchbox=document.querySelector(".searchbox h1");
const parametro=testosearchbox.textContent;

//PARTE REST API KEY//
//DAL JSON OTTENGO L'SRC DELLA FOTO CHE USERO PER SETTARE LA FOTO DI BACKGROUND DEL HEADER//
function onJson(json)
{
  console.log(json);
  const list=json.hits;
  const src=list[2].largeImageURL;
    console.log(src);
    const header=document.querySelector("header");
    header.style.backgroundImage="url("+src+")";
  }


  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

//All'apertura della pagina, richiediamo L'ACCESSO TRAMITE APIKEY A PIXELBAY PASSANDO COME PARAMETRO CARRELLO//
  const parametroquery=encodeURIComponent(parametro.substr(13,8));
fetch("http://localhost/hw4consegnav3/ajax_apiGET.php?search="+parametroquery).then(onResponse).then(onJson);



function deleteItem(event){
  const deletebutton=event.currentTarget;
  const divtitle=deletebutton.parentNode;
  const itempreferiti=divtitle.parentNode;
  const id_prodotto=encodeURIComponent(itempreferiti.dataset.element);
  fetch("http://localhost/hw4consegnav3/ajax_dbRemoveItemCarrello.php?prodotto="+id_prodotto).then(aggiornaCarrello);
}

//FUNZIONE CHE AL CLICK SUL TASTO UNLIKE DECREMENTA DI UNO LA QUANTITA//
function rimuoviItem(event){
      const dislike=event.currentTarget;
      const divtitle=dislike.parentNode;
      const itempreferiti=divtitle.parentNode;
      const id_prodotto=encodeURIComponent(itempreferiti.dataset.element);
      fetch("http://localhost/hw4consegnav3/ajax_dbDecQuantita.php?prodotto="+id_prodotto).then(aggiornaCarrello);
  }


  function aggiungiItem(event){
    const like=event.currentTarget;
    const divtitle=like.parentNode;
    const itempreferiti=divtitle.parentNode;
    const id_prodotto=encodeURIComponent(itempreferiti.dataset.element);
    fetch("http://localhost/hw4consegnav3/ajax_dbAddQuantitaCarrello.php?prodotto="+id_prodotto).then(aggiornaCarrello);
  }



function onJsonResponse(json){
  console.log(json);
  const section=document.querySelector(".flex-section");
  const diverroreContainer=document.querySelector("#diverrore");
  diverroreContainer.innerHTML="";
  if(json==null){
    section.innerHTML="";
    const testo=document.createElement("h1");
    testo.textContent="Hai Acquistato tutto correttamente";
    section.appendChild(testo);
  }
  else{
    const titolo=document.createElement("h2");
    titolo.textContent="QUANTITA SCELTA MAGGIORE DI QUELLA DISPONIBILE NEI SEGUENTI PRODOTTI:";
    diverroreContainer.appendChild(titolo);
   for(elemento of json){
      const diverrore=document.createElement("div");
      diverrore.classList.add("flex-itemerrore");
      const id_prodotto=document.createElement("p");
      id_prodotto.textContent="Prodotto:"+elemento.titolo;
      const quantita=document.createElement("p");
      quantita.textContent="Quantita Disponibile:"+elemento.quantita;
      const helper=document.createElement("p");
      if(elemento.quantita>0){
      helper.textContent="Diminuisci la quantita per completare l'acquisto";
      }
      if(elemento.quantita==0){
        helper.textContent="Prodotto Attualmente non Disponbile rimuovilo per completare l'acquisto";
      }

      diverrore.appendChild(id_prodotto);
      diverrore.appendChild(quantita);
      diverrore.appendChild(helper);
      diverroreContainer.appendChild(diverrore);
      }
  }
}


function onResponse(response){
  return response.json();
}

//FUNZIONE CHE QUANDO VIENE CHIAMATA SVUOTA LA SECTION DICE AL UTENTE CHE TUTTO E STATO ACQUISTATO(SE VI E IL PAGAMENTO),ED ELIMINA DAL DATABASE TUTTI GLI ELEMENTI DEL UTENTE//
function acquista(event){
  fetch("http://localhost/hw4consegnav3/ajax_dbremovecarrelloAlll.php").then(onResponse).then(onJsonResponse);
}






//CREO DINAMICAMENTE I DIV IN BASE AL CONTENUTO DEL FILE PHP//
function onJsonDb(json){
  const section=document.querySelector(".flex-section");
  section.innerHTML="";
  const diverrore=document.querySelector("#diverrore");
  if(diverrore!=null){
    diverrore.innerHTML="";
  }
  let valueprice=0;
  let prezzoelemento=0;
  if(json.length==0){
    const testo=document.createElement("h1");
    testo.textContent="NON HAI INSERITO NESSUN ELEMENTO NEL CARRELLO";
    section.appendChild(testo);
  }
  else{
    for(evento of json){
      index=evento.id_prodotto;
      const div=document.createElement("div");
      div.setAttribute("data-element",index);
      div.classList.add("flex-itemsection");
      section.appendChild(div);
      const immaginedesc=document.createElement("img");
      immaginedesc.src=evento.immagine;
      immaginedesc.setAttribute("id","immaginedescrizione");
      div.appendChild(immaginedesc);
      const divtitle=document.createElement("div");
      divtitle.classList.add("title");
      const title=document.createElement("p");
      title.textContent=evento.descrizione;
      const immagineadd=document.createElement("img");
      immagineadd.src="images/liker.png";
      immagineadd.addEventListener("click",aggiungiItem);
      const immagineundo=document.createElement("img");
      immagineundo.src="images/unliker.png";
      immagineundo.addEventListener("click",rimuoviItem);
      const immaginedelete=document.createElement("img");
      immaginedelete.src="images/delete.png";
      immaginedelete.addEventListener("click",deleteItem);
      divtitle.appendChild(title);
      divtitle.appendChild(immagineadd);
      divtitle.appendChild(immagineundo);
      divtitle.appendChild(immaginedelete);
      div.appendChild(divtitle);
      const divinformation=document.createElement("div");
      divinformation.classList.add("information");
      const prezzo=document.createElement("h3");
      prezzo.textContent="PREZZO:"+evento.prezzo+"€";
      const quantita=document.createElement("h3");
      quantita.textContent="Quantita:"+evento.quantita;
      //CALCOLO IL PREZZO TOTALE DEI PRODOTTI NEL CARRELLO//
      valueprice=valueprice+(parseInt(evento.prezzo)*parseInt(evento.quantita));
      divinformation.appendChild(prezzo);
      divinformation.appendChild(quantita);
      div.appendChild(divinformation);
  }
  const divacquista=document.createElement("div");
  divacquista.classList.add("acquista");
  const title=document.createElement("p");
  title.textContent="TOTALE="+valueprice+"€";
  const bottone=document.createElement("span");
  bottone.classList.add("button");
  bottone.textContent="ACQUISTA";
  divacquista.appendChild(title);
  divacquista.appendChild(bottone);
  bottone.addEventListener("click",acquista);
  section.appendChild(divacquista);
}
}



function responseAggiorna(response){
  return response.json();
}

function aggiornaCarrello(){
  //RICHIEDE LA LISTA DEGLI EVENTI AD UNA PAGINA PHP TRAMITE ajax
  fetch("http://localhost/hw4consegnav3/ajax_dbShowcarrello.php").then(responseAggiorna).then(onJsonDb);
}
