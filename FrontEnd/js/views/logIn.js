import { displayLoggedInUser } from '../libs/users.js';

const btnSubmit = document.querySelector('.btnSubmit');
const emailRequired = document.querySelector('.emailRequired');
const passwordRequired = document.querySelector('.passwordRequired');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    console.log(email, password);
    displayLoggedInUser(email, password);

    if (email.value === '') {
        emailRequired.style.display = 'block';
    }else {
        emailRequired.style.display = 'none';
    }

    if (password.value === '') {
        passwordRequired.style.display = 'block';
    }else {
        passwordRequired.style.display = 'none';
    }
});
