System.register(['angular2/core', './../../../services/townService.component', 'angular2/http', 'angular2/router', './../../subComponents/input/townSelector.component', './../../subComponents/input/editableField.component', "../../../models/mainTown", './../../subComponents/graphs/sunburst.component', "../../../services/begrotingService", "../../../models/politicusType"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, townService_component_1, http_1, router_1, townSelector_component_1, editableField_component_1, mainTown_1, sunburst_component_1, begrotingService_1, politicusType_1;
    var CoreDataComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (editableField_component_1_1) {
                editableField_component_1 = editableField_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            },
            function (politicusType_1_1) {
                politicusType_1 = politicusType_1_1;
            }],
        execute: function() {
            CoreDataComponent = (function () {
                function CoreDataComponent(_townService, _begrotingService, http, params, injector, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
                    this.http = http;
                    this._router = _router;
                    this.title = 'Gemeente - home';
                    this.imglink = "";
                    this.name = "";
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    this.isVisable = false;
                    this.contentbutton = "meer info";
                    this.showActions = false;
                    this.types = politicusType_1.PoliticusType;
                    this.isEditor = false; //TODO: adapt value when signed in with special role
                    this.categories = [{ ID: 24, naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Financiële aangelegenheden", totaal: 22781 },
                        { ID: 24, naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Patrimonium zonder maatschappelijk doel", totaal: 281 },
                        { ID: 24, naamCaty: "Zorg en opvang", naamCatz: "Gezin en kinderen", totaal: 3311 },
                        { ID: 24, naamCaty: "Cultuur en vrije tijd", naamCatz: "Sport", totaal: 906 }];
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 2.5;
                    this.onCircleClick = function (id) {
                        _this.showActions = true;
                        //TODO: replace hardcoded 15 with id
                        _this._begrotingService.getActies(15)
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
                CoreDataComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                CoreDataComponent.prototype.toggle = function () {
                    this.isVisable = !this.isVisable;
                };
                CoreDataComponent = __decorate([
                    core_1.Component({
                        selector: 'core-data-container',
                        template: "\n        <div class=\"container\">\n        <section class=\"intro col-xs-12\">\n            <h1>De kerngegevens van {{mainTown?.naam}}</h1>\n            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n        </section>\n\n        <section class=\"demographic col-xs-12 col-sm-12\">\n        <h2>Demografische gegevens</h2>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                         <img class='icon' src=\"/app/images/icons/population.png\">\n                        <h4>Aantal bewoners</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.aantalBewoners\"></editable-field>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/man.png\">\n                        <h4>Aantal mannen</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.isMan\"></editable-field>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/woman.png\">\n                        <h4>Aantal vrouwen</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.isVrouw\"></editable-field>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/child.png\">\n                        <h4>Aantal kinderen</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.isKind\"></editable-field>\n                    </div>\n        </section>\n\n\n         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->\n        <section id=\"geographic\" class=\"col-xs-12 col-sm-12\">\n        <h2>Geografische gegevens</h2>\n                    <div class='col-xs-6 col-md-6'>\n                      <img src={{imglink}} class=\"provincie\">\n                     </div>\n                     <div class='col-xs-6 col-md-6'>\n                     <h4>Provincie:</h4>\n                     <span>{{mainTown.provincie}}</span>\n\n                     <h4>Oppervlakte:</h4>\n                        <span>{{mainTown.oppervlakte}}{{mainTown.oppervlakteMaat}}</span>\n                    <h4>Deelgemeenten: </h4>\n                        <ul *ngIf=\"mainTown?.deelGemeenten\" >\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n                    <h4>Bestuur: </h4>\n                        <ul *ngIf=\"mainTown?.bestuur\" >\n                            <li *ngFor=\"#b of mainTown.bestuur\"><span>{{b.naam}} - {{types[b.type]}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.bestuur\"><i>Er zijn geen gegevens over het bestuur</i></p>\n                    </div>\n        </section>\n\n       </div>\n",
                        directives: [townSelector_component_1.TownSelectorComponent, editableField_component_1.EditableFieldComponent, sunburst_component_1.SunburstComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [begrotingService_1.BegrotingService,
                            townService_component_1.TownService,
                        ],
                        styles: ["\n\n    .icon {\n    max-width: 200px;\n    margin: 10px;\n    }\n\n    h2 {\n    text-align: left;\n    margin: 20px 0;\n    }\n\n    h3 {\n    margin: 0;\n    padding-bottom: 1%;\n    font-size: 3rem;\n    color: white;\n    }\n\n\n    h4{\n    margin-bottom: 0;\n    }\n\n    .container {\n    max-width: 1200px;\n    }\n\n    .noData {\n    font-size: 1.3em;\n    margin-top: 150px;\n    text-align: center;\n    }\n    .comparebtn {\n    position: absolute;\n    top: 20px;\n    left: 0px;\n    }\n\n    .salarybtn {\n    position: absolute;\n    top: 100px;\n    left: 0px;\n    }\n\n    .propositionsbtn {\n    position: absolute;\n    top: 60px;\n    left: 0px;\n    }\n\n    .proposebtn {\n    position: absolute;\n    top: 140px;\n    left: 0;\n    }\n\n    #info-town   {\n    padding: 1%;\n    flex-shrink: 2; \n    -webkit-flex-shrink: 2;\n    }\n\n    .intro {\n    padding: 20px;\n    }\n\n    .clearfix:after {\n    content: \" \";\n   display: block;\n   height: 0;\n   clear: both;\n    }\n\n    .provincie {\n    }\n    .graph {\n    padding: 40px 20px;\n    text-align: center;\n    margin: O auto;\n    position: relative;\n    }\n\n    .pointer p{\n     display: inline-block;\n    }\n\n    .pointer h3 {\n    color:black;\n    }\n\n    .pointer {\n    margin-top: 20px;\n    }\n\n    .pointer ul {\n    overflow: scroll;\n    height: 400px;\n    border: 1px dashed black;\n    padding:20px;\n    }\n\n    .pointer li {\n    padding: 5px;\n    }\n\n    .demographic{\n    text-align: center;\n    }\n\n    .geographic {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1;\n    -webkit-flex-grow: 1;\n    text-align: right;\n    }\n        \n    #actions   {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1; \n    -webkit-flex-grow: 1;\n\n    }\n\n\n    label {\n    display:block;\n    }\n    \n    .showInfo{\n        float: right;\n        background: #3498db;\n         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n         background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n         background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n         background-image: -o-linear-gradient(top, #3498db, #2980b9);\n         background-image: linear-gradient(to bottom, #3498db, #2980b9);\n         width: 55%;\n         color: #ffffff;\n         text-decoration: none;\n         font-size: 0.8em;\n    }\n\n    \n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, begrotingService_1.BegrotingService, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], CoreDataComponent);
                return CoreDataComponent;
            })();
            exports_1("CoreDataComponent", CoreDataComponent);
        }
    }
});
//# sourceMappingURL=coreData.component.js.map