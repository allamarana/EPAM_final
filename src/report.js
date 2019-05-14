import * as Handlebars from 'handlebars';
import { getParameterByName } from './common';

export function run() {
    var source = document.getElementById("template-profile").innerHTML;
    var template = Handlebars.compile(source);

    const id = getParameterByName('id');
    const report = JSON
        .parse(localStorage.getItem('reports'))
        .find(report => report.id === id);

    document.getElementById('report').innerHTML = template({ report });
}