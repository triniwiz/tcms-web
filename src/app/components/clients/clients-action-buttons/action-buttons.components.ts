/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Component,Input,Output,EventEmitter} from '@angular/core';
@Component({
  selector:'action-buttons',
  templateUrl:'./app/components/clients/clients-action-buttons/action-buttons.html'
})

export class ActionButtons{
  @Input() selected;
  @Output() addEvent:EventEmitter<any> = new EventEmitter();
  @Output() editEvent:EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent:EventEmitter<any> = new EventEmitter();

  addClient(){
    this.addEvent.emit('add');
  }
  editClient(id){
    this.editEvent.emit(id);
  }
  deleteClient(){
    this.deleteEvent.emit(this.selected);
  }
}
