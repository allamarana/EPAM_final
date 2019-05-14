import { getParameterByName } from './common';
import seeds from './users.json';
// add template library Handlebars 
import * as Handlebars from 'handlebars';


const PAGE_SIZE = 2;

function getCurrentPage() {
    const page = +getParameterByName('page') || 1;

    return page;
}
function getLink(options) {
    options = Object.assign({
        query: getParameterByName('query') || '',
        city: getParameterByName('city') || '',
        page: getParameterByName('page') || 1,
        sort: getParameterByName('sort') || 'alphabetASC',
    }, options);
    return '/index.html?query=' + encodeURIComponent(options.query) 
            + '&city=' + encodeURIComponent(options.city)
            + '&sort=' + options.sort 
            + '&page=' + options.page 
            + '#manager';
}
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

function searchUsers(critiria, options) {
    let users = getUsers();

    if (options.sort) {
        switch (options.sort) {
            case 'alphabetASC': 
                users.sort((a, b) => {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;

                    return 0;
                });
                break;
            case 'alphabetDESC':
                users.sort((a, b) => {
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;

                    return 0;
                });
                break;
            default: throw new Error('Unknown sorting');
        }
    }

    users = users
        .filter(user => {
            if (critiria.city === ""){
                return true;
            } 
            if (critiria.city) {
                return user.city.toLowerCase() === critiria.city.toLowerCase();
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
        })
        .slice((options.page - 1) * PAGE_SIZE, (options.page - 1) * PAGE_SIZE + PAGE_SIZE);
    


    return users;
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

    var page = getCurrentPage();
    const users = searchUsers(critiria, {
        page,
        sort: getParameterByName('sort'),
    });

    render({ users });

    document.querySelector('.next').addEventListener('click', function() {
        window.location = getLink({ page: (page + 1) });
    });

    document.querySelector('.previous').addEventListener('click', function() {
        window.location = getLink({ page: (page - 1) });
    });

    document.querySelector('.manager-sort-data-button').addEventListener('click', function(event) {
        window.location = getLink({ sort: document.querySelector('.sorting select').value });
        event.preventDefault();
    });

    if (searchUsers(critiria, { page: page + 1 }).length === 0) {
        document.querySelector('.next').style.display = 'none';
    }
    if (page === 1) {
        document.querySelector('.previous').style.display = 'none';
    }


    document.querySelector('.search-results').addEventListener('click', function(event) {
        if (event.target.classList.contains('skill')) {
            window.location = getLink({ query: event.target.innerText });
            return;
        }
        let current = event.target;
        while(!current.dataset.id) current = current.parentNode;

        window.location = '/index.html?id=' + current.dataset.id + '#profile';
    });
}
