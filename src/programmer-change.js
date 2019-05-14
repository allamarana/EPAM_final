import * as common from './common';

function getUserPassword() {
    var password = common.getFormData('.insert-password-form')

    return password['my-password'];
}

function findUser(password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user =  users.find(user => user.password === password);

    return user;
}

export function run() {
    document.querySelector('.insert-password-form').addEventListener('submit', function(e) { 
        const user = findUser(getUserPassword());
        window.location = '/index.html?id=' + user.id + '#programmer-profile';
        e.preventDefault();
    });
}
