import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'action-buttons',
    templateUrl: './app/components/certificates/certificates-action-buttons/action-buttons.html'
})

export class ActionButtons {
    @Input() selected;
    @Output() addEvent: EventEmitter<any> = new EventEmitter();
    @Output() editEvent: EventEmitter<any> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    addCertificate() {
        this.addEvent.emit('add');
    }
    editCertificate(id) {
        this.editEvent.emit(id);
    }
    deleteCertificate() {
        this.deleteEvent.emit(this.selected);
    }

}