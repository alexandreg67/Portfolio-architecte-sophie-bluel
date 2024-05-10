const projets = document.querySelector('.lienProjets');
const btnSubmit = document.querySelector('.btnSubmit');

projets.addEventListener('click', () => {
    window.location.href = './index.html';
});


btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    displayLoggedInUser();
});

function displayLoggedInUser() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })

    })
    .then(res => res.json()) // Récupération de la réponse en JSON
    .then(data => { // Traitement de la réponse
        console.log("data", data);
        if (data.token) {
            // stockage du token dans le localStorage
            localStorage.setItem('token', data.token);
            // Redirection vers la page d'accueil
            alert('Vous êtes connecté !');
            window.location.href = './index.html';
        } else {
            alert('Erreur de connexion');
        }
    })
    .catch(error => console.error(error));

};