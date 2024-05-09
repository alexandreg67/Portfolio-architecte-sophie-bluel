export async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function deleteWork(id) {
    console.log("je suis dans deleteWork avec l'id", id);

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
        }  
    });
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
        });

        console.log("je log response", response);

        if (!response.ok) {
            throw Error(`${response.status}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi du work à l'API :", error);
    }
}

                
               
    
                