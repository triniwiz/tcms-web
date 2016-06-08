import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'action-buttons',
    templateUrl: './app/components/companies/companies-action-buttons/action-buttons.html'
})
export class ActionButtons {
    @Input() selected;
    @Output() addEvent: EventEmitter<any> = new EventEmitter();
    @Output() editEvent: EventEmitter<any> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    addCompany() {
        this.addEvent.emit({});
    }

    editCompany(id) {
        this.editEvent.emit(id);
    }

    deleteCompany() {
        this.deleteEvent.emit(this.selected);
    }
}