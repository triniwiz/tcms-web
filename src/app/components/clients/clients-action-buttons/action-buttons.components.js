"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Osei Fortune on 6/6/16.
 */
var core_1 = require('@angular/core');
var ActionButtons = (function () {
    function ActionButtons() {
        this.addEvent = new core_1.EventEmitter();
        this.editEvent = new core_1.EventEmitter();
        this.deleteEvent = new core_1.EventEmitter();
    }
    ActionButtons.prototype.addClient = function () {
        this.addEvent.emit('add');
    };
    ActionButtons.prototype.editClient = function (id) {
        this.editEvent.emit(id);
    };
    ActionButtons.prototype.deleteClient = function () {
        this.deleteEvent.emit(this.selected);
    };
    __decorate([
        core_1.Input()
    ], ActionButtons.prototype, "selected");
    __decorate([
        core_1.Output()
    ], ActionButtons.prototype, "addEvent");
    __decorate([
        core_1.Output()
    ], ActionButtons.prototype, "editEvent");
    __decorate([
        core_1.Output()
    ], ActionButtons.prototype, "deleteEvent");
    ActionButtons = __decorate([
        core_1.Component({
            selector: 'action-buttons',
            templateUrl: './app/components/clients/clients-action-buttons/action-buttons.html'
        })
    ], ActionButtons);
    return ActionButtons;
}());
exports.ActionButtons = ActionButtons;
//# sourceMappingURL=action-buttons.components.js.map