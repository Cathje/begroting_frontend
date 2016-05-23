System.register(['angular2/core', 'angular2/router', "../../subComponents/input/townSelector.component", "../../../services/townService.component", "../../../models/politicusType", "../../../models/mainTown", "../../../models/bestuur", "../../../pipes/keysPipe"], function(exports_1, context_1) {
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
    var core_1, router_1, townSelector_component_1, townService_component_1, politicusType_1, mainTown_1, bestuur_1, keysPipe_1;
    var ManageDataComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (politicusType_1_1) {
                politicusType_1 = politicusType_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (bestuur_1_1) {
                bestuur_1 = bestuur_1_1;
            },
            function (keysPipe_1_1) {
                keysPipe_1 = keysPipe_1_1;
            }],
        execute: function() {
            ManageDataComponent = (function () {
                function ManageDataComponent(_routeParams, _townService, _router, params, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    this.types = politicusType_1.PoliticusType;
                    this.bestuur = new bestuur_1.Bestuur("", null);
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = err; });
                }
                ManageDataComponent.prototype.onSelect = function (event) {
                    this.bestuur.type = event.target.value;
                };
                ManageDataComponent.prototype.submit = function () {
                    //TODO: extra info over projecten moet ook bewaard worden in de databank
                    this._townService.putTown(this.mainTown).subscribe();
                    this._router.navigate(['/', 'App', 'Budget', { town: this.mainTown.naam }]);
                };
                ManageDataComponent.prototype.voegToe = function () {
                    this.mainTown.bestuur.push(new bestuur_1.Bestuur(this.bestuur.naam, this.bestuur.type));
                    console.log(this.mainTown.bestuur);
                };
                ManageDataComponent.prototype.verwijder = function (id, b) {
                    //@TODO geeft in code een error maar werkt --> ??
                    this.mainTown.bestuur.pop(b);
                    if (id != 0) {
                        this._townService.deleteBestuurslid(id).subscribe();
                    }
                };
                ManageDataComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-data-container',
                        template: "\n    <p class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</p>\n    <section class=\"container\">\n        <h1>Beheer informatie</h1>\n        <section class=\"col-xs-12 form-inline\">\n            <h3>Demografische gegevens</h3>\n            <div class=\"section-content\">\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n            <label >Aantal bewoners</label>\n             <input class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.aantalBewoners\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6  form-group\">\n           <label >Aantal vrouwen</label>\n           <input  class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.isVrouw\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                        <label >Aantal mannen</label>\n                       <input class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.isMan\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                        <label >Aantal kinderen</label>\n                        <input class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.isKind\"/>\n        </div>\n        </div>\n    </section>\n\n    <section class=\"col-xs-12 form-inline\">\n        <h3>Geografische gegevens</h3>\n        <div class=\"section-content\">\n        <div class=\"col-xs-12 col-sm-11 form-group\">\n                     <label>Provincie:</label>\n                     <span>{{mainTown.provincie}}</span>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                     <label>Oppervlakte:</label>\n                     <input  class=\"form-control\" type=\"number\" [(ngModel)]=\"mainTown.oppervlakte\"/>\n        </div>\n        <div class=\"col-xs-12 col-sm-6 form-group\">\n                     <label >Oppervlaktemaat:</label>\n                     <input class=\"form-control\" type=\"text\" [(ngModel)]=\"mainTown.oppervlakteMaat\"/>\n        </div>\n        <div class=\"col-xs-12 form-group\">\n                    <label>Deelgemeenten: </label>\n                          <ul *ngIf=\"mainTown?.deelGemeenten\" >\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n        </div>\n        </div>\n    </section>\n    <section class=\"col-xs-12\">\n        <h3>Bestuur</h3>\n        <div class=\"section-content\">\n        <div class=\"form-inline\">\n        <ul *ngIf=\"mainTown?.bestuur\" >\n           <li *ngFor=\"#b of mainTown.bestuur\" >\n           <button class=\"btn btn-primary\"(click)=\"verwijder(b.PoliticusId, b)\" ><span class=\"glyphicon glyphicon-trash\"></span></button>\n           <span>{{b.naam}} - {{types[b.type]}}  </span>\n            </li>\n        </ul>\n        <p *ngIf=\"!mainTown.bestuur\"><i>Er zijn geen gegevens over het bestuur</i></p>\n        </div>\n\n        <div class=\"form-inline\">\n         <button class=\"btn btn-primary\" (click)=\"voegToe()\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n         <div class=\"form-group\">\n            <label >Naam:</label>\n            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"bestuur.naam\"/>\n        </div>\n         <div class=\"form-group\">\n            <label for=\"exampleInputEmail2\">Functie</label>\n            <select class=\"form-control\" (change)=\"onSelect($event)\">\n                <option selected disabled></option>\n                <option *ngFor=\"#t of types | keys\" [value]=\"t.key\">{{t.value}}</option>\n            </select>\n         </div>\n        </div>\n        </div>\n    </section>\n    <section class=\"col-xs-12 form-inline\">\n        <h3> Extra informatie over projecten </h3>\n        <div class=\"section-content\">\n        <h4> Voeg hieronder extra informatie toe over toekomstige projecten en/of projecten uit het verleden </h4>\n                <div class=\"col-xs-12 col-md-6 form-group\">\n                     <label>Jaar:</label>\n                     <input  class=\"form-control\" type=\"number\" [(ngModel)]=\"year\"/>\n               </div>\n\n                <div class=\"col-xs-12 form-group\">\n                    <label>Informatie:</label>\n                    <textarea class=\"form-control\" rows=\"2\" [(ngModel)]=\"information\"></textarea>\n                </div>\n        </div>\n    </section>\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\">opslaan</button>\n</section>\n",
                        providers: [townService_component_1.TownService],
                        pipes: [keysPipe_1.KeysPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent],
                        styles: ["\n\n    label{\n        text-align: left;\n        width: 120px;\n        background-color:white;\n    }\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .form-inline:nth-child(2) {\n        border-top: 1px dashed lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    textarea {\n        width: 100% !important;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, townService_component_1.TownService, router_1.Router, router_1.RouteParams, core_1.Injector])
                ], ManageDataComponent);
                return ManageDataComponent;
            }());
            exports_1("ManageDataComponent", ManageDataComponent);
        }
    }
});
//# sourceMappingURL=manageData.component.js.map