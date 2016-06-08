import {Pipe, PipeTransform} from '@angular/core';
declare var _: any;
@Pipe({
    name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {
    transform(value, args) {
        if (value) {
            const company = _.findLast(args, (c) => {
                if (c.id === value) {
                    return c;
                }
            })
            if (company) {
                return company.name;
            }

        }
    }
}