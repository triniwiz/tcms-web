import {Injectable} from '@angular/core';
import {Http, Response, RequestMethod, RequestOptions, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import * as config from '../config';
declare var Horizon:any;
@Injectable()
export class LoginService {
  private horizon = Horizon({host: `${config.SERVER_DOMAIN}:${config.SERVER_PORT}`});
  private apiUrl = 'http://localhost:8181/api';

  constructor(private http:Http, private router:Router) {
  }

  userLogin(user):Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.apiUrl}/user/login`, JSON.stringify(user), options)
      .map(
        res => {
          if (res.status == 200) {
            let body = res.json();
            return body || {};
          }
        },
        error => {
          console.log(error);
          let errorMsg = error.message;
          console.log(errorMsg);
          return Observable.throw(errorMsg)
        }
      )

  }

  userLogout() {
    Horizon.clearAuthTokens();
    this.router.navigate(['/login']);
  }


}
