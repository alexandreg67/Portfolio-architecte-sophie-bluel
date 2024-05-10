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
