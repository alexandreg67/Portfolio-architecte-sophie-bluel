import { createGalleryItem } from "../views/gallery.js";
import { createGalleryView } from "../views/modal.js";

export async function getWorks(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`${response.status}`);
        }
        const data = await response.json();
        // console.log("je suis dans getWorks et je log data", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteWork(id) {

    // Envoi de la requête DELETE à l'API
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

    })
    .then(response => {
        if (!response.ok) {
            throw Error(`${response.status}`);
        }else{
            alert("Le travail a bien été supprimé");
            console.log(`le travail avec l'id ${id} supprimé, response : ${response.status}`);
        }  
    })
    .catch(error => {
        console.error("Erreur lors de la suppression du work à l'API :", error);
    });

    window.allWorks = window.allWorks.filter(work => work.id !== id);
    createGalleryItem(window.allWorks);
    createGalleryView(window.allWorks);

}

export async function addWork(inputPicture, nameInput, categorySelect) {
    try {
        const file = inputPicture.files[0]; 

        // Créez un objet FormData pour envoyer les données du formulaire
        const formData = new FormData();
        formData.append('image', file, file.name); 
        formData.append('title', nameInput.value);
        formData.append('category', categorySelect.value);

        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
        const entity = await response.json();
        // console.log("je suis dans addWork et je log entity", entity)
        
        let newWork = {
            id: entity.id,
            title: entity.title,
            imageUrl: entity.imageUrl,
            categoryId: entity.categoryId,
            userId: entity.userId
        }

        window.allWorks.push(newWork);

        createGalleryItem(window.allWorks);
        createGalleryView(window.allWorks);

    } catch (error) {
        console.error("Erreur lors de l'envoi du work à l'API :", error);
    }
}

                
               
    
                