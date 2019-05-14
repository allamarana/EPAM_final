import * as common from './common';
import * as Handlebars from 'handlebars';
import { getParameterByName } from './common';

export function run() {
    var source = document.getElementById('template-profile-change').innerHTML;
    var template = Handlebars.compile(source);

    const users = JSON.parse(localStorage.getItem('users'));
    const id = getParameterByName('id');
    const user = users
        .find(user => user.id === id);
    user.picture = user.picture || '/assets/images/default-programmer.png'

    document.getElementById('profile-change').innerHTML = template({ user });

    document.querySelector('.profile-change__button').addEventListener('click', function() {
        Object.assign(user, common.getFormData('.profile-change-form'));
        user.skills = user.skills.split(/,\s?/g);

        localStorage.setItem('users', JSON.stringify(users));

        alert('Ваши данные успешно обновлены!');
    });
}