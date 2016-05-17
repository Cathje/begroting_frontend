System.register(['angular2/core', './../../../services/townService.component.js', 'angular2/http', 'angular2/router', './../../subComponents/input/townSelector.component.js', './../../subComponents/input/editableField.component.js', "../../../models/mainTown.js", './../../subComponents/graphs/sunburst.component.js', "../../../services/begrotingService.js"], function(exports_1, context_1) {
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
    var core_1, townService_component_js_1, http_1, router_1, townSelector_component_js_1, editableField_component_js_1, mainTown_js_1, sunburst_component_js_1, begrotingService_js_1;
    var ExpensesComponent;
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
            }],
        execute: function() {
            ExpensesComponent = (function () {
                function ExpensesComponent(_townService, _begrotingService, http, params, injector, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
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
                    this.categories = [];
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 2.5;
                    this.onCircleClick = function (id) {
                        _this.showActions = true;
                        //TODO: replace hardcoded 15 with id
                        _this._begrotingService.getActies(24)
                            .subscribe(function (acties) { return _this.acties = acties; }, function (err) { return _this.errorMessage = err; });
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.8;
                        }
                        else {
                            _this.width = window.innerWidth / 2.5;
                        }
                    };
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                        _this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') + ".png";
                    }, function (err) { return _this.errorMessage = err; });
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.categories = finan; }, function (err) { return _this.errorMessage = err; });
                }
                ExpensesComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                ExpensesComponent.prototype.toggle = function () {
                    this.isVisable = !this.isVisable;
                };
                ExpensesComponent = __decorate([
                    core_1.Component({
                        selector: 'expenses-container',
                        template: "\n        <div class=\"container\">\n        <section class=\"intro col-xs-12\">\n            <h1>De uitgaven van {{mainTown?.naam}}</h1>\n            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n        <div class=\"clearfix\">\n        <div class=\"graph col-xs-12 col-sm-8\" (window:resize)=\"onResize($event)\">\n           <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n           <button type=\"button\" class=\"btn btn-primary comparebtn\" [routerLink]=\"['Comparison']\">Vergelijk 2 gemeentes</button>\n           <button type=\"button\" class=\"btn btn-primary proposebtn\">Doe een voorstel</button>\n           <button type=\"button\" class=\"btn btn-primary salarybtn\" [routerLink]=\"['Taxes']\">Vergelijk met salaris</button>\n           <button type=\"button\" class=\"btn btn-primary propositionsbtn\">Begrotingsvoorstellen</button>\n        </div>\n        <div class=\"legend col-xs-12 col-sm-4 \">\n                <h3>Legende categorie\u00EBn</h3>\n                <ul>\n                    <li *ngFor=\"#categorie of categories\"></li>\n                </ul>\n        </div>\n\n        <div class=\"pointer col-xs-12 \">\n                <h3>Acties</h3>\n                <ul>\n                    <p [ngClass]=\"{hide: showActions}\" class='noData'> U heeft nog geen categorie geselecteerd. </p>\n                    <li *ngFor=\"#actie of acties\">{{actie.actieLang}} - {{actie.bestuurtype}}</li>\n                </ul>\n            </div>\n        </div>\n\n        </section>\n       </div>\n",
                        directives: [townSelector_component_js_1.TownSelectorComponent, editableField_component_js_1.EditableFieldComponent, sunburst_component_js_1.SunburstComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [begrotingService_js_1.BegrotingService,
                            townService_component_js_1.TownService,
                        ],
                        styles: ["\n\n    .icon {\n    max-width: 200px;\n    margin: 10px;\n    }\n\n    .container {\n    max-width: 1200px;\n    }\n\n    .noData {\n    font-size: 1.3em;\n    margin-top: 150px;\n    text-align: center;\n    }\n\n    .comparebtn {\n    position: absolute;\n    top: 20px;\n    left: 0px;\n    }\n\n    .salarybtn {\n    position: absolute;\n    top: 100px;\n    left: 0px;\n    }\n\n    .propositionsbtn {\n    position: absolute;\n    top: 60px;\n    left: 0px;\n    }\n\n    .proposebtn {\n    position: absolute;\n    top: 140px;\n    left: 0;\n    }\n\n    #info-town   {\n    padding: 1%;\n    flex-shrink: 2; \n    -webkit-flex-shrink: 2;\n    }\n\n    .intro {\n    padding: 20px;\n    }\n\n    .clearfix:after {\n    content: \" \";\n   display: block;\n   height: 0;\n   clear: both;\n    }\n\n    .provincie {\n    }\n    .graph {\n    padding: 40px 20px;\n    text-align: center;\n    margin: O auto;\n    position: relative;\n    }\n\n    .pointer p{\n     display: inline-block;\n    }\n\n    .pointer h3 {\n    color:black;\n    }\n\n    .pointer {\n    margin-top: 20px;\n    }\n\n    .pointer ul {\n    overflow: scroll;\n    height: 400px;\n    border: 1px dashed black;\n    padding:20px;\n    }\n\n    .pointer li {\n    padding: 5px;\n    }\n\n    .demographic{\n    text-align: center;\n    }\n\n    .geographic {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1;\n    -webkit-flex-grow: 1;\n    text-align: right;\n    }\n        \n    #actions   {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1; \n    -webkit-flex-grow: 1;\n\n    }\n\n\n    label {\n    display:block;\n    }\n    \n    .showInfo{\n        float: right;\n        background: #3498db;\n         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n         background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n         background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n         background-image: -o-linear-gradient(top, #3498db, #2980b9);\n         background-image: linear-gradient(to bottom, #3498db, #2980b9);\n         width: 55%;\n         color: #ffffff;\n         text-decoration: none;\n         font-size: 0.8em;\n    }\n\n    \n"]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, (typeof (_b = typeof begrotingService_js_1.BegrotingService !== 'undefined' && begrotingService_js_1.BegrotingService) === 'function' && _b) || Object, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], ExpensesComponent);
                return ExpensesComponent;
                var _a, _b;
            }());
            exports_1("ExpensesComponent", ExpensesComponent);
        }
    }
});
//# sourceMappingURL=expenses.component.js.map