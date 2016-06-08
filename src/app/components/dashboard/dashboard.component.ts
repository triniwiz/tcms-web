import {Component, ElementRef, OnInit} from '@angular/core';
import {Routes, Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {CertificatesComponent} from '../certificates/certificates.component';
import {ClientsComponent} from '../clients/clients.component';
import {CompaniesComponent} from '../companies/companies.component';
import {LoginService} from '../../services/login.service';
declare var $: any;
@Component({
    templateUrl: './app/components/dashboard/dashboard.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

@Routes([
    { path: '/companies', component: CompaniesComponent },
    { path: '/certificates', component: CertificatesComponent },
    { path: '/clients', component: ClientsComponent }
])
export class DashBoardComponent implements OnActivate {
    userMenu;
    constructor(private router: Router, private elementRef: ElementRef, private login: LoginService) {
        this.userMenu = false;
    }
    ngOnInit() {
        $("#user-dropdown").dropdown();
    }
    routerOnActivate(context: RouteSegment) {
        //console.log(context)
    }
    toggleMenu() {
        $('#sidebar').sidebar('toggle');
    }
    goTo(route) {
        $('#sidebar').sidebar('hide');
        this.router.navigate([route])
    }
    toggleDropdown() {

    }

    logOut() {
        $("#user-dropdown").dropdown('hide');
        this.login.userLogout();
    }
}