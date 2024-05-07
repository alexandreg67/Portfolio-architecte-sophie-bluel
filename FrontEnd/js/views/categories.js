import { filterWorksByCategory } from "../views/gallery.js"


export function createCategoryMenu(allWorks, btnGroup) {
    // On récupère les catégories uniques
    const categoryList = allWorks.map(e => e.category.name);
    const uniqueCategories = [...new Set(categoryList)];

    // Bouton pour toutes les catégories
    const btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    btnAll.classList.add("filter-btn");
    btnAll.dataset.category = "all";
    btnAll.addEventListener('click', () => {
        filterWorksByCategory("all", allWorks);
    });
    btnGroup.appendChild(btnAll);

    // Boutons pour chaque catégorie
    for (const category of uniqueCategories) {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("filter-btn");
        btn.dataset.category = category;
        btn.addEventListener('click', () => {
            filterWorksByCategory(category, allWorks);
        });
        btnGroup.appendChild(btn);
    }
}
