import { displayLoggedInUser } from '../libs/users.js';

const btnSubmit = document.querySelector('.btnSubmit');
const emailRequired = document.querySelector('.emailRequired');
const passwordRequired = document.querySelector('.passwordRequired');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    
    if (!validateEmail(email.value)) {
        emailRequired.style.display = 'block';
    }else {
        emailRequired.style.display = 'none'; 
    }
    
    if (password.value === '') {
        passwordRequired.style.display = 'block';
    }else {
        passwordRequired.style.display = 'none';
    }

    displayLoggedInUser(email, password);
});

// Fonction pour vérifier le format de l'email
function validateEmail(email) {
    // Expression régulière pour valider le format d'une adresse e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// /^.{6,20}$/ // Mot de passe entre 6 et 20 caractères