import * as Handlebars from 'handlebars';
import { getParameterByName } from './common';

export function run() {
    var source = document.getElementById("template-profile").innerHTML;
    var template = Handlebars.compile(source);

    const id = getParameterByName('id');
    const user = JSON
        .parse(localStorage.getItem('users'))
        .find(user => user.id === id);
    user.picture = user.picture || '/assets/images/default-programmer.png'

    document.getElementById('profile').innerHTML = template({ user });
}