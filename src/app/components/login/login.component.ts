declare var Horizon: any
import {Component, OnInit} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {LoginService} from '../../services/login.service';
import jQuery = require('jquery');
import _ = require('lodash');
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {DashBoardComponent} from '../dashboard/dashboard.component';
@Component({
    templateUrl: './app/components/login/login.html',
    providers: [HTTP_PROVIDERS, LoginService]
})

export class LoginComponent implements OnInit {
    horizon;
    isLogingIn: boolean;
    private user: User;
    constructor(private loginService: LoginService, private router: Router) {
        this.user = { email: 'osei.fortune@tosl.com', password: '123456' };
        this.isLogingIn = false;
    }
    ngOnInit() {
        if (this.getToken()) {
            this.horizon = Horizon({ host: 'localhost:8181', authType: 'token' })
            this.router.navigate(['/dashboard/certificates']);
        } else {
            this.removeToken();
        }
    }
    login(user) {
        this.isLogingIn = true;
        localStorage.removeItem('horizon-jwt');
        this.loginService.userLogin(user)
            .subscribe((data) => {
                localStorage.setItem('horizon-jwt', '{ "horizon":' + '"' + data.token.trim() + '"' + '}');
                this.horizon = Horizon({ host: 'localhost:8181', authType: 'token' });
                this.router.navigate(['/dashboard']);
                this.isLogingIn = false;
            }, (err) => {
                this.isLogingIn = false;
                console.log(err)
            })

    }
    private removeToken() {
        localStorage.removeItem('horizon-jwt');
    }
    private getToken() {
        return localStorage.getItem('horizon-jwt');
    }

}

interface User {
    email: string;
    password: string;
}