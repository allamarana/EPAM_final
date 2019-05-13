import 'babel-polyfill';

import { init } from './init';
import * as manager from './manager';
import * as programmerCreate from './programmer-create'
import * as profile from './profile'

function controller(page) {
    switch (page) {
        case 'manager': return manager.run();
        case 'programmer-create': return programmerCreate.run();
        case 'profile': return profile.run();
    }
}

async function loadPartial(page) {
    const response = await fetch(`/partials/${page}.html`);
    const partial = await response.text();

    return partial;
}

async function render(page) {
    const pages = [
        'index',
        'manager',
        'programmer-create',
        'contacts',
        'profile',
    ];
    if (!pages.includes(page)) page = '404';
    document.querySelector('.main-content').innerHTML = await loadPartial(page);
    controller(page);
}


async function main() {
    try {
        init();
        await render(document.location.hash.replace(/^#/, '') || 'index');
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', main, false);
document.addEventListener('hashchange', main, false);
document.addEventListener('click', event => {
    if (event.target.nodeName === 'A' && event.target.dataset.page) {
        render(event.target.dataset.page)
            .catch(err => {
                console.error(err);
            });
    }
});