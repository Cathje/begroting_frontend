System.register(['angular2/core', 'angular2/router', "../../../services/townService.component.js", "../../../models/mainTown.js", "../../../models/politicusType.js", "../../subComponents/input/townSelector.component.js"], function(exports_1) {
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
    var core_1, router_1, townService_component_js_1, mainTown_js_1, politicusType_js_1, townSelector_component_js_1;
    var ManageTownComponent;
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
            },
            function (politicusType_js_1_1) {
                politicusType_js_1 = politicusType_js_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            }],
        execute: function() {
            ManageTownComponent = (function () {
                function ManageTownComponent(_routeParams, _townService, _router) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.mainTown = new mainTown_js_1.MainTown("", "", 0, 0);
                    // newBestuur:Bestuur = new Bestuur(""); // this gives an error
                    this.types = politicusType_js_1.PoliticusType;
                    this.selectedType = politicusType_js_1.PoliticusType.Schepen;
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
                        template: "\n    <div class=\"container\">\n<h2>Beheer gegevens</h2>\n\n <h2>Demografische gegevens</h2>\n                        <h4>Aantal bewoners</h4>\n                        <input type=\"number\" [(ngModel)]=\"mainTown.aantalBewoners\"/>\n\n                        <h4>Aantal vrouwen</h4>\n                        <input type=\"number\" [(ngModel)]=\"mainTown.isVrouw\"/>\n\n                        <h4>Aantal mannen</h4>\n                       <input type=\"number\" [(ngModel)]=\"mainTown.isMan\"/>\n\n                        <h4>Aantal kinderen</h4>\n                        <input type=\"number\" [(ngModel)]=\"mainTown.isKind\"/>\n                        \n                        <!-- @TODO uitzoeken hoe bestuur enkel wordt aangepast in backend en niet opnieuw wordt weggeschreven -->\n                     <!--    <h4>Bestuur: </h4>\n                        <ul *ngIf=\"mainTown?.bestuur\" >\n                            <li *ngFor=\"#bestuur of mainTown.bestuur\"><span>{{bestuur.naam}} - {{types[bestuur.type]}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.bestuur\"><i>Er is nog geen bestuur aangesteld</i></p>\n                        \n                       <h4>Voeg bestuurslid toe</h4>\n                        <input type=\"text\" [(ngModel)]=\"newBestuur.naam\"/>\n                         <select (change)=\"onSelect($event.target.value)\">\n                        <option *ngFor=\"#t of types\" [value]=\"t\">{{t}}</option>\n                         </select> -->\n\n  <h2>Geografische gegevens</h2>\n  \n                     <h4>Provincie:</h4>\n                     <span>{{mainTown.provincie}}</span>\n\n                     <h4>Oppervlakte:</h4>\n                     <input type=\"number\" [(ngModel)]=\"mainTown.oppervlakte\"/>\n                     <h4>Oppervlakte:</h4>\n                     <input type=\"text\" [(ngModel)]=\"mainTown.oppervlakteMaat\"/>\n                     \n                    <h4>Deelgemeenten: </h4>\n                        <ul *ngIf=\"mainTown?.deelGemeenten\" >\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n                   \n                    <button (click)=\"submit()\">opslaan</button>\n</div>\n",
                        providers: [townService_component_js_1.TownService],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_js_1.TownSelectorComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, router_1.Router])
                ], ManageTownComponent);
                return ManageTownComponent;
                var _a;
            })();
            exports_1("ManageTownComponent", ManageTownComponent);
        }
    }
});
//# sourceMappingURL=manageTown.component.js.map