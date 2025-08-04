import {qsa, qs, ce, getbyID} from "./utilities.js"; 
let apiKey = 'yuR9ywX2deYeG9r7rTg4Ikv1ZysBiBCoBdg00fwl';
function convertDaysInMillis(days){
    return days * 24 * 60 * 60 * 1000;
}
let endDate2 = Date.now();
let totDays = convertDaysInMillis(41);
let startDate2 = (endDate2 - totDays);

let startDate = new Date(startDate2).toISOString().split("T")[0];;
console.log(startDate);
let endDate= new Date(endDate2).toISOString().split("T")[0];;

console.log(startDate2)
console.log(endDate2);



let url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

async function getOtherImages(){
    try{
        let result = await fetch(url);
        result = await result.json();
        console.log(result);
        let mainContainer = qs("main");
        mainContainer.classList.add("main");
        result.forEach(element => {
            let article = ce("article");
            article.classList.add("article");
            mainContainer.appendChild(article);
            let copyright = ce("h5");
            if(element.copyright){
                copyright.textContent = `COPYRIGHT: ${element.copyright.toUpperCase()}`;
            }else {
                copyright.textContent = "COPYRIGHT: NASA"
            }
            article.appendChild(copyright);
            let date = ce("p");
            date.textContent = element.date;
            article.appendChild(date);
            let title = ce("h3");
            title.classList.add("titles");
            title.textContent = element.title;
            article.appendChild(title);
            
            let wrapper = ce("div");
            wrapper.classList.add("img-wrapper");
            article.appendChild(wrapper);

            let img = ce("img");
            img.src = element.url;
            img.classList.add("images");
            wrapper.appendChild(img);
            let downloadContainer = ce("div");
            downloadContainer.classList.add("download-container")
            wrapper.appendChild(downloadContainer);
            let downloadBtn = ce("button");
            downloadBtn.textContent = "Download";
            downloadBtn.classList.add("download-button2");
            downloadContainer.appendChild(downloadBtn);

            downloadBtn.addEventListener("mouseover", () => {
                downloadBtn.classList.add("download-button-onhover");
            });
            downloadBtn.addEventListener("mouseout", () => {
                downloadBtn.classList.remove("download-button-onhover");
            })
            downloadBtn.addEventListener("click", () => {
                let a = document.createElement("a");
                a.style.display = "none"
                a.href = element.url;
                console.log(a.href);
                a.download = "immagine.jpg";
                downloadBtn.appendChild(a);
                a.click();


            })
            wrapper.addEventListener("mouseenter", () => {  
                    downloadContainer.style.display = "flex";
            })
            wrapper.addEventListener("mouseleave", () => {
                    downloadContainer.style.display = "none"
            })


            let explanaition = ce("p");
            explanaition.classList.add("explanaitions")
            explanaition.textContent = element.explanation;
            article.appendChild(explanaition);

        
        });
    }catch(err){
        console.log("Something went wrong:", err)
    }
}
getOtherImages();














