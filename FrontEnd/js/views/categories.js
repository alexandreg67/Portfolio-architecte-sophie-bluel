import { createGalleryItem } from "./gallery.js";

export function createCategoryMenu(btnGroup) {
    // On récupère les catégories uniques
    const categoryList = window.allWorks.map(e => e.category.name);
    const uniqueCategories = ["Tous", ...new Set(categoryList)];

    // Boutons pour chaque catégorie
    for (const category of uniqueCategories) {
        // console.log("je log category", category);
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("filter-btn");
        btn.category = category;
        btnGroup.appendChild(btn);

        btn.addEventListener('click', () => {
            btn.classList.add("filter-btn-active");
            btnGroup.querySelectorAll("button").forEach(e => {
                if (e !== btn) {
                    e.classList.remove("filter-btn-active");
                }
            });
            filterWorksByCategory(category);
        });
    }
}

export function filterWorksByCategory(category) {
    if (category === "Tous") {
        createGalleryItem(window.allWorks);
    } else {
        const filteredWorks = window.allWorks.filter(e => e.category.name === category);
        // console.log("je log filteredWorks", filteredWorks);
        createGalleryItem(filteredWorks);
    }
}

