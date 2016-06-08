import {Component,Output,EventEmitter} from '@angular/core';

@Component({
    selector:'menu',
    templateUrl : 'app/components/menu/menu.html' 
})

export class MenuComponent{
    @Output() logOutMenuEvent:EventEmitter = new EventEmitter();
    @Output() logOutEvent:EventEmitter = new EventEmitter();
}