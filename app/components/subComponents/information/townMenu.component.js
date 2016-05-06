System.register(['angular2/core', './../../../services/townService.component', './../input/townSelector.component', "./../../../models/mainTown", 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, townService_component_1, townSelector_component_1, mainTown_1, router_1;
    var TownMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TownMenuComponent = (function () {
                function TownMenuComponent() {
                    this.mainTown = new mainTown_1.MainTown("", ""); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                }
                TownMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'townMenu',
                        template: "\n        <nav class=\"home-menu\" >\n                <div class=\"breadcrum\" >\n                <a [routerLink]=\"['Home']\">Home</a>\n                <a [routerLink]=\"['TownBudget']\">Begrotingsvoorstel</a>\n                </div>\n                <h3>{{mainTown?.naam}}</h3>\n                <town-selector></town-selector>              \n        </nav>\n         \n        \n        \n",
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent],
                        providers: [
                            townService_component_1.TownService,
                        ],
                        styles: ["\n   \n    .home-menu {\n    padding: 1% 2% 0 2%; \n    background-color: #2ac7d2;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    }\n\n    h3 {\n    margin: 0;\n    padding-bottom: 1%;\n    font-size: 3rem;\n    }\n    \n    \n    \n"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TownMenuComponent);
                return TownMenuComponent;
            }());
            exports_1("TownMenuComponent", TownMenuComponent);
        }
    }
});
//# sourceMappingURL=townMenu.component.js.map