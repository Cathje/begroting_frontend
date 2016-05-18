System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../models/mainTown", "../../../models/politicusType", "../../subComponents/input/townSelector.component"], function(exports_1) {
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
    var core_1, router_1, townService_component_1, mainTown_1, politicusType_1, townSelector_component_1;
    var ManageTownComponent;
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
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (politicusType_1_1) {
                politicusType_1 = politicusType_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            }],
        execute: function() {
            ManageTownComponent = (function () {
                function ManageTownComponent(_routeParams, _townService, _router) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    // newBestuur:Bestuur = new Bestuur(""); // this gives an error
                    this.types = politicusType_1.PoliticusType;
                    this.selectedType = politicusType_1.PoliticusType.Schepen;
                    _townService.getTown(_routeParams.get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; });
                    this._townService = _townService;
                    //  alert(_routeParams.get('town'));
                }
                ManageTownComponent.prototype.onSelect = function (event) {
                    this.selectedType = event.target.value;
                };
                ManageTownComponent.prototype.submit = function () {
                    this._townService.putTown(this.mainTown).subscribe();
                    this._router.navigate(['MainTown', { town: this.mainTown.naam }]);
                };
                ManageTownComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-town-container',
                        template: "\n    <div class=\"container\">\n<h2>Isntellingen gemeente</h2>\n\n\n</div>\n",
                        providers: [townService_component_1.TownService],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, townService_component_1.TownService, router_1.Router])
                ], ManageTownComponent);
                return ManageTownComponent;
            })();
            exports_1("ManageTownComponent", ManageTownComponent);
        }
    }
});
//# sourceMappingURL=manageTown.component.js.map