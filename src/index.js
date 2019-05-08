import users from './users.json';

window.seed = function seed() {
    localStorage.setItem('users', JSON.stringify(users));
}
if (!getUsers()) {
    seed();
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

// getting input onclick
window.onload = function() {

    document.querySelector(".search-button").addEventListener("click", getCritiria);
}


function getCritiria (){
    var critiria = {};
    critiria.city = document.querySelector('.city').value;
    critiria.job = document.querySelector('.job').value;
    alert(JSON.stringify(critiria));
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


function main() {

    if (document.location.pathname == "/manager.html"  ){
        searchUsers({
            city: 'London'
        }).map(user => {
            var element = document.createElement('div')
            element.innerText = `${user.name} (${user.email}), city ${user.city}`;
            element.setAttribute('class', 'user');
            return element;
        }).forEach(element => {
            results.appendChild(element);
        });
    }

}


document.addEventListener('DOMContentLoaded', main, false);

