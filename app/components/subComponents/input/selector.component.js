System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var SelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SelectorComponent = (function () {
                function SelectorComponent() {
                    this.changeRequest = new core_1.EventEmitter();
                }
                SelectorComponent.prototype.onChange = function (event) {
                    this.changeRequest.emit("");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], SelectorComponent.prototype, "options", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SelectorComponent.prototype, "callbackFunction", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SelectorComponent.prototype, "defaultOption", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SelectorComponent.prototype, "changeRequest", void 0);
                SelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'selector',
                        template: "\n                 <div class=\" styled-select slate right-align\">\n                    <select class=\"\" (change)=\"onChange($event)\">\n                        <option>{{defaultOption}}</option>\n                        <option *ngFor=\"#option of options\" [value]=\"option\">{{option}} </option>\n                    </select>\n                </div>\n    ",
                        styles: ["\n\n      ",]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SelectorComponent);
                return SelectorComponent;
            })();
            exports_1("SelectorComponent", SelectorComponent);
        }
    }
});
//# sourceMappingURL=selector.component.js.map