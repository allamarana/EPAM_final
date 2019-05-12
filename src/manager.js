import seeds from './users.json';
// add template library Handlebars 
import * as Handlebars from 'handlebars';

// function to get parameters from url
export function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
                return user.skills.includes(critiria.query);
            }
            return true;
        });
}


function render(data) {
    var source   = document.getElementById("template-person-short-view").innerHTML;
    var template = Handlebars.compile(source);
    console.log(data);
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

    const users = searchUsers(critiria);
    render({ users });


    document.querySelector('.search-results').addEventListener('click', function(event) {
        if (event.target.classList.contains('skill')) {
            window.location = '/manager.html?query=' + encodeURIComponent(event.target.innerText);
        }
    });
}
