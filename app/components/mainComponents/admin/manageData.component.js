System.register(['angular2/core', 'angular2/router', "../../subComponents/input/townSelector.component.js", "../../../services/townService.component.js", "../../../models/politicusType.js", "../../../models/mainTown.js", "../../../models/bestuur.js", "../../../pipes/keysPipe.js"], function(exports_1, context_1) {
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
                }
                ManageDataComponent.prototype.onSelect = function (event) {
                    this.bestuur.type = event.target.value;
                };
                ManageDataComponent.prototype.submit = function () {
                    this._townService.putTown(this.mainTown).subscribe();
                    this._router.navigate(['/', 'App', 'Budget', { town: this.mainTown.naam }]);
                };
                ManageDataComponent.prototype.voegToe = function () {
                    var b = new bestuur_js_1.Bestuur(this.bestuur.naam, this.bestuur.type);
                    this.mainTown.bestuur.push(b);
                };
                ManageDataComponent.prototype.verwijder = function (id, b) {
                    this.mainTown.bestuur.pop(b);
                    this._townService.deleteBestuurslid(id).subscribe();
                };
                ManageDataComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-data-container',
                        template: "\n<section class=\"container\">\n    <h1>Beheer informatie</h1>\n    <section class=\"col-xs-12\">\n        <h3>Demografische gegevens</h3>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n            <label >Aantal bewoners</label>\n             <div  class=\"input-group-addon\">\n                 <img class='icon' src=\"/app/images/icons/population.png\">\n              </div>\n             <input type=\"number\" [(ngModel)]=\"mainTown.aantalBewoners\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n                        <label >Aantal vrouwen</label>\n                        <div  class=\"input-group-addon\">\n                            <img class='icon' src=\"/app/images/icons/woman.png\">\n                        </div>\n                        <input  type=\"number\" [(ngModel)]=\"mainTown.isVrouw\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n                        <label >Aantal mannen</label>\n                        <div  class=\"input-group-addon\">\n                            <img class='icon' src=\"/app/images/icons/man.png\">\n                        </div>\n                       <input type=\"number\" [(ngModel)]=\"mainTown.isMan\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n                        <label >Aantal kinderen</label>\n                        <div  class=\"input-group-addon\">\n                            <img class='icon' src=\"/app/images/icons/child.png\">\n                        </div>\n                        <input type=\"number\" [(ngModel)]=\"mainTown.isKind\"/>\n        </div>\n    </section>\n\n    <section class=\"col-xs-12\">\n        <h3>Geografische gegevens</h3>\n        <div class=\"col-xs-12 col-sm-12 input-group\">\n                     <label>Provincie:</label>\n                     <span>{{mainTown.provincie}}</span>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n                     <label>Oppervlakte:</label>\n                     <input  type=\"number\" [(ngModel)]=\"mainTown.oppervlakte\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n                     <label >Oppervlaktemaat:</label>\n                     <input type=\"text\" [(ngModel)]=\"mainTown.oppervlakteMaat\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 input-group\">\n                    <label>Deelgemeenten: </label>\n                        <ul *ngIf=\"mainTown?.deelGemeenten\" >\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n                         <h4>Bestuur: </h4>\n                        <ul *ngIf=\"mainTown?.bestuur\" >\n                            <li *ngFor=\"#b of mainTown.bestuur\" ><span>{{b.naam}} - {{types[b.type]}}</span> <button (click)=\"verwijder(b.PoliticusId, b)\" >verwijder betsuurslid</button></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.bestuur\"><i>Er zijn geen gegevens over het bestuur</i></p>\n               \n               <h4>voeg bestuurslid toe: </h4>\n                <p>naam: </p>    \n                           <input type=\"text\" [(ngModel)]=\"bestuur.naam\"/>\n                <select (change)=\"onSelect($event)\">\n                        <option *ngFor=\"#t of types | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                <button (click)=\"voegToe()\">voeg toe</button>\n        </div>\n    </section>\n    <section class=\"col-xs-12\">\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\">opslaan</button>\n    </section>\n</section>\n",
                        providers: [townService_component_js_1.TownService],
                        pipes: [keysPipe_js_1.KeysPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_js_1.TownSelectorComponent],
                        styles: ["\n\n    .icon {\n        width: 13px;\n    }\n    label{\n        text-align: left;\n        width: 120px;\n        background-color:white;\n    }\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    .input-group {\n        float: left;\n    }\n\n    input {\n        text-align: center;\n        border: 1px solid lightgray;\n        height: 30px;\n        width: 100%;\n    }\n\n    button {\n    }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, router_1.Router, router_1.RouteParams, core_1.Injector])
                ], ManageDataComponent);
                return ManageDataComponent;
                var _a;
            }());
            exports_1("ManageDataComponent", ManageDataComponent);
        }
    }
});
//# sourceMappingURL=manageData.component.js.map