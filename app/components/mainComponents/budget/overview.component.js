System.register(['angular2/core', './../../../services/townService.component.js', 'angular2/http', 'angular2/router', './../../subComponents/input/townSelector.component.js', './../../subComponents/input/editableField.component.js', "../../../models/mainTown.js", './../../subComponents/graphs/sunburst.component.js', "../../../services/begrotingService.js", "../../../services/ActieService.js"], function(exports_1, context_1) {
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
    var core_1, townService_component_js_1, http_1, router_1, townSelector_component_js_1, editableField_component_js_1, mainTown_js_1, sunburst_component_js_1, begrotingService_js_1, ActieService_js_1;
    var OverviewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            },
            function (editableField_component_js_1_1) {
                editableField_component_js_1 = editableField_component_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            },
            function (sunburst_component_js_1_1) {
                sunburst_component_js_1 = sunburst_component_js_1_1;
            },
            function (begrotingService_js_1_1) {
                begrotingService_js_1 = begrotingService_js_1_1;
            },
            function (ActieService_js_1_1) {
                ActieService_js_1 = ActieService_js_1_1;
            }],
        execute: function() {
            OverviewComponent = (function () {
                function OverviewComponent(_townService, _begrotingService, _actieService, http, params, injector, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this.http = http;
                    this._router = _router;
                    this.title = 'Gemeente - home';
                    this.imglink = "";
                    this.name = "";
                    this.mainTown = new mainTown_js_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    this.isVisable = false;
                    this.contentbutton = "meer info";
                    this.showActions = false;
                    this.isEditor = false; //TODO: adapt value when signed in with special role
                    this.categories = [{ ID: "0990", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Financiële aangelegenheden", totaal: 22781 },
                        { ID: "0991", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Patrimonium zonder maatschappelijk doel", totaal: 281 },
                        { ID: "099", naamCaty: "Zorg en opvang", naamCatz: "Gezin en kinderen", totaal: 3311 },
                        { ID: "098", naamCaty: "Cultuur en vrije tijd", naamCatz: "Sport", totaal: 906 }];
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 4;
                    this.onCircleClick = function (id) {
                        _this.showActions = true;
                        //TODO: replace hardcoded 15 with id
                        _this._actieService.getActies(15)
                            .subscribe(function (acties) { return _this.acties = acties; });
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.8;
                        }
                        else {
                            _this.width = window.innerWidth / 4;
                        }
                    };
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                        _this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') + ".png";
                    });
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.categories = finan; });
                    this._actieService = _actieService;
                }
                OverviewComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                OverviewComponent.prototype.toggle = function () {
                    this.isVisable = !this.isVisable;
                };
                OverviewComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-container',
                        template: "\n        <div class=\"container\">\n        <div class=\"intro col-xs-12\">\n            <h1>Overzicht {{mainTown?.naam}}</h1>\n            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n        </div>\n\n        <section class=\"col-xs-12 col-sm-5\">\n            <h4> Kerngegevens</h4>\n                                    <img class='icon' src=\"/app/images/icons/population.png\">\n\n         <button type=\"button\" class=\"btn btn-primary comparebtn\" [routerLink]=\"['CoreData']\">Meer info</button>\n        </section>\n\n\n        <section class=\"col-xs-12 col-sm-5\">\n           <h4> Uitgaves</h4>\n                      <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n\n           <button type=\"button\" class=\"btn btn-primary proposebtn\" [routerLink]=\"['Expenses']\">Meer info</button>\n\n        </section>\n\n                <section class=\"col-xs-12 col-sm-5\">\n                 <h4> Openstaande projecten</h4>\n\n                 <button type=\"button\" class=\"btn btn-primary salarybtn\" [routerLink]=\"['Taxes']\">Meer info</button>\n\n        </section>\n\n\n        <section class=\"col-xs-12 col-sm-5\">\n                    <h4> Plannen</h4>\n\n           <button type=\"button\" class=\"btn btn-primary propositionsbtn\" >Meer info</button>\n\n        </section>\n\n       </div>\n",
                        directives: [townSelector_component_js_1.TownSelectorComponent, editableField_component_js_1.EditableFieldComponent, sunburst_component_js_1.SunburstComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [begrotingService_js_1.BegrotingService, ActieService_js_1.ActieService,
                            townService_component_js_1.TownService,
                        ],
                        styles: ["\n\n    .icon {\n    max-width: 300px;\n    margin: 0 auto;\n    display: block;\n    }\n\n    h2 {\n    text-align: left;\n    margin: 20px 0;\n    }\n\n    h3 {\n    margin: 0;\n    padding-bottom: 1%;\n    font-size: 3rem;\n    }\n\n\n    h4{\n    margin-bottom: 20px;\n    }\n\n    .container {\n    max-width: 1200px;\n    }\n\n    .noData {\n    font-size: 1.3em;\n    margin-top: 150px;\n    text-align: center;\n    }\n    .comparebtn, .salarybtn , .propositionsbtn, .proposebtn {\n    position: absolute;\n    margin: 20px;\n    bottom: 0;\n    right: 0px;\n    }\n\n    #info-town   {\n    padding: 1%;\n    flex-shrink: 2; \n    -webkit-flex-shrink: 2;\n    }\n\n    .intro {\n    padding: 20px;\n    }\n\n    .clearfix:after {\n    content: \" \";\n   display: block;\n   height: 0;\n   clear: both;\n    }\n\n    .provincie {\n    }\n    .graph {\n    padding: 40px 20px;\n    text-align: center;\n    margin: O auto;\n    position: relative;\n    }\n\n    .pointer p{\n     display: inline-block;\n    }\n\n    .pointer h3 {\n    color:black;\n    }\n\n    .pointer {\n    margin-top: 20px;\n    }\n\n    .pointer ul {\n    overflow: scroll;\n    height: 400px;\n    border: 1px dashed black;\n    padding:20px;\n    }\n\n    .pointer li {\n    padding: 5px;\n    }\n\n    .demographic{\n    text-align: center;\n    }\n\n    .geographic {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1;\n    -webkit-flex-grow: 1;\n    text-align: right;\n    }\n        \n    #actions   {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1; \n    -webkit-flex-grow: 1;\n\n    }\n\n\n    label {\n    display:block;\n    }\n    \n    .showInfo{\n        float: right;\n        background: #3498db;\n         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n         background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n         background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n         background-image: -o-linear-gradient(top, #3498db, #2980b9);\n         background-image: linear-gradient(to bottom, #3498db, #2980b9);\n         width: 55%;\n         color: #ffffff;\n         text-decoration: none;\n         font-size: 0.8em;\n    }\n\n    section {\n    height: 400px;\n    border: 1px solid black;\n    margin: 20px;\n    }\n\n    \n"]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, (typeof (_b = typeof begrotingService_js_1.BegrotingService !== 'undefined' && begrotingService_js_1.BegrotingService) === 'function' && _b) || Object, (typeof (_c = typeof ActieService_js_1.ActieService !== 'undefined' && ActieService_js_1.ActieService) === 'function' && _c) || Object, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], OverviewComponent);
                return OverviewComponent;
                var _a, _b, _c;
            }());
            exports_1("OverviewComponent", OverviewComponent);
        }
    }
});
//# sourceMappingURL=overview.component.js.map