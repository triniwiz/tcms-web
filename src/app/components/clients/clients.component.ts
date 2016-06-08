import {Component,ChangeDetectionStrategy} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import {ClientsService} from '../../services/clients.service';
import {ActionButtons} from './clients-action-buttons/action-buttons.components';
import {CompaniesService} from '../../services/companies.service';
import {Observable} from 'rxjs/Rx';
import {AdminFilter} from '../../pipes/admin.pipe';
import {CompanyNamePipe} from '../../pipes/company.pipe';
declare var $: any;
@Component({
  templateUrl: './app/components/clients/clients.html',
  directives: [ROUTER_DIRECTIVES, ActionButtons],
  providers: [ClientsService, CompaniesService],
  pipes: [AdminFilter,CompanyNamePipe],
  changeDetection:ChangeDetectionStrategy.Default
})
export class ClientsComponent implements OnActivate {
  title: string;
  selected;
  allSelected;
  clients;
  newClientModel;
  editClientModel;
  companies;
  constructor(private clientsService: ClientsService, private companiesService: CompaniesService, private router: Router) {
    this.title = "Clients";
    this.allSelected = false;
    this.selected = [];
  }

  routerOnActivate() {
    this.load();
    this.companiesService.load()
      .subscribe(
      res => {
        this.companies = [...res]
      },
      err => { console.log(err) }
      )
  }

  load() {
    this.clientsService.load()
      .subscribe(
      res => {
        this.clients = [...res];
      },
      err => {
        console.log(err)
      }
      )
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

  addClient() {
    $('#addModal')
      .modal({
        closable: true,
        onDeny: () => {
          $('#newClient').form('clear');
        },
        onApprove: () => {
          const form = $('#newClientForm');
          this.newClientModel = {
            firstName: form.form('get value', 'firstName'),
            lastName: form.form('get value', 'lastName'),
            email: form.form('get value', 'email'),
            company: form.form('get value', 'company'),
            password: form.form('get value', 'password')
          }

           if (!this.newClientModel) return;
           this.clientsService.createClient(this.newClientModel);
           $('#newClient').form('clear');
        }
      })
      .modal('show');
  }

  editClient(id) {
    let edit: Observable<any> = this.clientsService.findClient(id);
    let $hz_v$;
    edit.subscribe(
      res => {
        $hz_v$ = res.$hz_v$;
        $('#editClientForm')
          .form('set values', {
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            company: res.company
          })
        openModal();
      },
      error => {

      }
    )

    let openModal = () => {
      $('#editModal')
        .modal({
          closable: true,
          onDeny: () => {
            $('#editClientForm')
              .form('clear')
          },
          onApprove: () => {
            let form = $('#editClientForm');
            let client = {
              firstName: form.form('get value', 'firstName'),
              lastName: form.form('get value', 'lastName'),
              email: form.form('get value', 'email'),
              company: form.form('get value', 'company'),
              $hz_v$: $hz_v$
            }
            this.clientsService.editClient(id, client);
            $('#editClientForm').form('clear');
          }
        })
        .modal('show');
    }

  }

  deleteClient() {
    $('#deleteModal')
      .modal({
        closable: true,
        onDeny: () => {

        },
        onApprove: () => {
          this.selected.forEach((id, index) => {
            this.clientsService.deleteClient(id);
          })
        }
      })
      .modal('show');
  }
}
