export function getFormData(formSelector) {
    const values = [...document.querySelectorAll(`${formSelector} input`)]
        .map(input => [input.name, input.value]);
    const result = {};
    for (const value of values) {
        result[value[0]] = value[1];
    }

    return result;
}
