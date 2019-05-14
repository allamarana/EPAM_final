import * as common from './common';
import * as uuid from 'uuid/v1';


export function getData() {
    var data = common.getFormData('.manager-report');
    data.id = uuid();

    data['skills'] = data['skills'].split(/,\s?/g)

    return data;
}

function addReport(report) {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
}

export function run() {
    document.querySelector('.manager-report').addEventListener('submit', function(e) {
        const data = getData();
        addReport(data);
        alert('Профиль успешно сохранен.')
        e.target.reset();
        e.preventDefault();
    });
}




