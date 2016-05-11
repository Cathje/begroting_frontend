System.register(['angular2/core', 'angular2/router', './../../../services/townService.component.js', "../../../models/mainTown.js"], function(exports_1, context_1) {
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
    var core_1, router_1, townService_component_js_1, mainTown_js_1;
    var TownSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            }],
        execute: function() {
            TownSelectorComponent = (function () {
                function TownSelectorComponent(_router, _townService) {
                    //this.towns = _townService.getTownsHC();
                    var _this = this;
                    this._router = _router;
                    this._townService = _townService;
                    this.selectedTown = new mainTown_js_1.MainTown("Berchem", "2600", 0, 0);
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                }
                TownSelectorComponent.prototype.gotoHome = function (event) {
                    // alert(event.target.value)
                    this._router.navigate(['/', 'App', 'Budget', { town: event.target.value }]);
                };
                TownSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'town-selector',
                        template: "\n                 <div class=\" styled-select slate right-align\">\n                    <select class=\"\" (change)=\"gotoHome($event)\">\n                        <option>Selecteer een gemeente</option>\n                        <option *ngFor=\"#town of towns\" [value]=\"town.naam\">{{town.naam}} </option>\n                    </select>\n                </div>\n    ",
                        providers: [townService_component_js_1.TownService],
                        styles: ["\n.slate{\n    text-align: center;\n    color:black;\n}\n\n.styled-select {\n    overflow: hidden;\n    width: 240px;\n    margin: 0 auto;\n}\n\n.styled-select select {\n    background: url(./app/images/arrow_down.png) no-repeat right rgba(255,255,255, 0.6);\n    background-size: 35px 35px;\n    border: none;\n    font-size: 14px;\n    height: 29px;\n    padding: 5px; /* If you add too much padding here, the options won't show in IE */\n    width: 240px;\n}\n\nselect::-ms-expand {\n    display: none;\n}\n\nselect {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    text-indent: 1px;\n    text-overflow: '';\n}\n\n      ",]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object])
                ], TownSelectorComponent);
                return TownSelectorComponent;
                var _a;
            }());
            exports_1("TownSelectorComponent", TownSelectorComponent);
        }
    }
});
//# sourceMappingURL=townSelector.component.js.map