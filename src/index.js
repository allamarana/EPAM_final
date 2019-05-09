import { init } from './init';
import * as manager from './manager';


function notFound() {
    // ...
    alert('page is not found');
}

function main() {
    init();
    switch (document.location.pathname) {
        case '/manager.html':
            manager.run();
            break;

        default:
            notFound();
    }
}


document.addEventListener('DOMContentLoaded', main, false);
