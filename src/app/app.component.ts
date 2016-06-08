import {OnInit, Directive, Component} from '@angular/core'
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {LoginComponent, DashBoardComponent, CertificatesComponent, ClientsComponent, CompaniesComponent} from './'
@Component({
    selector: 'tcms-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: '/login', component: LoginComponent },
    { path: '/dashboard', component: DashBoardComponent },
    { path: '/dashboard/certificates', component: CertificatesComponent },
    { path: '/dashboard/clients', component: ClientsComponent },
    { path: '/dashboard/companies', component: CompaniesComponent },

])

export class AppComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit() {
        this.router.navigate(['/login']);
    }
}