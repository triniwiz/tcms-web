import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CompaniesService} from '../../services/companies.service';
import {ActionButtons} from './companies-action-buttons/action-buttons.component';
declare var Horizon: any;
declare var $: any;
declare var _:any;
@Component({
    templateUrl: './app/components/companies/companies.html',
    directives: [ROUTER_DIRECTIVES, ActionButtons],
    providers: [CompaniesService]
})
export class CompaniesComponent implements OnActivate {
    title: string;
    companies;
    horizon;
    selected;
    allSelected;
    addCompanyModal;
    editCompanyModal;
    newCompany;
    constructor(private router: Router, private companiesService: CompaniesService) {
        this.title = "Companies";
        this.newCompany = "";
        this.allSelected = false;
        this.selected = [];
    }
    routerOnActivate() {
        this.load();
        $('table #checkAll')
            .checkbox({
                // check all children
                onChecked: function () {
                    var children = $('.company-checkbox').checkbox('uncheck');
                    children.checkbox('check');
                },
                // uncheck all children
                onUnchecked: function () {
                    var children = $('.company-checkbox').checkbox('uncheck');
                    children.checkbox('uncheck');
                }
            });
    }
    load() {
        this.companiesService.load()
            .subscribe(
            res => { this.companies = [...res] },
            error => { console.log(error) });
    }

    selectAll() {

        if (this.allSelected) {

        }

    }
    itemSelected(id, isChecked) {
        if (this.selected.indexOf(id) === -1 && isChecked) {
            this.selected.push(id);
        } else if (this.selected.indexOf(id) > -1 && !isChecked) {
            this.selected.forEach((item, index) => {
                if (item === id) {
                    this.selected.splice(index, 1)
                }
            })
        }
    }

    addCompany() {
      const company = $('#newCompany');
        $('#addModal')
            .modal({
                closable: true,
                onDeny: () => {
                },
                onApprove: () => {
                    this.newCompany = company.val();
                    if (!this.newCompany) return false;
                    this.companiesService.createCompany(this.newCompany);
                    company.val('');
                    this.newCompany = '';
                }
            })
            .modal('show');
    }
    editCompany(id) {
        let edit: Observable<any> = this.companiesService.findCompany(id);
      const company = $('#editCompany');
        edit.subscribe(
            res => {
                company.val(res.name);
                openModal();
            },
            error => {

            }
        );

        let openModal = () => {
            $('#editModal')
                .modal({
                    closable: true,
                    onDeny: () => {

                    },
                    onApprove: () => {
                        this.companiesService.editCompany(id, company.val());
                        company.val('');
                    }
                })
                .modal('show');
        }

    }
    deleteCompany() {
        $('#deleteModal')
            .modal({
                closable: true,
                onDeny: () => {

                },
                onApprove: () => {
                    this.selected.forEach((id, index) => {
                        this.companiesService.deleteCompany(id);
                    })
                }
            })
            .modal('show');
    }
}
