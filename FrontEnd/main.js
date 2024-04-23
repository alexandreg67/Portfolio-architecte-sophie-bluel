const urlWorks = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");

// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", () => {
    getWorks(urlWorks);
});

// (async () => {
//     let res = await fetch("http://localhost:5678/api/works");
//     let works = await res.json();
//     console.log(works);
//     const gallery = document.querySelector(".gallery");
    
//     gallery.innerHTML = ""

//     for (const work of works) {
//         console.log(work);
//     }
// })();

async function getWorks(url) {
    let dataWorks;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`${response.status}`);
        }
        dataWorks = await response.json();
    } catch (error) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Erreur lors de la récupération des données"
        gallery.appendChild(errorMessage);
        console.error(error);
    }
    if (dataWorks) {
        // console.log(dataWorks);
        createGalleryItem(dataWorks);
    }
}

function createGalleryItem(works) {
    gallery.innerHTML = ""
   
    for (const work of works) {
        // console.log(work);
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
    
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;
    
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}