System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
                    console.log('here', event);
                    this.changeRequest.emit("hello");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], SelectorComponent.prototype, "options");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SelectorComponent.prototype, "callbackFunction");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SelectorComponent.prototype, "defaultOption");
                __decorate([
                    core_1.Output, 
                    __metadata('design:type', Object)
                ], SelectorComponent.prototype, "changeRequest");
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