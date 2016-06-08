declare var Horizon: any;
import {Injectable} from '@angular/core';
import * as config from '../config';
import {Observable} from 'rxjs/Rx'
@Injectable()
export class CertificatesService {
    certificates;
    horizon;
    private apiUrl = 'http://localhost:8181/api';
    constructor() {
        this.horizon = Horizon({ host: `${config.SERVER_DOMAIN}:${config.SERVER_PORT}` });
        this.certificates = this.horizon('certificates');
    }
    load(): Observable<any> {
        return this.certificates
            .watch()
    }
    createCertificate(certificate) {

    }
    deleteCertificate(id) {

    }
    editCertificate(id) {

    }
}

interface Certificate {
    name: string;
    department: string;
    company: string;
    expDate: Date;
}