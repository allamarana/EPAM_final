import * as common from './common';
import * as uuid from 'uuid/v4';

export function getData() {
    var data = common.getFormData('.programmer-create-form');
    data.id = uuid();

    data['skills'] = data['skills'].split(/,\s?/)

    return data;
}

function addUser(user) {
    const users = JSON.parse(localStorage.getItem('users'));
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

export function run() {
    document.querySelector('.programmer-create-form').addEventListener('submit', function(e) {
        const data = getData();
        addUser(data);
        alert('Профиль успешно сохранен.')
        e.target.reset();
        e.preventDefault();
    });
}