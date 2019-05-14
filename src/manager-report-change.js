import * as common from './common';

function getRegistrationData() {
    return common.getFormData('.insert-password-form');
}

function findReport(registrationData) {
    const reports = JSON.parse(localStorage.getItem('reports'));
    const report =  reports.find(report => report.password === registrationData.password && report.email.toLowerCase() === registrationData.email.toLowerCase() );

    return report;
}

export function run() {
    document.querySelector('.insert-password-form').addEventListener('submit', function(e) { 
        e.preventDefault();
        const report = findReport(getRegistrationData());
        if (!report) {
            alert('Не найдено пользователя с заданными email и паролем');
            return;
        }
        window.location = '/index.html?id=' + report.id + '#report';
    });
}
