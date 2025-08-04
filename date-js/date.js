/*DATE: tutto ciò che non è un primitivo in Javascript è considerato un oggetto

*/
let date = new Date(); //in questo modo si inizializza una data
console.log(date); //mi logga la data al minuti esatto in cui chiamo questo script, devo reloadare la pagina perche cambi 
console.log(typeof date); //è un OGGETTO
console.dir(date);


let date2 = Date(); //è un metodo statico del oggetto date, non serve istanziarlo (ovvero no serve scrivere new Date())
console.log(date2);
console.log(typeof date2); // è una STRING
//Con la stringa però non posso farci molto


//9-11-25
//Il sito della Nasa però esprime la data così: YYYY-MM-GG (2025-07-11)

console.log("------Get day, month, ecc----");
console.log(date.getDay()); //ATTENZIONE: Da il giorno della settimana: 5 (= venerdì)
console.log(date.getDate());//giorno
console.log(date.getMonth()); //ATTENZIONE: ????
console.log(date.getFullYear()); //anno
console.log(`Sono le ${date.getHours()}:${date.getMinutes()}`);

console.log("---Now---");
let date3 = Date.now(); //data espressa in millisecondi a partire dal 1 gennaio 1970 (unix time)
console.log(date3);
console.log(typeof date3); //numero
console.dir(date3);

console.log(Date.parse(date2)); // prende una STRINGA che contine una data e la converte in millisecondi partendo dal 1 gennaio 1970

console.log("---Timestamp---");
let timestamp = date.getTime();
console.log(timestamp); 

console.log("---Get methods---");
//const day = date.getDate();
//const month = date.getMonth();
//const year = date.getFullYear();

const  [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];//ho dichiarato insieme 3 varibili  

console.log(day, month, year);

console.log("---Data diversa da quella odierna---");

let date4 = new Date(2000, 2, 21); //In questo modo decido io su quale data lavorare
let date5 = new Date(2000, 2, 21, 8, 52, 43);
console.log(date4);
console.log(date5);
console.log(Date.parse(date4)); //Trasforma il 21 marzo 2000 in milisecondi 
let dateFromMilliseconds = new Date(953593200000); //prende i milicondi (generati sopra) e li trasforma nella corrsipettiva data (21 marzo 2000)
console.log(dateFromMilliseconds);

//Posso usare anche una stringa:

let date6 = new Date("2000-02-21T08:52:43");
console.log(date6);

console.log("---Convert Date");
console.log(date.toString()); //Risultato: Fri Jul 11 2025 20:18:19 GMT+0200 (Ora legale dell’Europa centrale)
console.log(date.toDateString()); //Risultato: Fri Jul 11 2025
console.log(date.toTimeString()); //Risultato: 20:19:49 GMT+0200 (Ora legale dell’Europa centrale)
console.log(date.toISOString()); //Risultato: 2025-07-11T18:20:34.436Z
console.log(date.toJSON()); //Formato JSON 
console.log(date.toLocaleString()); //La trasforma nel formato del paese locale (in base alla lingua del browser): 11/07/2025, 20:29:01
console.log(date.toLocaleDateString()); //11/07/2025


console.log(date.setFullYear(2024)); //Posso anche cambiare l'anno alla data originaria
console.log(date);




