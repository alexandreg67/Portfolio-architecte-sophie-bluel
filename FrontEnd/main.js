const url = "http://localhost:5678/api/works";

const allBtnFilter = document.querySelectorAll(".filter-btn");
const gallery = document.querySelector(".gallery");
const menuCategories = document.querySelector("#categories");
const btnGroup = document.querySelector(".button-group");
const login = document.querySelector(".lienLogin");
const logout = document.querySelector(".lienLogout");
const projets = document.querySelector(".lienProjets");
const loginForm = document.querySelector('form');
const modifier = document.querySelector(".modifier");
const modal = document.querySelector("#modal");

let allWorks = [];
let uniqueCategories = [];

// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", () => {
    getData(url);
    displayLoggedInUser();
});

// const uniqueCategories = [
//     categoryList = works.map(e => e.category.name);
//     return [...new Set(categoryList)];
// ];


// Au chargement de la page, on récupère les données de l'API
// window.addEventListener("load", () => {
//     getData(url);
//     displayLoggedInUser();
// });

login.addEventListener('click', () => {
    window.location.href = './connexion.html';
});

modifier.addEventListener('click', () => {

    modal.style.display = "block";

    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = ""; 

    const spanClose = document.createElement("span");
    spanClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    spanClose.classList.add("close");
    modalContent.appendChild(spanClose);

    const titreModal = document.createElement("h2");
    titreModal.textContent = "Galerie photo";
    modalContent.appendChild(titreModal); 
    
    const modalGallery = document.createElement("div");
    modalGallery.classList.add("modal-gallery");
    modalGallery.innerHTML = "";

    for (const work of allWorks) {
        const img = document.createElement("img");

        img.src = work.imageUrl;
        img.alt = work.title;

        modalGallery.appendChild(img);
    }

    modalContent.appendChild(modalGallery);

    const separator = document.createElement("div");
    separator.classList.add("separator");
    modalContent.appendChild(separator);

    const btnAddPhoto = document.createElement("button");
    btnAddPhoto.classList.add("add-photo");
    btnAddPhoto.textContent = "Ajouter une photo";

    modalContent.appendChild(btnAddPhoto);


    btnAddPhoto.addEventListener('click', () => {
        // console.log("je clique sur ajouter une photo");
        modalContent.innerHTML = "";

        const spanClose = document.createElement("span");
        spanClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        spanClose.classList.add("close");
        modalContent.appendChild(spanClose);

        const spanArrow = document.createElement("span");
        spanArrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        spanArrow.classList.add("arrow-left");
        spanArrow.style.display = "block";
        modalContent.appendChild(spanArrow);
        
        titreModal.textContent = "Ajouter une photo";
        modalContent.appendChild(titreModal);

        const form = document.createElement("form");
        form.classList.add("add-photo-content");
        form.action = "#"; 
        form.method = "post";

        // Création et ajout du champ photo
        const containerAddPhoto = document.createElement("div");
        containerAddPhoto.classList.add("container-add-photo");
        const iconPicture = document.createElement("i");
        iconPicture.classList.add("fa-regular", "fa-image");
        containerAddPhoto.appendChild(iconPicture);
        const btnAddPicture = document.createElement("button");
        btnAddPicture.textContent = "+ Ajouter une photo";
        btnAddPicture.classList.add("add-picture");
        containerAddPhoto.appendChild(btnAddPicture);
        const pAddPicture = document.createElement("p");
        pAddPicture.classList.add("add-picture-info");
        pAddPicture.textContent = "jpg. png : 4mo max";
        containerAddPhoto.appendChild(pAddPicture);

        form.appendChild(containerAddPhoto);

        // Création et ajout du champ titre
        const nameLabel = document.createElement("label");
        nameLabel.classList.add("label");
        nameLabel.setAttribute("for", "titre");
        nameLabel.textContent = "Titre";
        form.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.classList.add("input");
        nameInput.type = "text";
        nameInput.name = "titre";
        nameInput.id = "titre";
        form.appendChild(nameInput);

        // Création et ajout du champ description
        const categoryLabel = document.createElement("label");
        categoryLabel.classList.add("label"); 
        categoryLabel.textContent = "Catégorie";
        form.appendChild(categoryLabel);

        const categorySelect = document.createElement("select");
        categorySelect.classList.add("input"); 
        categorySelect.name = "category";
        categorySelect.id = "category";
        form.appendChild(categorySelect);

        // Création des options pour le select
        uniqueCategories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        modalContent.appendChild(form);

        const separator = document.createElement("div");
        separator.classList.add("separator");
        modalContent.appendChild(separator);

        // Création et ajout du bouton Valider
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "Valider";
        submitBtn.classList.add("add-photo");
        modalContent.appendChild(submitBtn);


        spanClose.addEventListener('click', () => {
            modal.style.display = "none";
        });

        spanArrow.addEventListener('click', () => {
            modalContent.innerHTML = "";
            modalContent.appendChild(spanClose);
            modalContent.appendChild(titreModal);
            modalContent.appendChild(modalGallery);
            modalContent.appendChild(separator);
            modalContent.appendChild(btnAddPhoto);
        });
    });

    spanClose.addEventListener('click', () => {
        modal.style.display = "none";
    });
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

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
        createUniqueCategories(data);
    }
}

function createGalleryItem(works) {
    // On vide la galerie
    gallery.innerHTML = "";
   
    // On crée les éléments de la galerie
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

function createUniqueCategories(works) {
    // On récupère les catégories uniques
    const categoryList = works.map(e => e.category.name);
    uniqueCategories = [...new Set(categoryList)];
}

function createCategoryMenu(works) {
    // On récupère les catégories uniques
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
        createGalleryItem(allWorks);
    } else {
        const filteredWorks = allWorks.filter(e => e.category.name === category);
        createGalleryItem(filteredWorks);
    }
}

function displayLoggedInUser() {
    if (localStorage.getItem('token')) {
        // Un token est présent, l'utilisateur est connecté
        modifier.style.display = 'inline-block';
        login.style.display = 'none';
    } else {
        console.log("je n'ai pas de token");
        // Pas de token, l'utilisateur n'est pas connecté ou la session a expiré
        modifier.style.display = 'none';
        logout.style.display = 'none';
    }

    login.addEventListener('click', () => {
        window.location.href = './connexion.html';
    });
    
    logout.addEventListener('click', () => {
        // console.log("je supprime le token");
        localStorage.removeItem('token');
        logout.style.display = 'none';
        window.location.href = './index.html';
    });
}

