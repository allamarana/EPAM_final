import { init } from './init';
import * as manager from './manager';
import * as programmerCreate from './programmer-create'

function main() {
    init();
    switch (document.location.pathname) {
        case '/manager.html':
            manager.run();
            break;
        case '/programmer-create.html':
            programmerCreate.run();
            break;
        default:
            // notFound();
    }
}


document.addEventListener('DOMContentLoaded', main, false);
