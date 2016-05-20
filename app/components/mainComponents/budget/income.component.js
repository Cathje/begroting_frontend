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
    var IncomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            IncomeComponent = (function () {
                function IncomeComponent() {
                }
                IncomeComponent = __decorate([
                    core_1.Component({
                        selector: 'income-container',
                        template: "\n        <div class=\"container\">\n            <section class=\"intro col-xs-12\">\n                <h1>De inkomsten van {{mainTown?.naam}}</h1>\n                <p>\n                Er is nog geen informatie beschikbaar over de inkomsten van de gemeente {{mainTown?.naam}}. Neem binnenkort terug een kijkje.\n                </p>\n            </section>\n       </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], IncomeComponent);
                return IncomeComponent;
            }());
            exports_1("IncomeComponent", IncomeComponent);
        }
    }
});
//# sourceMappingURL=income.component.js.map