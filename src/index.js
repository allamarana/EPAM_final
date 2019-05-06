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

// function getCritiria (){
//     var input = {};
//     // input.city = 
// }

function searchUsers(critiria) {
 

    const users = getUsers();
    return users
        .filter(user => {
            if (critiria.city) {
                return user.city === critiria.city;
            }
            return true;
        })
        .filter(user => {
            if (critiria.knowledge) {
                return user.knowledge.knowledge.includes(critiria.knowledge);
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

