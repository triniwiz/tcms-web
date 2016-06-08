import {Http, Headers, RequestOptions} from "@angular/http";
declare var Horizon: any;
import {Injectable} from '@angular/core';
import * as config from '../config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class ClientsService {
    clients;
    horizon;
    private apiUrl = 'http://localhost:8181/api';
    constructor(private http: Http) {
        this.horizon = Horizon({ host: `${config.SERVER_DOMAIN}:${config.SERVER_PORT}` });
        this.clients = this.horizon('users');

    }
    load(): Observable<any> {
        return this.clients
            .watch()
    }

    createClient(client) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiUrl}/user/register`, client, options)
            .map(
            res => {
                console.log(res)
                if (res.status == 200) {
                    let body = res.json();
                    return body || {};
                }
            },
            error => {
                console.log(error)
                let errorMsg = error.message;
                return Observable.throw(errorMsg)
            }
            )
    }


    editClient(id, client: Client) {
        if (id && client) {
            let obj = (Object).assign({ id: id }, client);
            return this.clients.update(obj);
        }
    }
    deleteClient(id) {
        if (id) {
            return this.clients.remove({ id: id });
        }
    }
    findClient(id) {
        if (id) {
            return this.clients.find({ id: id }).fetch()
        }
    }


}

export interface Client {
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    password?: string;
    $hz_v$: string
}
