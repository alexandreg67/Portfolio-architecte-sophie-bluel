export function isConnected(login, logout, modifier, editBanner) {
    // Récupération du token dans le localStorage
    const token = localStorage.getItem('token');
    // console.log("je suis dans isConnected");
    if (token) {
        // Un token est présent, l'utilisateur est connecté
        modifier.style.display = 'inline-block';
        login.style.display = 'none';
        editBanner.style.display = 'flex';
    } else {
        // Pas de token, l'utilisateur n'est pas connecté ou la session a expiré
        modifier.style.display = 'none';
        logout.style.display = 'none';
    }
}

export async function displayLoggedInUser(emailInput, passwordInput) {

    const email = emailInput.value;
    const password = passwordInput.value;

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
            window.location.href = '/';
        } else {
            alert('Erreur de connexion');
        }
    })
    .catch(error => console.error(error));
};
