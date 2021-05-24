//CREAZIONE DATABASE//
CREATE DATABASE sitowebO46001999;
use sitowebO46001999 ;


CREATE TABLE prodotto(id_prodotto varchar(5)  not null PRIMARY KEY,tipologia varchar(40)  not null,titolo varchar(100)  not null,descrizione varchar(300)  not null,immagine varchar(100)  not null,prezzo double  not null,numbervideo int  not null,quantita int  not null);
CREATE TABLE utente(username varchar(40)  not null PRIMARY KEY,password varchar(255)  not null,nome varchar(40)  not null,cognome varchar(40)  not null,email varchar(40)  not null,indirizzo varchar(40)  not null);
CREATE TABLE preferiti(username varchar(40)  not null,id_prodotto varchar(5)  not null,PRIMARY KEY(username,id_prodotto),FOREIGN KEY (username) REFERENCES utente(username),FOREIGN KEY (id_prodotto) REFERENCES prodotto(id_prodotto));
CREATE TABLE cookies(id int  not null AUTO_INCREMENT PRIMARY KEY,username varchar(40)  not null,hash varchar(255)  not null,expires bigint  not null,FOREIGN KEY(username) REFERENCES utente(username));
CREATE TABLE carrello(username varchar(40)  not null,id_prodotto varchar(5)  not null,quantita int  not null,Acquistato tinyint  not null ,PRIMARY KEY(username,id_prodotto),FOREIGN KEY (username) REFERENCES utente(username),FOREIGN KEY (id_prodotto) REFERENCES prodotto(id_prodotto));




//INSERIMENTO SMARTPHONE//
INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S1","Smartphone","samsung S21","Samsung Galaxy S21 è uno smartphone Android avanzato e completo sotto tutti i punti di vista con alcune eccellenze. Dispone di un grande display da 6.2 pollici con una risoluzione di 2400x1080 pixel. Le funzionalità offerte da questo smartphone sono molteplici","images/samsungS21.jpg",700.00,1,30);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S2","Smartphone","asus Zenfone7","Asus Zenfone  è uno smartphone molto completa,con Sistema operativo incluso Android 10.0, Famiglia processore Qualcomm Snapdragon ,Modello del processore 865,Dimensioni schermo 6.67,Capacità memoria interna 128  GB Bluetooth Sì,connessione internet 4G","images/asusZenfone7.jpg",500.00,0,25);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S3","Smartphone","xiaomi Mi10T","Mi 10T vanta un sensore AI da 64MP, la capacità di catturare scatti panoramici ultra-wide-angle e le modalità ritratto e macro.Mi 10T vi porta nel 5G grazie al processore Qualcomm Snapdragon 865 e la sua CPU Octa-Core.Mi 10T monta un DotDisplay FHD+ da 6.67 con TrueColor","images/xiaomi Mi 10T.jpg",340.00,10,35);



INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S4","Smartphone","Iphone X","Display Liquid Retina HD da 6,1 (LCD),Resistente alla polvere e all’acqua (1 metro fino a 30 minuti, IP67)Fotocamera da 12MP (grandangolo) con modalità Ritratto, Illuminazione ritratto, Controllo profondità, Smart HDR e registrazione video 4K fino a 60 fps","images/iphoneX.jpg",540.00,0,20);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S5","Smartphone","xiaomi Mi11","Diventa un regista con Mi 11 5G grazie all intelligenza artificiale avanzata. Con il sensore cinematografico da 108MP, la fotocamera frontale da 13MP, il grandangolo da 123° e la fotocamera telemacro 5MP, Mi 11 5G offre diverse modalità di video making","images/xiaomi Mi11.jpg",600.00,5,35);



INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S6","Smartphone","samsung note10","Samsung Galaxy Note10 Smartphone, Display 6.3 Dynamic AMOLED, 256 GB Espandibili, SPen Air Action, RAM 8 GB, Batteria 3.500 mAh, 4G, Dual SIM, Android 9 Pie, [Versione Italiana],Con Galaxy Note 10 avrai   una memoria interna da 256 GB","images/samsung note 10.jpg",700.00,1,15);



INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S7","Smartphone","Huawei P30 Pro","Huawei P30 Pro - Smartphone 256GB, 8GB RAM, Dual Sim, Silver Frost,Fotocamera SuperSensing, zoom ibrido 10x, zoom massimo. 50XTecnologia HUAWEI SuperCharge da 40 WSchermo OLED da 6.47 polliciFotocamera quadrupla Leica, obiettivo SuperZoom","images/huaweyp30.jpg",492.00,0,10);



INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S8","Smartphone","Iphone12","Display Super Retina XDR da 6,1,Ceramic Shield, più duro di qualsiasi vetro per smartphone,5G per download velocissimi e streaming ad alta qualità,A14 Bionic, il chip più veloce mai visto su uno smartphone,Evoluto sistema a doppia fotocamera da 12MP","images/iphone12.jpg",900.00,2,30);



INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("S9","Smartphone","samsung A51","Samsung Galaxy A51 Smartphone, Display 6.5 Super AMOLED, 4 Fotocamere Posteriori, 128 GB Espandibili, RAM 4 GB, Batteria 4000 mAh, 4G, Dual Sim, Android 10,Samsung galaxy A51 vanta un Processore OctaCore e 4 GB di RAM per prestazioni fluide e efficienti","images/samsung galaxy A51.jpg",250.00,1,20);

//INSERIMENTO COMPUTER//

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C1","Computer","Asus Zenbook 3","Asus ZenBook 3 Notebook da 12.5, i7-7500U, SDD 512 MB, 4 GB, Intel HD Graphics 620.Design elegante e raffinato ultra sottile e leggero: Spesso solo 11.9 mm, pesa solo 910 grCompatto e potente: processore Intel Core i7-7500U (2.7 GHz),uno dei pc piu votati","images/AsusZenbook3.jpg",1400.00,0,30);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C2","Computer","Lenovo Ideapad 5","Lenovo IdeaPad 5 Notebook, Display 14 Full HD IPS, Processore AMD Ryzen 7 4700U, 512 GB SSD, RAM 8 GB, Windows 10.Processore AMD Ryzen 7 4700U (8C / 8T, 2.0 / 4.1GHz, 4MB L2 / 8MB L3); con questo processore si hanno ottime prestazioni.","images/LenovoIdeapad5.jpg",900.00,3,25);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C3","Computer","ASUS Notebook","ASUS TUF Gaming FX505DT-BQ256T Computer portatile Nero 39,6 cm (15.6) 1920 x 1080 Pixel AMD Ryzen 7 16 GB DDR4-SDRAM 1512 GB HDD+SSD NVIDIA GeForce GTX 1650 Wi-Fi 5 (802.11ac) Windows 10 Home,Dimensione memoria computer  16 GB","images/AsusGamingNotebook.jpg",1088.00,4,20);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C4","Computer","Huawei Matebook","HUAWEI MateBook D 14 Laptop, Full View 1080P FHD Ultrabook, Intel Core i5-10210U, RAM 16GB, SSD da 512GB, Windows 10 Home,Produttore CPU Intel,Dimensioni schermo 14 Pollici Dimensione memoria computer:512 GB","images/HuaweyMatebookPro.jpg ",750.00,1,15);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C5","Computer","Asus Chromebook","Notebook leggero e compatto: solo 1 kg di peso per portarlo sempre con te.Velocità e funzionalità garantite da processore Intel Celeron N3350, scheda grafica integrata Intel HD Graphics 500 e sistema operativo Chrome veloce,Presenza di SSD","images/AsusChromeBook.jpg",235.00,1,20);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C6","Computer","HP ZBook Studio G7","HP ZBook Studio G7 Mobile Workstation con NVIDIA RTX3000 OS:Windows 10 Pro per workstation, Processore:Intel® Core™ i7-10850H Schermo FullHD (15,6)(1920 x 1080)32 GB di SDRAM ,Memoria Fisicia:SSD PCI  NVMe™ da 1 TB","images/NotebookZetahp.jpg",3300.50,0,10);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C7","Computer","Acer Aspire 3","Acer Aspire SSD Silver new Athlon 3050u, ram 12 Gb Ddr4, SSD M.2 PCi, Display Full Hd da 15,6, web cam, usb, hdmi, bt, lan, Win10 Pro.Modello CPU	Athlon Silver 3050U Risoluzione	1080p,Dimensioni disco rigido 256 GB","images/AcerASpire3.jpg ",660.00,2,20);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C8","Computer","Dell Latitude","Notebook 15 Pollici Intel i7, SSD 512 gb + Ram 16 gb, S.O. Windows 10 Pro.Marchio processore:Intel,Tipo processore:Core i7,Numero processori:1,Dimensioni RAM:16 GB,Tecnologia di memoria LPDDR3","images/DellLatitude9510.jpg",1602.00,0,25);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("C9","Computer","Galaxy Book S ","Samsung Galaxy Book S Wi-Fi  Windows | 10 Home, Display Touch Screen 13.3 FHD LCD, Batteria 42Wh, RAM 8GB, Memoria 512GB.Grazie al pulsante di avvio con sensore di impronte digitali, accendi e accedi nello stesso istante","images/GalaxyBookS.jpg",893.00,2,30);


//CARICAMENTO ACCESSORI//

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A1","Accessori","Razer Mamba","Razer Mamba Wireless USB Gaming Mouse per PC che Offre fino a 50 Ore di Gameplay, Senza Fili, Sensore Ottico 5G, 7 Tasti Programmabili e Illuminazione RGB","images/RazerMamba.jpg",130.00,0,20);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A2","Accessori","Predator Cestus","Predator Cestus 330 Mouse Gaming,Design confortevole,Impostazioni DPI a 5 livelli, dal sensore Pixart 3335,7 pulsanti programmabili,16 000 DPI massimo","images/PredatorCestus.jpg",70.00,0,25);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A3","Accessori","Logitech G305","Logitech G305 LIGHTSPEED Mouse Gaming Wireless, Sensore 12K HERO, 12.000 DPI, Design Leggero, 6 Pulsanti Programmabili, Batteria 250 Ore, Memoria Integrata","images/LogitechG310.jpg",150.00,0,15);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A4","Accessori","Sony WH-CH510","Le cuffie WH-CH510 sono wireless, leggere e hanno una batteria a lunga durata. Ascolta i tuoi brani in modalità wireless con la tecnologia Bluetooth oppure tramite connessione cablata","images/SonyWH510.jpg",180.00,1,30);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A5","Accessori","Razer Kraken","Razer Kraken X per Console Cuffie da Gioco Leggera per PC, Mac, PS4, Xbox One & Switch con Audio Surround 7.1, Pulsanti di Controllo sulla Cuffia,molto comode","images/RazerKraken.jpg",70.00,4,30);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A6","Accessori","Logitech G910","Logitech G910 Orion Spectrum Tastiera Gaming Meccanica Illuminata, Tasti illuminati,Switch Romer-G Tactile, 9 tasti  Programmabili,molto comoda per giocare e per l'ufficio","images/LogitechG910.jpg ",250.00,1,15);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A7","Accessori","Corsair Strafe ","Corsair Strafe RGB MK.2 Silent Tastiera Meccanica Gaming, Cherry MX Silent, Retroilluminazione RGB Multicolore, layout:Italiano QWERTY,connettività USB","images/CorsairStrafe.jpg",130.00,6,20);


INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A8","Accessori","OculusRift","L'Oculus Rift è uno schermo per la realtà virtuale da usare soprattutto per i videogiochi.L'Oculus, che pesa molto meno degli altri caschi  si può usare a lungo senza affaticare gli occhi.","images/OculusRift.jpg",350.00,4,15);

INSERT INTO prodotto(id_prodotto,tipologia,titolo,descrizione,immagine,prezzo,numbervideo,quantita)VALUES("A9","Accessori","Airpods","Apple AirPods con custodia di ricarica wireless (seconda generazione),Taglia unica, comodi da indossare tutto il giorno La custodia si ricarica in wireless,sia tramite connettore lightning","images/Airpods.jpg",185.00,1,25);

  //TRIGGERS SE SI LAVORA DA CMD COPIARE UNA RIGA ALLA VOLTA PER EVITARE PROBLEMI//  
    
DELIMITER //
 CREATE TRIGGER AGG_Quantita AFTER DELETE ON carrello FOR EACH ROW BEGIN IF old.Acquistato=1 THEN UPDATE prodotto SET prodotto.quantita=prodotto.quantita-old.quantita WHERE prodotto.id_prodotto=old.id_prodotto; END IF; END // 
 DELIMITER ;



