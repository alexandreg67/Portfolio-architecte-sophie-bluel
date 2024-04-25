const url = "http://localhost:5678/api/works";
const allBtnFilter = document.querySelectorAll(".filter-btn");
const gallery = document.querySelector(".gallery");
const menuCategories = document.querySelector("#categories");
const btnGroup = document.querySelector(".button-group");

let allWorks = [];

// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", () => {
    getData(url);
});


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
    gallery.innerHTML = "";
   
    for (const work of works) {

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

function createCategoryMenu(works) {
    const categoryList = works.map(e => e.category.name);
    const uniqueCategories = [...new Set(categoryList)];

    // Bouton pour toutes les catégories
    const btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    btnAll.classList.add("filter-btn");
    btnAll.dataset.category = "all";
    btnAll.addEventListener('click', () => {
        filterWorksByCategory("all");
    });
    btnGroup.appendChild(btnAll);

    // Boutons pour chaque catégorie
    for (const category of uniqueCategories) {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("filter-btn");
        btn.dataset.category = category;
        btn.addEventListener('click', () => {
            filterWorksByCategory(category);
        });
        btnGroup.appendChild(btn);
    }
}

function filterWorksByCategory(category) {
    if (category === "all") {
        createGalleryItem(allWorks); // Supposant que allWorks est votre variable globale contenant tous les travaux
    } else {
        const filteredWorks = allWorks.filter(e => e.category.name === category);
        createGalleryItem(filteredWorks);
    }
}
