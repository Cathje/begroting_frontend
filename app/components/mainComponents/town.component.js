System.register(['angular2/core', './../../services/townService.component', 'angular2/router', './../subComponents/input/townSelector.component', './../subComponents/input/editableField.component', "../../models/mainTown", './../subComponents/graphs/sunburst.component', "../../services/begrotingService", "../../services/ActieService"], function(exports_1, context_1) {
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
    var core_1, townService_component_1, router_1, router_2, townSelector_component_1, editableField_component_1, mainTown_1, sunburst_component_1, begrotingService_1, ActieService_1;
    var TownComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
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
            function (ActieService_1_1) {
                ActieService_1 = ActieService_1_1;
            }],
        execute: function() {
            TownComponent = (function () {
                function TownComponent(_townService, _begrotingService, _actieService, _routeParams) {
                    var _this = this;
                    this._townService = _townService;
                    this._routeParams = _routeParams;
                    this.title = 'Gemeente - home';
                    this.name = "";
                    this.mainTown = new mainTown_1.MainTown("", "", 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    this.isVisable = false;
                    this.contentbutton = "meer info";
                    this.isEditor = false; //TODO: adapt value when signed in with special role
                    this.categories = [{ catCode: "0990", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Financiële aangelegenheden", uitgave: 22781 },
                        { catCode: "0991", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Patrimonium zonder maatschappelijk doel", uitgave: 281 },
                        { catCode: "099", naamCaty: "Zorg en opvang", naamCatz: "Gezin en kinderen", uitgave: 3311 },
                        { catCode: "098", naamCaty: "Cultuur en vrije tijd", naamCatz: "Sport", uitgave: 906 }];
                    this.onClick = function () {
                        alert('hey');
                    };
                    _townService.getTown(_routeParams.get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; });
                    _begrotingService.getFinancieleLijnen(2020, "Gent")
                        .subscribe(function (finan) { return _this.uitgaves = finan; });
                    /* @TODO Catherine, Deze methode gaat dus de acties tonen die bij een bepaalde cat horen. Je kan dit testen door de gemeente Gent te selecteren
                     Dus wss zal deze methode verplaatst moeten worden naar een onClick event in de sunburst.
                     Nu staat er momenteel een catCode hardcoded in.
                     */
                    _actieService.getActies("0905", "Gent")
                        .subscribe(function (acties) { return _this.acties = acties; });
                    this.mainTown.aantalBewoners = 25;
                }
                TownComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                TownComponent.prototype.toggle = function () {
                    this.isVisable = !this.isVisable;
                };
                TownComponent = __decorate([
                    core_1.Component({
                        selector: 'home-container',
                        template: "\n        <nav class=\"home-menu\" >\n                <div class=\"breadcrum\" >\n                    <a [routerLink]=\"['Home']\">Home</a>\n                    <a [routerLink]=\"['TownBudget']\">Begrotingsvoorstel</a>\n                </div>\n                <h3>{{mainTown?.naam}}</h3>\n                <div>\n                    <town-selector></town-selector>\n                </div>\n        </nav>\n        <div class=\"container\">\n        <!-- HIER KOMT DE INTRODUCTIE -->\n        <section class=\"intro col-xs-12 col-sm-4\">\n            <h1> De kerngegevens van {{mainTown?.naam}}</h1>\n            <p> Hieronder vindt u de voornaamste gegevens van uw gemeenLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.te.  </p>\n        </section>\n\n        <!-- HIER KOMT DE GRAPH -->\n        <section class=\"graph col-xs-12 col-sm-8\">\n            <sunburst [data]=categories width=500 height=600 [onClick]=onClick></sunburst>\n\n            <!--@TODO  TEST, NOG TE VERWIJDEREN-->\n             <p *ngFor=\"#town of uitgaves\"> {{town.catCode}} - {{town.naamCatx}} - {{town.naamCaty}} - {{town.naamCatz}} - {{town.uitgave}} </p>\n        </section>\n\n        <!-- HiER KOMEN DE KERNGEGEVENS EN OPENSTAANDE PROJECT(EN) VAN EEN GEMEENTE -->  \n        <section class=\"demographic col-xs-12 col-sm-12\">\n        <h2>Demografische gegevens</h2>\n                    <div class=\"col-xs-6 col-sm-3\">\n                        <img class='icon' src=\"./app/images/icons/population.png\">\n                        <h4>Aantal bewoners</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.aantalBewoners\"></editable-field>\n                    </div>\n                    <div class=\"col-xs-6 col-sm-3\">\n                        <img class='icon' src=\"./app/images/icons/woman.png\">\n                        <h4>Aantal vrouwen</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.isVrouw\"></editable-field>\n                    </div>\n                    <div class=\"col-xs-6 col-sm-3\">\n                        <img class='icon' src=\"./app/images/icons/man.png\">\n                        <h4>Aantal mannen</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.isMan\"></editable-field>\n                    </div>\n                    <div class=\"col-xs-6 col-sm-3\">\n                        <img class='icon' src=\"./app/images/icons/child.png\">\n                        <h4>Aantal kinderen</h4>\n                        <editable-field [isEditable]=\"isEditor\" [data]=\"mainTown.isKind\"></editable-field>\n                    </div>\n        </section>\n\n         \n         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->\n        <section id=\"geographic\" class=\"col-xs-12 col-sm-12\">\n        <h2>Geografische gegevens</h2>\n\n                     <p><strong>Provincie:</strong> <span>{{mainTown.provincie}}</span></p>\n                     <p>\n                        <label for=\"oppervlakte\">Oppervlakte:</label>\n                        <input type=\"number\"  [(ngModel)]=\"mainTown.oppervlakte\"  readonly step=\"any\" />\n                    </p>\n                     <p>\n                        <label for=\"oppervlakteMaat\">Oppervlakte maat:</label>\n                        <input type=\"text\"  [(ngModel)]=\"mainTown.oppervlakteMaat\" size=\"4\" readonly />\n                    </p>\n                    <p><strong>Deelgemeenten: </strong></p>\n                    <div  *ngIf=\"mainTown?.deelGemeenten\" >\n                        <ul>\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                    </div>\n                    <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n                    <button class=\"showInfo\" [hidden]=\"!isVisable\"(click)=\"toggle()\">minder info</button>\n\n       <p> hier komen actions bij klik/hover over een categorie</p>\n       <!--@TODO  TEST, NOG TE VERWIJDEREN-->\n        <p *ngFor=\"#actie of acties\"> {{actie.actieLang}} -  {{actie.actieKort}}</p>\n        </section>\n       </div>\n",
                        directives: [router_2.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent, editableField_component_1.EditableFieldComponent, sunburst_component_1.SunburstComponent],
                        providers: [begrotingService_1.BegrotingService, ActieService_1.ActieService,
                            townService_component_1.TownService,
                        ],
                        styles: ["\n   \n    .home-menu {\n    padding: 5px;\n    background-color: #2ac7d2;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    sel\n    }\n\n    .icon {\n    width: 200px;\n    margin: 10px;\n    float:left;\n    }\n\n    h2 {\n    text-align: left;\n    }\n\n    h3 {\n    margin: 0;\n    padding-bottom: 1%;\n    font-size: 3rem;\n    color: white;\n    }\n\n    h4{\n    margin-bottom: 0;\n    }\n\n    .container {\n    max-width: 1200px;\n    }\n\n    #info-town   {\n    padding: 1%;\n    flex-shrink: 2; \n    -webkit-flex-shrink: 2;\n    }\n\n    .intro {\n    }\n\n    .graph {\n    }\n\n    .demographic{\n    text-align: center;\n    }\n\n    .geographic {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1;\n    -webkit-flex-grow: 1;\n    text-align: right;\n    }\n        \n    #actions   {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1; \n    -webkit-flex-grow: 1;\n\n    }\n\n\n    label {\n    display:block;\n    }\n    \n    .showInfo{\n        float: right;\n        background: #3498db;\n         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n         background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n         background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n         background-image: -o-linear-gradient(top, #3498db, #2980b9);\n         background-image: linear-gradient(to bottom, #3498db, #2980b9);\n         width: 55%;\n         color: #ffffff;\n         text-decoration: none;\n         font-size: 0.8em;\n    }\n    \n    form p, li {\n        font-size: 0.8em;\n    }\n    form fieldset legend, #info-town h5 {\n    \n    font-size: 1.2em;\n    }\n    \n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, begrotingService_1.BegrotingService, ActieService_1.ActieService, router_1.RouteParams])
                ], TownComponent);
                return TownComponent;
            }());
            exports_1("TownComponent", TownComponent);
        }
    }
});
//# sourceMappingURL=town.component.js.map