import * as common from './common';
import * as uuid from 'uuid/v4';

export function pushData() {
    var data = common.getFormData('.programmer-create-form');
    data.id = uuid();

    return data;
}