import { getParameterByName } from './common';
import seeds from './users.json';
// add template library Handlebars 
import * as Handlebars from 'handlebars';


const PAGE_SIZE = 4;

function getCurrentPage() {
    const page = +getParameterByName('page') || 0;

    return page;
}
// function createPageButton(size, pages){
//    var buttons = Math.ceil(pages/size);
    
// }
function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

function getCritiria() {
    const critiria = {
        city: getParameterByName('city'),
        query: getParameterByName('query'),
    };
    console.log(critiria);
    return critiria;
}

function searchUsers(critiria) {
    const users = getUsers();
    return users
        .filter(user => {
            if (critiria.city === ""){
                return true;
            } 
            if (critiria.city) {
                return user.city === critiria.city;
            }
            return true;
        })
        .filter(user => {
            if (critiria.query === ""){
                return true;
            } 
            if (critiria.query) {
                const text = user.skills.join(' ').toLowerCase() + ' ' + user.bio.toLowerCase();

                return text.includes(critiria.query);
            }
            return true;
        });
}


function render(data) {
    var source   = document.getElementById("template-person-short-view").innerHTML;
    var template = Handlebars.compile(source);
    for (const user of data.users) {
        user.picture = user.picture || '/assets/images/default-programmer.png';
    }
    document.getElementById('results').innerHTML = template(data);
}


export function run() {
    if (!getUsers()) {
        localStorage.setItem('users', JSON.stringify(seeds));
    }

    const critiria = getCritiria();
    document.getElementById('search-query').value = critiria.query;
    document.getElementById('search-city').value = critiria.city;

    const page = getCurrentPage();
    const users = searchUsers(critiria).slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    render({ users });


    document.querySelector('.search-results').addEventListener('click', function(event) {
        if (event.target.classList.contains('skill')) {
            window.location = '/index.html?query=' + encodeURIComponent(event.target.innerText) + '#manager';
            return;
        }
        let current = event.target;
        while(!current.dataset.id) current = current.parentNode;

        window.location = '/index.html?id=' + current.dataset.id + '#profile';
    });
}
