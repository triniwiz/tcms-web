declare var Horizon: any;
import {Injectable} from '@angular/core';
import * as config from '../config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class CompaniesService {
  companies;
  horizon;
  constructor() {
    this.horizon = Horizon({ host: `${config.SERVER_DOMAIN}:${config.SERVER_PORT}` });
    this.companies = this.horizon('companies');
  }
  load(): Observable<Companies> {
    return this.companies
      .watch()
  }
  createCompany(name:Company) {
    if (name) {
      return this.companies.store({
        name: name
      })
    }
  }
  editCompany(id:string, name:Company) {
    if (id && name) {
      return this.companies.upsert({
        id: id,
        name: name
      })
    }
  }
  deleteCompany(id:string) {
    if (id) {
      return this.companies.remove({ id: id });
    }
  }
  findCompany(id:string) {
    if (id) {
      return this.companies.find({ id: id }).fetch();
    }
  }
}

export interface Company {
  name: string;
}

export interface Companies extends Array<Company> { }
