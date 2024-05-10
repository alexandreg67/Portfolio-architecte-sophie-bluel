import { getWorks, deleteWork } from './js/libs/data.js';
import { createGalleryItem } from './js/views/gallery.js';
import { filterWorksByCategory } from './js/views/categories.js';
import { createCategoryMenu } from './js/views/categories.js';
import { isConnected } from './js/libs/users.js';
import { showModal } from './js/views/modal.js';

const url = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");
const btnGroup = document.querySelector(".button-group");
const lienProjet = document.querySelector(".lienProjets");
const login = document.querySelector(".lienLogin");
const logout = document.querySelector(".lienLogout");
const modifier = document.querySelector(".modifier");
const modal = document.querySelector("#modal");
const btnSubmit = document.querySelector('.btnSubmit');
const editBanner = document.querySelector('.editBanner');

window.allWorks = [];

// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", async () => {
    try {
        window.allWorks = await getWorks(url);
        createCategoryMenu(btnGroup, filterWorksByCategory);
        createGalleryItem(window.allWorks);
        isConnected(login, logout, modifier, editBanner);
        // console.log("je log allWorks", allWorks);
    } catch (error) {
        console.error(error);
    }
});


// login.addEventListener('click', () => {

//         logout.style.display = 'block';
//         editBanner.style.display = 'flex';
//     }
// );

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    logout.style.display = 'none';
    editBanner.style.display = 'none';
    window.location.href = '/';
});

// lienProjet.addEventListener('click', () => {
//     window.location.href = './index.html';
// });

modifier.addEventListener('click', async () => {
    // allWorks = await getWorks(url);
    // console.log("click sur modifier log allworks", allWorks);
    showModal(modal, window.allWorks, deleteWork);
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
