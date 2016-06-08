import {Component} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import {CertificatesService} from '../../services/certificates.service';
import {ActionButtons} from './certificates-action-buttons/action-buttons.component';
import {CompaniesService} from '../../services/companies.service'
declare var $: any;
const api = 'http://localhost:8181/api/'
@Component({
    templateUrl: './app/components/certificates/certificates.html',
    directives: [ROUTER_DIRECTIVES, ActionButtons],
    providers: [CertificatesService, CompaniesService]
})

export class CertificatesComponent implements OnActivate {
    title;
    selected;
    allSelected;
    companies;
    certificates;
    constructor(private certificatesService: CertificatesService, private router: Router, private companiesService: CompaniesService) {
        this.title = "Certificates";
        this.selected = [];
        this.allSelected = false;
    }
    routerOnActivate() {
        this.companiesService.load()
            .subscribe(
            res => { this.companies = [...res] },
            err => { console.log(err) }
            )
        this.load();
    }

    load() {
        this.certificatesService.load()
            .subscribe(
            res => { this.certificates = [...res] },
            err => { console.log(err) }
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
    uploadList = [];

    dropzoneConfig = {
        'options': { // passed into the Dropzone constructor
            'url': api + '/certificate/upload?token=' + JSON.parse(localStorage.getItem("horizon-jwt"))['horizon'],
            'paramName': 'certificate',
            'clickable': true,
            'acceptedFiles': ".doc,.docx"
        },
        'eventHandlers': {
            'addedfile': (file) => {
            },
            'sending': (file, xhr, formData) => {
                //     console.log(file, xhr, formData)
            },
            'success': (file, response) => {
                if (response.toString().indexOf('error') < 0) {
                    this.uploadList.push(response);
                }
            }
        }
    };


    addCertificate() {
        $('#addModal')
            .modal({
                closable: true,
                onDeny: () => {
                },
                onApprove: () => {
                    if (!$('#newCompany').val()) return false;
                    //   this.companiesService.save(this.newCompany);
                    //   $('#newCompany').val('');
                    //   this.newCompany = '';
                }
            })
            .modal('show');
    }
    editCertificate() {
        $('#editModal')
            .modal({
                closable: true,
                onDeny: () => {
                },
                onApprove: () => {

                }
            })
            .modal('show');
    }

    deleteCertificate() {
        $('#addModal')
            .modal({
                closable: true,
                onDeny: () => {
                },
                onApprove: () => {

                }
            })
            .modal('show');
    }
}