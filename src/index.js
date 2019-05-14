import 'babel-polyfill';

import { init } from './init';
import * as manager from './manager';
import * as programmerCreate from './programmer-create';
import * as profile from './profile';
import * as programmerChange from './programmer-change';
import * as programmerProfile from './programmer-profile';
import * as managerReport from './mananger-report';
import * as managerChange from './manager-report-change'
import * as report from './report'

function controller(page) {
    switch (page) {
        case 'manager': return manager.run();
        case 'manager-report': return managerReport.run();
        case 'manager-report-change': return managerChange.run();
        case 'report': return report.run();
        case 'programmer-create': return programmerCreate.run();
        case 'profile': return profile.run();
        case 'programmer-change': return programmerChange.run();
        case 'programmer-profile': return programmerProfile.run();
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
        'manager-report',
        'manager-report-change',
        'programmer-create',
        'programmer-change',
        'programmer-profile',
        'contacts',
        'profile',
        'report'

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
        history.pushState(null, '', '/index.html#' + event.target.dataset.page);
        window.location.reload();
    }
});