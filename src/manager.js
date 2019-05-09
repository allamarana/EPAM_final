import users from './users.json';
// add template library Handlebars 
import * as Handlebars from 'handlebars';

// function to get parameters from url
function getParameterByName(name) {
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
        job: getParameterByName('job'),
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
            if (critiria.job === ""){
                return true;
            } 
            if (critiria.job) {
                return user.job.includes(critiria.job);
            }
            return true;
        });
}


function render(data) {
    var source   = document.getElementById("person-short-view").innerHTML;
    var template = Handlebars.compile(source);
    document.getElementById('results').innerHTML = template(data);
}

export function run() {
    if (!getUsers()) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    const users = searchUsers(getCritiria());
    render({ users });
}
