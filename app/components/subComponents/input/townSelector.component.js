System.register(['angular2/core', 'angular2/router', './../../../services/townService.component'], function(exports_1, context_1) {
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
    var core_1, router_1, townService_component_1;
    var TownSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            }],
        execute: function() {
            TownSelectorComponent = (function () {
                function TownSelectorComponent(_router, _townService) {
                    this._router = _router;
                    this._townService = _townService;
                    this.title = 'Kies een gemeente';
                    this.towns = this._townService.getHeroes();
                    this.selectedTown = { 'name': 'Berchem' };
                }
                TownSelectorComponent.prototype.gotoHome = function (event) {
                    var link = ['Town', { town: event.target.value }];
                    this._router.navigate(link);
                };
                TownSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'town-selector',
                        template: "<h3>{{title}}</h3>\n                <div class=\"grid grid-pad\">\n                    <select [(ngModel)]=\"selectedTown\" (change)=\"gotoHome($event)\">\n                        <option *ngFor=\"#town of towns\" [value]=\"town.name\">{{town.name}}</option>\n                    </select>\n                </div>",
                        providers: [townService_component_1.TownService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, townService_component_1.TownService])
                ], TownSelectorComponent);
                return TownSelectorComponent;
            }());
            exports_1("TownSelectorComponent", TownSelectorComponent);
        }
    }
});
//# sourceMappingURL=townSelector.component.js.map