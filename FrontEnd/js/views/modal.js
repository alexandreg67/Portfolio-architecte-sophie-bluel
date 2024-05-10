import { deleteWork, addWork, getWorks } from "../libs/data.js";

export function showModal(modal, allWorks) {
    modal.style.display = "block";
    createGalleryView(allWorks);
};
    
export function createGalleryView(allWorks){
    // console.log("je suis dans createGalleryView et je log allWorks", allWorks);
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = ""; 

    const spanClose = document.createElement("span");
    spanClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    spanClose.classList.add("close");
    modalContent.appendChild(spanClose);

    spanClose.addEventListener('click', () => {
        modal.style.display = "none";
    });

    const titreModal = document.createElement("h2");
    titreModal.textContent = "Galerie photo";
    modalContent.appendChild(titreModal); 
    
    const modalGallery = document.createElement("div");
    modalGallery.classList.add("modal-gallery");
    modalGallery.innerHTML = "";

    for (const work of allWorks) {
        const container = document.createElement("div");
        container.classList.add("container-photo");
        const img = document.createElement("img");

        img.src = work.imageUrl;
        img.alt = work.title;
        img.id = work.id;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-regular", "fa-trash-can", "delete-icon");

        container.appendChild(img);
        container.appendChild(deleteIcon);
        modalGallery.appendChild(container);
        img.addEventListener('click', () => {
            console.log("click sur l'image", work.id);
            deleteWork(work.id);
        });
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
        createAddPhotoView(allWorks);
    });
};

function createAddPhotoView(allWorks){
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = "";

    const spanClose = document.createElement("span");
    spanClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    spanClose.classList.add("close");
    modalContent.appendChild(spanClose);

    spanClose.addEventListener('click', () => {
        modal.style.display = "none";
    });

    const spanArrow = document.createElement("span");
    spanArrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    spanArrow.classList.add("arrow-left");
    spanArrow.style.display = "block";
    modalContent.appendChild(spanArrow);

    spanArrow.addEventListener('click', () => {
        createGalleryView(allWorks);
    });

    const titreModal = document.createElement("h2");
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
    btnAddPicture.type = "file";
    containerAddPhoto.appendChild(btnAddPicture);
    const pAddPicture = document.createElement("p");
    pAddPicture.classList.add("add-picture-info");
    pAddPicture.textContent = "jpg. png : 4mo max";
    containerAddPhoto.appendChild(pAddPicture);

    form.appendChild(containerAddPhoto);

    let inputPicture;

    btnAddPicture.addEventListener('click', () => {
        // console.log("click sur le bouton ajouter une photo");
        btnAddPicture.style.display = "none";
        inputPicture = document.createElement("input");
        inputPicture.classList.add("input-picture");
        inputPicture.style.display = "flex";
        inputPicture.type = "file";
        inputPicture.name = "imageUrl";
        inputPicture.required = true;
        containerAddPhoto.appendChild(inputPicture);
        inputPicture.addEventListener('change', (e) => {
            containerAddPhoto.innerHTML = "";
            const file = e.target.files[0];

            // Vérifier si un fichier a été sélectionné    
            if (file) {
                // console.log("Fichier sélectionné :", file);
                // Créez un objet URL à partir du fichier
                const imageURL = URL.createObjectURL(file);
                
                // Créez un élément d'image pour afficher l'image
                const imagePreview = document.createElement("img");
                imagePreview.src = imageURL;
                imagePreview.classList.add("image-preview");
    
                // Ajoutez l'aperçu de l'image au conteneur
                containerAddPhoto.appendChild(imagePreview);
            }else {
                console.log("Aucune image sélectionnée.");
            }
        });
    });

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
    nameInput.required = true;
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
    categorySelect.required = true;
    form.appendChild(categorySelect);

    // Ajoute une option vide par défaut
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);

    // Récupération des catégories uniques
    const uniqueCategories = [...new Set(window.allWorks.map(work => work.category.id))];

    // Création des options pour le select
    for (const categoryId of uniqueCategories) {
        // Récupération de la catégorie correspondante
        const category = window.allWorks.find(work => work.category.id === categoryId).category;
        const option = document.createElement("option");
        option.value = category.id;
        // console.log("je log option.value", option.value);
        option.textContent = category.name;
        // console.log("je log option.textContent", option.textContent);
        categorySelect.appendChild(option);
    }
    
    modalContent.appendChild(form);
    const separator = document.createElement("div");
    separator.classList.add("separator");
    modalContent.appendChild(separator);

    // Création et ajout du bouton Valider
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.disabled = true;
    submitBtn.textContent = "Valider";
    submitBtn.classList.add("add-photo");
    submitBtn.style.backgroundColor = '#A7A7A7';

    form.addEventListener('input', (e) => {
        inputPicture = document.querySelector('.input-picture');
        if (form.checkValidity() && inputPicture !== null) {
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '#1D6154';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#A7A7A7';
        }
    });

    modalContent.appendChild(submitBtn);

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            if (inputPicture) {
                // ajouter le travail
                await addWork(inputPicture, nameInput, categorySelect);
                
                console.log("Travail ajouté avec succès !");
            } else {
                console.error('Submit btn : Aucune image sélectionnée.');
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du travail :", error);
        }
    });
};