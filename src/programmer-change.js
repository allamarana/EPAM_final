import * as common from './common';

function getRegistrationData() {
    return common.getFormData('.insert-password-form');
}

function findUser(registrationData) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user =  users.find(user => user.password === registrationData.password && user.email.toLowerCase() === registrationData.email.toLowerCase() );

    return user;
}

export function run() {
    document.querySelector('.insert-password-form').addEventListener('submit', function(e) { 
        e.preventDefault();
        const user = findUser(getRegistrationData());
        if (!user) {
            alert('Не найдено пользователя с заданными email и паролем');
            return;
        }
        window.location = '/index.html?id=' + user.id + '#report';
    });
}
