System.register(['angular2/core', './../../../services/townService.component.js', './../input/townSelector.component.js', "./../../../models/mainTown.js", 'angular2/router'], function(exports_1) {
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
    var core_1, townService_component_js_1, townSelector_component_js_1, mainTown_js_1, router_1;
    var TownMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TownMenuComponent = (function () {
                function TownMenuComponent() {
                    this.mainTown = new mainTown_js_1.MainTown("", ""); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                }
                TownMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'townMenu',
                        template: "\n        <nav class=\"home-menu\" >\n                <div class=\"breadcrum\" >\n                <a [routerLink]=\"['Home']\">Home</a>\n                <a [routerLink]=\"['TownBudget']\">Begrotingsvoorstel</a>\n                </div>\n                <h3>{{mainTown?.naam}}</h3>\n                <town-selector></town-selector>              \n        </nav>\n         \n        \n        \n",
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_js_1.TownSelectorComponent],
                        providers: [
                            townService_component_js_1.TownService,
                        ],
                        styles: ["\n   \n    .home-menu {\n    padding: 1% 2% 0 2%; \n    background-color: #2ac7d2;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    }\n\n    h3 {\n    margin: 0;\n    padding-bottom: 1%;\n    font-size: 3rem;\n    }\n    \n    \n    \n"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TownMenuComponent);
                return TownMenuComponent;
            })();
            exports_1("TownMenuComponent", TownMenuComponent);
        }
    }
});
//# sourceMappingURL=townMenu.component.js.map