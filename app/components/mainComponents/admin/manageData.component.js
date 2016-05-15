System.register(['angular2/core', 'angular2/router', "../../subComponents/input/townSelector.component.js", "../../../services/townService.component.js", "../../../models/politicusType.js", "../../../models/mainTown.js", "../../../models/bestuur.js", "../../../pipes/keysPipe.js"], function(exports_1) {
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
    var core_1, router_1, townSelector_component_js_1, townService_component_js_1, politicusType_js_1, mainTown_js_1, bestuur_js_1, keysPipe_js_1;
    var ManageDataComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (politicusType_js_1_1) {
                politicusType_js_1 = politicusType_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            },
            function (bestuur_js_1_1) {
                bestuur_js_1 = bestuur_js_1_1;
            },
            function (keysPipe_js_1_1) {
                keysPipe_js_1 = keysPipe_js_1_1;
            }],
        execute: function() {
            ManageDataComponent = (function () {
                function ManageDataComponent(_routeParams, _townService, _router, params, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._router = _router;
                    this.mainTown = new mainTown_js_1.MainTown("", "", 0, 0);
                    this.types = politicusType_js_1.PoliticusType;
                    this.bestuur = new bestuur_js_1.Bestuur("");
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; });
                    console.log(this.mainTown);
                }
                ManageDataComponent.prototype.onSelect = function (event) {
                    this.bestuur.type = event.target.value;
                };
                ManageDataComponent.prototype.submit = function () {
                    this._townService.putTown(this.mainTown).subscribe();
                    this._router.navigate(['/', 'App', 'Budget', { town: this.mainTown.naam }]);
                };
                ManageDataComponent.prototype.voegToe = function () {
                    this.mainTown.bestuur.push(this.bestuur);
                    console.log(this.mainTown.bestuur);
                };
                ManageDataComponent.prototype.verwijder = function (id, b) {
                    this.mainTown.bestuur.pop(b);
                    this._townService.deleteBestuurslid(id).subscribe();
                };
                ManageDataComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-data-container',
                        template: "\n<section class=\"container\">\n    <h1>Beheer informatie</h1>\n    <section class=\"col-xs-12 form-inline\">\n        <h3>Demografische gegevens</h3>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n            <label >Aantal bewoners</label>\n             <input class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.aantalBewoners\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6  form-group\">\n           <label >Aantal vrouwen</label>\n           <input  class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.isVrouw\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                        <label >Aantal mannen</label>\n                       <input class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.isMan\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                        <label >Aantal kinderen</label>\n                        <input class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.isKind\"/>\n        </div>\n    </section>\n\n    <section class=\"col-xs-12 form-inline\">\n        <h3>Geografische gegevens</h3>\n        <div class=\"col-xs-12 col-sm-11 form-group\">\n                     <label>Provincie:</label>\n                     <span>{{mainTown.provincie}}</span>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                     <label>Oppervlakte:</label>\n                     <input  class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.oppervlakte\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                     <label >Oppervlaktemaat:</label>\n                     <input class=\"form-control\" type=\"text\" [(ngModel)]=\"mainTown.oppervlakteMaat\"/>\n        </div>\n        <div class=\"col-xs-12 form-group\">\n                    <label>Deelgemeenten: </label>\n                        <ul *ngIf=\"mainTown?.deelGemeenten\" >\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n\n        </div>\n    </section>\n    <section class=\"col-xs-12\">\n        <h3>Bestuur</h3>\n        <ul *ngIf=\"mainTown?.bestuur\" >\n           <li *ngFor=\"#b of mainTown.bestuur\" >\n           <button class=\"btn btn-sm btn-primary\"(click)=\"verwijder(b.PoliticusId, b)\" > - </button>\n           <span>{{b.naam}} - {{types[b.type]}}  </span>\n            </li>\n        </ul>\n        <p *ngIf=\"!mainTown.bestuur\"><i>Er zijn geen gegevens over het bestuur</i></p>\n\n        <h4> Voeg een bestuurslid toe:</h4>\n        <div class=\"form-inline\">\n         <div class=\"form-group\">\n            <label >Naam:</label>\n            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"bestuur.naam\"/>\n        </div>\n         <div class=\"form-group\">\n            <label for=\"exampleInputEmail2\">Functie</label>\n            <select class=\"form-control\" (change)=\"onSelect($event)\">\n                <option>Geen functie</option>\n                <option *ngFor=\"#t of types | keys\" [value]=\"t.key\">{{t.value}}</option>\n            </select>\n         </div>\n         <button class=\"btn btn-primary\" (click)=\"voegToe()\"> + </button>\n        </div>\n\n    </section>\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\">opslaan</button>\n</section>\n",
                        providers: [townService_component_js_1.TownService],
                        pipes: [keysPipe_js_1.KeysPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_js_1.TownSelectorComponent],
                        styles: ["\n\n    h3 {\n        border-bottom: 1px solid lightgray;\n        padding-bottom: 5px;\n    }\n\n    label{\n        text-align: left;\n        width: 120px;\n        background-color:white;\n    }\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .btn-sm {\n        margin-right: 15px;\n    }\n\n    section section {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        padding-top: 0px;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, router_1.Router, router_1.RouteParams, core_1.Injector])
                ], ManageDataComponent);
                return ManageDataComponent;
                var _a;
            })();
            exports_1("ManageDataComponent", ManageDataComponent);
        }
    }
});
//# sourceMappingURL=manageData.component.js.map