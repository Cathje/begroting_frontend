System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                }
                SelectorComponent.prototype.gotoHome = function (event) {
                    this._router.navigate(['/', 'App', 'Budget', { town: event.target.value }]);
                };
                __decorate([
                    Input, 
                    __metadata('design:type', Array)
                ], SelectorComponent.prototype, "options", void 0);
                __decorate([
                    Input, 
                    __metadata('design:type', Array)
                ], SelectorComponent.prototype, "navigation", void 0);
                __decorate([
                    Input, 
                    __metadata('design:type', String)
                ], SelectorComponent.prototype, "defaultOption", void 0);
                SelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'selector',
                        template: "\n                 <div class=\" styled-select slate right-align\">\n                    <select class=\"\" (change)=\"gotoHome($event)\">\n                        <option>{{defaultOption}}</option>\n                        <option *ngFor=\"#option of options\" [value]=\"option.naam\">{{option.naam}} </option>\n                    </select>\n                </div>\n    ",
                        styles: ["\n.slate{\n    text-align: center;\n    color:black;\n}\n\n.styled-select {\n    overflow: hidden;\n    width: 240px;\n    margin: 0 auto;\n}\n\n.styled-select select {\n    background: url(./../../../../app/images/arrow_down.png) no-repeat right rgba(255,255,255, 0.6);\n    background-size: 35px 35px;\n    border: none;\n    font-size: 14px;\n    height: 29px;\n    padding: 5px; /* If you add too much padding here, the options won't show in IE */\n    width: 240px;\n}\n\nselect::-ms-expand {\n    display: none;\n}\n\nselect {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    text-indent: 1px;\n    text-overflow: '';\n}\n\n      ",]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SelectorComponent);
                return SelectorComponent;
            }());
            exports_1("SelectorComponent", SelectorComponent);
        }
    }
});
//# sourceMappingURL=selector.js.map