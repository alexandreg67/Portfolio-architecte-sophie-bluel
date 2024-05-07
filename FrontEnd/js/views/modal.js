export function showModal(modal, allWorks) {
    modal.style.display = "block";

    createGalleryView(allWorks);

};
    
function createGalleryView(allWorks){
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

    // Création des options pour le select
    const categoryList = allWorks.map(e => e.category.name);
    const uniqueCategories = [...new Set(categoryList)];
    for (const category of uniqueCategories) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    };
    
    modalContent.appendChild(form);
    const separator = document.createElement("div");
    separator.classList.add("separator");
    modalContent.appendChild(separator);

    // Création et ajout du bouton Valider
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Valider";
    submitBtn.classList.add("add-photo");
    submitBtn.style.backgroundColor = '#A7A7A7';

    form.addEventListener('input', () => {
        if (form.checkValidity()) {
            submitBtn.style.backgroundColor = '#1D6154';
        } 
    });

    modalContent.appendChild(submitBtn);

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
    });
};

