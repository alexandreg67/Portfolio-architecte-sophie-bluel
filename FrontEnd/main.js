const gallery = document.querySelector(".gallery");
const menuCategories = document.querySelector("#categories");

const url = "http://localhost:5678/api/works";

let allWorks = [];


// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", () => {
    getData(url);
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

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`${response.status}`);
        }
        data = await response.json();
    } catch (error) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Erreur lors de la récupération des données"
        gallery.appendChild(errorMessage);
        console.error(error);
    }
    if (data) {
        // console.log(data);
        allWorks = data;
        createCategoryMenu(data);
        createGalleryItem(data);
    }
}

function createGalleryItem(works) {
    gallery.innerHTML = ""
   
    for (const work of works) {
        // console.log(work);
        // console.log(work.category);
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

function createCategoryMenu(categories) {
    const categoryList = categories.map(e => e.category.name);
    // console.log(categoryList);
    const uniqueCategories = [...new Set(categoryList)];
    // console.log(uniqueCategories);

    for (const category of uniqueCategories) {
        const menuItem = document.createElement("option");
        menuItem.value = category;
        menuItem.textContent = category;
        menuCategories.appendChild(menuItem);
    }
}

menuCategories.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    // console.log("Selected Category:", selectedCategory);
    
    if (selectedCategory === "all") {
        createGalleryItem(allWorks); // Afficher tous les travaux si "Toutes les catégories" est sélectionné
    } else {
        const filteredWorks = allWorks.filter(e => e.category.name === selectedCategory);
        console.log("Filtered Works:", filteredWorks);
        createGalleryItem(filteredWorks); // Afficher les travaux filtrés
    }
});


