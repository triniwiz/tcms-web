import {Pipe, PipeTransform} from '@angular/core';
declare var _: any;
@Pipe({
    name: 'adminFilter',
})

export class AdminFilter implements PipeTransform {
    transform(value) {
        if (value) {
            let filtered = _.filter(value, (c) => {
                return c.groups.indexOf('admin') === -1
            })

            return filtered
        }
    }
}