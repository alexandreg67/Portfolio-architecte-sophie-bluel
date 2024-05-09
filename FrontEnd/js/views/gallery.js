const gallery = document.querySelector(".gallery");

export function createGalleryItem(works) {
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

