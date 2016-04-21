System.register(['angular2/core', './../../services/townService.component', 'angular2/router', './../subComponents/input/townSelector.component'], function(exports_1, context_1) {
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
    var core_1, townService_component_1, router_1, router_2, townSelector_component_1;
    var TownComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            }],
        execute: function() {
            TownComponent = (function () {
                function TownComponent(_townService, _routeParams) {
                    this._townService = _townService;
                    this._routeParams = _routeParams;
                    this.title = 'Gemeente - home';
                    this.name = "";
                }
                TownComponent.prototype.ngOnInit = function () {
                    this.name = this._routeParams.get('town');
                };
                TownComponent = __decorate([
                    core_1.Component({
                        selector: 'home-container',
                        template: "\n        <div class=\"home-menu menu\">\n                <a [routerLink]=\"['Home']\">Home</a>\n                <a [routerLink]=\"['TownBudget']\">Begrotingsvoorstel</a>\n                <town-selector></town-selector>\n\n</div>\n<h3>{{name}}</h3>",
                        directives: [router_2.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent],
                        providers: [
                            townService_component_1.TownService,
                        ],
                        styles: ["\n    town-selector{\nfloat: right;\n\n}\n\n.home-menu {\n    padding: 10px 20px 20px 30px;\n    background-color: #2ac7d2;\n}\n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, router_1.RouteParams])
                ], TownComponent);
                return TownComponent;
            }());
            exports_1("TownComponent", TownComponent);
        }
    }
});
//# sourceMappingURL=town.component.js.map