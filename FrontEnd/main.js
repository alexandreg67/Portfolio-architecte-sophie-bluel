import { getWorks } from './js/libs/data.js';
import { createGalleryItem } from './js/views/gallery.js';
import { filterWorksByCategory } from './js/views/categories.js';
import { createCategoryMenu } from './js/views/categories.js';
import { isConnected } from './js/libs/users.js';
import { showModal } from './js/views/modal.js';

const url = "http://localhost:5678/api/works";
const btnGroup = document.querySelector(".button-group");
const login = document.querySelector(".lienLogin");
const logout = document.querySelector(".lienLogout");
const modifier = document.querySelector(".modifier");
const modal = document.querySelector("#modal");
const editBanner = document.querySelector('.editBanner');

window.allWorks = [];

// Au chargement de la page, on récupère les données de l'API
window.addEventListener("load", async () => {
    try {
        window.allWorks = await getWorks(url);
        createCategoryMenu(btnGroup, filterWorksByCategory);
        createGalleryItem(window.allWorks);
        isConnected(login, logout, modifier, editBanner);
    } catch (error) {
        console.error(error);
    }
});

// Déconnexion de l'utilisateur
logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    logout.style.display = 'none';
    editBanner.style.display = 'none';
    window.location.href = '/';
});

// Affichage de la modal pour la modification des travaux
modifier.addEventListener('click', async () => {
    window.allWorks = await getWorks(url);
    // console.log("click sur modifier window.allWorks", window.allWorks);
    showModal(modal, window.allWorks);
});

// Fermeture de la modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
