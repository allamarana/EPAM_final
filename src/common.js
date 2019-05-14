
export function getFormData(formSelector) {
    const values = [...document.querySelectorAll(`${formSelector} input`)]
        .map(input => [input.name, input.value]);
    const result = {};
    for (const value of values) {
        result[value[0]] = value[1];
    }

    return result;
}

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