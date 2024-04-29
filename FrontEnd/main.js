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

// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", () => {
    getData(url);
    displayLoggedInUser();
});

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
        form.action = "#"; // Assurez-vous de mettre l'URL appropriée pour traiter les données du formulaire
        form.method = "post";

        // Création et ajout des champs Nom
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




        // Création et ajout du bouton Envoyer
        const submitInput = document.createElement("input");
        submitInput.type = "submit";
        submitInput.value = "Valider";
        form.appendChild(submitInput);

        modalContent.appendChild(form);

        

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

