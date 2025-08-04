import {qsa, qs, ce, getbyID} from "./utilities.js"; 
let apiKey = 'yuR9ywX2deYeG9r7rTg4Ikv1ZysBiBCoBdg00fwl';
let date = new Date().toISOString().split("T")[0];
//let date = new Date();
// Crea la data corrente nel formato "YYYY-MM-DD"
// 1. new Date() → crea un oggetto con la data e ora attuale
// 2. toISOString() → la converte in una stringa ISO (es. "2025-07-13T09:42:00.000Z")
// 3. split("T") → divide la stringa in ["2025-07-13", "ora..."]
// 4. [0] → prende solo la parte della data (senza ora)
console.log(date);

let header = qs("header");
header.classList.add("header")
let logo = getbyID("logo");

let buttonsLeft = ce("div");
buttonsLeft.classList.add("button-container");//non usato
logo.prepend(buttonsLeft);

let firstButton = ce("button");
firstButton.classList.add("header-button");
firstButton.textContent = "IMMAGINI";
buttonsLeft.appendChild(firstButton);

firstButton.addEventListener("click", () => {
    window.location = "other-images.html" 
});

let secondButton = ce("button");
secondButton.classList.add("header-button");
secondButton.textContent = "METEO MARTE";
buttonsLeft.appendChild(secondButton);

secondButton.addEventListener("click", () => {
    const target = document.getElementById("weather-container");
    target.scrollIntoView({ behavior: "smooth" });
});

let buttonsRight = ce("div");
buttonsLeft.classList.add("button-container");//non usato
logo.append(buttonsRight);

let thirdButton = ce("button");
thirdButton.classList.add("header-button");
thirdButton.textContent = "DESTINAZIONI";
buttonsRight.appendChild(thirdButton);
let forthButton = ce("button");
forthButton.classList.add("header-button");
forthButton.textContent = "MY TRIPS";
buttonsRight.appendChild(forthButton);


if(window.innerWidth <= 900){
    if(buttonsLeft) buttonsLeft.remove();
    if(buttonsRight) buttonsRight.remove();
    let hamburgerContainer = ce("div");
    hamburgerContainer.classList.add("hamburger-container");
    logo.prepend(hamburgerContainer);
    logo.style.justifyContent = "space-between";
    let hamburgerImg = ce("img");
    hamburgerImg.src = "img/hamburger.png";
    hamburgerImg.classList.add("hamburger-img");
    hamburgerContainer.appendChild(hamburgerImg);
    let isOpen = false; // Dichiari una variabile isOpen, inizialmente false perché il menu non è ancora aperto.
    hamburgerContainer.addEventListener("click", () => {
        if (!isOpen) { // se isOpen è false (cioè il menu è chiuso), allora:
            console.log("apri menu");
            let clickButtonsContainer = ce("div");
            clickButtonsContainer.classList.add("click-buttons-container");
            header.insertAdjacentElement("afterend", clickButtonsContainer);
            let clickButtons = ce("div");
            clickButtons.classList.add("click-buttons");
            clickButtons.id = "click-buttons"; // così possiamo ritrovarlo dopo
            clickButtonsContainer.appendChild(clickButtons);
            clickButtons.appendChild(buttonsLeft);
            clickButtons.appendChild(buttonsRight);
            hamburgerImg.src = "img/close.png";
            hamburgerImg.style.width = "1.4rem";
            isOpen = true;//e segna isOpen = true
        } else { //Se invece isOpen è true (cioè il menu è aperto):
            console.log("chiudi menu");
            let clickButtons = document.getElementById("click-buttons");
            if (clickButtons) clickButtons.remove();
            hamburgerImg.src = "img/hamburger.png";
            hamburgerImg.style.width = ""; // o valore originale
           isOpen = false;
        }
});

}

window.addEventListener("resize", () => {
  location.reload(); // ricarica e ricontrolla la dimensione
});


let container = ce("div");
container.classList.add("impact-container")
header.insertAdjacentElement("afterend", container);
let mainTitle = ce("h1");
mainTitle.classList.add("main-title");
mainTitle.textContent = "Il tuo punto di accesso all'universo";
container.appendChild(mainTitle);
let mainP = ce("p");
mainP.classList.add("main-p");
mainP.textContent= "Immagini, dati e curiosità dallo spazio - ogni giorno";
container.appendChild(mainP);


async function getImages(){
    let pictureOfTheDay = getbyID("picture-of-the-day");
    try{
        let results = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`);
        results = await results.json()
        console.log(results);
        let textContainer = ce("div");
        textContainer.classList.add("text-container");
        pictureOfTheDay.appendChild(textContainer);
        let intro = ce("p");
        intro.textContent = "OGGI";
        textContainer.appendChild(intro);
        let introTitle = ce("h2");
        introTitle.classList.add("intro-title");
        introTitle.textContent = "Immagine Del Giorno";
        textContainer.appendChild(introTitle);

        let copyright = ce("h5");
        copyright.classList.add("copyright");
        if(results.copyright){
            copyright.textContent = results.copyright.toUpperCase();
        }
        else {
            copyright.textContainer= "PUBLIC DOMAIN"
        }
        textContainer.appendChild(copyright);
        let theDate = ce("p");
        theDate.textContent = results.date;
        textContainer.appendChild(theDate);
        let explanaition = ce("p");
        explanaition.textContent = results.explanation;
        textContainer.appendChild(explanaition);
        let otherImages = ce("button");
        otherImages.classList.add("other-images");
        otherImages.textContent = "Dai un occhiata ad altre immagini"
        textContainer.appendChild(otherImages);
        otherImages.addEventListener("click", () => {
            window.location = "other-images.html" 
        })

        let picContainer = ce("div");
        picContainer.classList.add("pic-container")
        pictureOfTheDay.appendChild(picContainer);
        let imageFilter = ce("div");
        imageFilter.classList.add("img-filter");
        picContainer.appendChild(imageFilter);
        let image = ce("img");
        image.classList.add("img-of-the-day")
        image.src = results.url;
        imageFilter.appendChild(image);
        let download = ce("a");
        download.classList.add("download-button");
        download.textContent = "Download"
        download.addEventListener("click", () => {
            if (results.media_type === "image") {
                download.href = results.hdurl || results.url; // usa hd se disponibile
                download.download = "apod.jpg"; // nome file
                download.style.display = "inline-block"; // mostra il bottone se vuoi nasconderlo inizialmente
    }else {
      download.textContent = "Contenuto non scaricabile";
      download.href = "#";
      download.removeAttribute("download");
    }
})
picContainer.appendChild(download);



    }catch(err){
        console.log(err);
    }

}
getImages();

const main = qs("main");
let pathJSON = "exopianeti.JSON";

async function getPlanets() {
    let otherWorlds = ce("div");
    otherWorlds.classList.add("other-worlds");
    let discovery = ce("h4");
    discovery.textContent = "DISCOVER";
    otherWorlds.appendChild(discovery);
    let discoveryTrip= ce("h2");
    discoveryTrip.textContent = "OTHER WORLDS";
    otherWorlds.appendChild(discoveryTrip);
    main.appendChild(otherWorlds);
    
    let solarSystem = ce("div");
    solarSystem.classList.add("solar-system");
    main.appendChild(solarSystem);
    try {
        let results = await fetch(pathJSON);
        results = await results.json();
        console.log(results);

        let planets = ce("div");
        planets.classList.add("planets");
        solarSystem.appendChild(planets);
        let planetInfo = null; // fuori, in ambito più ampio
        results.forEach(dato => {
            let planetBtn = ce("p");
            planetBtn.textContent = dato.nome;
            planets.appendChild(planetBtn);

            
            planetBtn.addEventListener("click", () => {
                // se c'è già un planetInfo precedente, lo rimuovo
                if (planetInfo) {
                planetInfo.remove();
                console.log("Rimosso il planetInfo precedente");
            }

                planetInfo = ce("div");
                planetInfo.classList.add("planet-info");
                main.appendChild(planetInfo);

                let planetDetails = ce("div");
                planetDetails.classList.add("planet-details");
                planetInfo.appendChild(planetDetails);
                let planetName = ce("h3");
                planetName.textContent = dato.soprannome.toUpperCase();
                planetDetails.appendChild(planetName);
                let planetDistance = ce("p");
                planetDistance.classList.add("p-distance");
                planetDistance.textContent = `Distanza: ${dato.distanza_in_giorni} giorni`;
                planetDetails.appendChild(planetDistance);
                let planetDesciption = ce("p");
                planetDesciption.textContent = dato.descrizione;
                planetDetails.appendChild(planetDesciption);

                let planetMesurements = ce("div");
                planetMesurements.classList.add("planet-mesurements");
                planetDetails.appendChild(planetMesurements);

                let planetGravity = ce("div");
                planetMesurements.appendChild(planetGravity);
                let gravityPercentage = ce("h2");
                gravityPercentage.textContent = dato.gravita_percent;
                planetGravity.appendChild(gravityPercentage);
                let gravity = ce("p");
                gravity.textContent = "GRAVITY";
                planetGravity.appendChild(gravity);

                let planetDay = ce("div");
                planetMesurements.appendChild(planetDay);
                let planetH = ce("h2");
                planetH.textContent = dato.durata_giorno;
                planetDay.appendChild(planetH);

                let planetT = ce("div");
                planetMesurements.appendChild(planetT);
                let pTemperature = ce("h2");
                pTemperature.textContent = dato.temperatura_media;
                planetT.appendChild(pTemperature);
                let pAvTemp = ce("p");
                pAvTemp.textContent = "AVG TEMP";
                planetT.appendChild(pAvTemp);

                let tripBtn = ce("button");
                tripBtn.classList.add("other-images");
                tripBtn.textContent = "Prenota un viaggio";
                planetDetails.appendChild(tripBtn);

                let planetImgConteiner = ce("div")
                planetImgConteiner.classList.add("planet-img-container")
                planetInfo.appendChild(planetImgConteiner);

                let planetImg = ce("img");
                planetImg.classList.add("planet-img")
                planetImg.src = dato.immagine;
                planetImgConteiner.appendChild(planetImg);
        
                let planetArrow = ce("div");
                planetArrow.classList.add("planet-arrow");
                planetImgConteiner.appendChild(planetArrow);
                let planetArrow2 = ce("div");
                planetArrow2.classList.add("planet-arrow2");
                planetImgConteiner.appendChild(planetArrow2);

                let curiositàContainer = ce("div");
                curiositàContainer.classList.add("curiosità-container");
                planetImgConteiner.appendChild(curiositàContainer);
                let curiositàImg = ce("img");
                curiositàImg.src = dato.curiosita_img,
                curiositàContainer.appendChild(curiositàImg);
                let curiosità = ce("p");
                curiosità.textContent = dato.curiosita;
                curiositàContainer.appendChild(curiosità);

                main.appendChild(planetInfo);
                
            })


            console.log(dato.nome);
        })
    }catch(err){
        console.log(err);
    }

    
}
getPlanets()
















let url = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

async function getMarsInfo() {
    try{
        let results = await fetch(url);
        results = await results.json();
        console.log(results);
        let totDays = results.sol_keys;
        console.log(totDays);
        let lastDayOnMars = totDays[totDays.length -1];
        console.log(lastDayOnMars);
        let lastSolKey = results[lastDayOnMars];
        console.log(lastSolKey); //ultimo giorno 
        let main = qs("main");

        let weatherContainer = ce("section");
        weatherContainer.id = "weather-container";
        main.insertAdjacentElement("afterend", weatherContainer);
        
        let inSightContainer = ce("div");
        inSightContainer.classList.add("insight-container");
        weatherContainer.appendChild(inSightContainer);
        let inSightTitle = ce("h2");
        inSightTitle.textContent = "Ultime condizioni meteorologiche a Elysium Planitia";
        inSightContainer.appendChild(inSightTitle);
        let insightDescription = ce("p");
        insightDescription.textContent = "InSight sta rilevando quotidianamente le condizioni meteorologiche (temperatura, vento, pressione) sulla superficie di Marte, a Elysium Planitia, una pianura piatta e liscia situata vicino all’equatore marziano.";
        inSightContainer.appendChild(insightDescription);

        let mesurements = ce("div");
        mesurements.classList.add("mesurements")
        weatherContainer.appendChild(mesurements);
        let solContainer = ce("div");
        solContainer.classList.add("sol-container")
        mesurements.appendChild(solContainer);
        let sol = ce("h3");
        sol.textContent = `SOL ${lastDayOnMars}`;
        solContainer.appendChild(sol);
        let earthTime = ce('p');
        let a = new Date(lastSolKey.First_UTC).toLocaleDateString();
        let b = new Date(lastSolKey.Last_UTC).toLocaleDateString();
        earthTime.textContent = `${a} -  ${b}`;
        solContainer.appendChild(earthTime);
        
        let parametri = [lastSolKey.AT, lastSolKey.HWS, lastSolKey.PRE];
        parametri.forEach(parametro => {
            let mesuredDetails = ce("div");
            mesuredDetails.classList.add("mesured-details")
            mesurements.appendChild(mesuredDetails);
            const reference = ce("h3");
            mesuredDetails.appendChild(reference);
            if (parametro === lastSolKey.AT){
                reference.textContent = "Temperatura Atmosferica"
            }
            else if(parametro === lastSolKey.HWS){
                reference.textContent = "Velocità Del Vento"
            }
            else if(parametro === lastSolKey.PRE){
                reference.textContent = "Pressione Atmosferica"
            }
            let minT = ce("p");
            minT.textContent = `Min: ${parametro.mn}`;
            mesuredDetails.appendChild(minT);
            let maxT = ce("p");
            maxT.textContent = `Max: ${parametro.mx}`;
            mesuredDetails.appendChild(maxT);
            let avgT = ce("p");
            avgT.textContent = `Media: ${parametro.av}`;
            mesuredDetails.appendChild(avgT);      
        })

        let weekOnMars = Object.entries(results).slice(0, 7);
        console.log(weekOnMars);

        let weekWrapper = ce("div");
        weekWrapper.classList.add("week-wrapper");
        weatherContainer.appendChild(weekWrapper);

        weekOnMars.forEach(day => {
            let weekContainer = ce("div");
            weekContainer.classList.add("week-container")
            weekWrapper.appendChild(weekContainer);

            let specificDay = ce("h4");
            specificDay.classList.add("specific-day")
            specificDay.textContent = day[0];
            weekContainer.appendChild(specificDay);

            let t = ce("h4");
            t.textContent = "Temperatura atmosferica";
            weekContainer.appendChild(t);

            let at = day[1].AT;
            console.log(at);
            let dayMinT = ce("p");
            dayMinT.textContent = `Min: ${at.mn}`;
            weekContainer.appendChild(dayMinT);

            let dayMaxT = ce("p");
            dayMaxT.textContent = `Max: ${at.mx}`;
            weekContainer.appendChild(dayMaxT);

            let dayAvT = ce("p");
            dayAvT.textContent = `Media: ${at.av}`;
            weekContainer.appendChild(dayAvT);

            })
            let maxTemp = [];
            console.log(maxTemp);
            let minTemp =[];
            console.log(minTemp);

            const ctx = document.getElementById('my-chart');
            weekOnMars.forEach(day =>{
                let d = day[1].AT;
                let mx = d.mx;
                maxTemp.push(mx);
                let min = d.mn;
                minTemp.push(min);

            });
            new Chart(ctx, {
                
                type: 'line',
                data: {
                labels: ['675', '676', '677', '678', '679', '680', '681'],
                datasets: [
                    {
                        label: 'Temperatura Minima',
                        data: minTemp,
                        borderWidth: 1,
                        borderColor: 'lightblue',     // Colore linea
                        backgroundColor: 'lightblue', // Colore punto
                    },
                    {
                        label: 'Temperatura Massima',
                        data: maxTemp,
                        borderColor: 'red',      // Colore seconda linea
                        backgroundColor: 'red',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            min: -120,
                            max: 10,
                             ticks: {
                                stepSize: 10,
                                callback: value => value + ' °C'
                            }
                        }
                    }
                }});

    }catch(err){
        console.log(err);
    }
    
}
getMarsInfo();




