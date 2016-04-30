System.register(['angular2/core', './../../services/townService.component', 'angular2/router', './../subComponents/input/townSelector.component', "../../models/mainTown", "../../services/begrotingService", "../../services/ActieService"], function(exports_1, context_1) {
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
    var core_1, townService_component_1, router_1, router_2, townSelector_component_1, mainTown_1, begrotingService_1, ActieService_1;
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
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
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
                    this.id = +this._routeParams.get('id');
                    _townService.getTown(this.id)
                        .subscribe(function (town) { return _this.mainTown = town; });
                    _begrotingService.getFinancieleLijnen(2020, 571)
                        .subscribe(function (finan) { return _this.uitgaves = finan; });
                    /* @TODO Catherine, Deze methode gaat dus de acties tonen die bij een bepaalde cat horen. Je kan dit testen door de gemeente Gent te selecteren
                         Dus wss zal deze methode verplaatst moeten worden naar een onClick event in de sunburst.
                         Nu staat er momenteel een catCode hardcoded in.
                     */
                    _actieService.getActies("0905", this.id)
                        .subscribe(function (acties) { return _this.acties = acties; });
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
                        template: "\n        <nav class=\"home-menu\" >\n                <div class=\"breadcrum\" >\n                <a [routerLink]=\"['Home']\">Home</a>\n                <a [routerLink]=\"['TownBudget']\">Begrotingsvoorstel</a>\n                </div>\n                <h3>{{mainTown?.naam}}</h3>\n                <town-selector></town-selector>              \n        </nav>\n        <!-- <h3>{{name}}</h3> --> \n        \n        <div class=\"container\">\n        \n        <!-- HiER KOMEN DE KERNGEGEVENS EN OPENSTAANDE PROJECT(EN) VAN EEN GEMEENTE -->  \n        <aside id=\"info-town\"> \n        <h5>Kern gegevens</h5>\n           <form>\n                 <fieldset>   \n                    <p>\n                        <label for=\"postCode\">Postcode:</label>\n                        <input type=\"text\"  [(ngModel)]=\"mainTown.postCode\" maxlength=\"4\" size=\"4\"/>\n                    </p>\n                    <button class=\"showInfo\" [hidden]=\"isVisable\" (click)=\"toggle()\">meer info</button>\n            </fieldset>\n            <fieldset [style.display]=\"isVisable?'inherit':'none'\">\n               <legend>Demografische gegevens</legend>\n                    <p>\n                        <label for=\"aantalBewoners\">Aantal bewoners:</label>\n                        <input type=\"number\"  [(ngModel)]=\"mainTown.aantalBewoners\" step=\"any\"/>\n                    </p>\n                     <p>\n                        <label for=\"isVrouw\">Aantal vrouwen:</label>\n                        <input type=\"number\"  [(ngModel)]=\"mainTown.isVrouw\" step=\"any\"/>\n                    </p>\n                     <p>\n                        <label for=\"isMan\">Aantal mannen:</label>\n                        <input type=\"number\"  [(ngModel)]=\"mainTown.isMan\" step=\"any\" />\n                    </p>\n                     <p>\n                        <label for=\"isChild\">Aantal kinderen:</label>\n                        <input type=\"number\"  [(ngModel)]=\"mainTown.isKind\" step=\"any\"/>\n                    </p>\n            </fieldset><br>\n            <fieldset [style.display]=\"isVisable?'inherit':'none'\">\n                <legend>Geografische gegevens</legend>\n                \n                     <p><strong>Provincie:</strong> <span>{{mainTown.provincie}}</span></p>\n                     <p>\n                        <label for=\"oppervlakte\">Oppervlakte:</label>\n                        <input type=\"number\"  [(ngModel)]=\"mainTown.oppervlakte\"  readonly step=\"any\" /> \n                    </p>\n                     <p>\n                        <label for=\"oppervlakteMaat\">Oppervlakte maat:</label>\n                        <input type=\"text\"  [(ngModel)]=\"mainTown.oppervlakteMaat\" size=\"4\" readonly /> \n                    </p>\n                    <p><strong>Deelgemeenten: </strong></p>\n                    <div  *ngIf=\"mainTown?.deelGemeenten\" >\n                        <ul>\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li> \n                        </ul>\n                    </div>\n                    <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n                    <button class=\"showInfo\" [hidden]=\"!isVisable\"(click)=\"toggle()\">minder info</button>\n            </fieldset>\n           </form>\n        </aside>\n         \n        <!-- HIER KOMT DE GRAPH -->\n        <section id=\"content-town\">\n            <p>hier komt graph</p>\n            \n            <!--@TODO  TEST, NOG TE VERWIJDEREN-->\n             <p *ngFor=\"#town of uitgaves\"> {{town.catCode}} - {{town.naamCatx}} - {{town.naamCaty}} - {{town.naamCatz}} - {{town.uitgave}} </p>\n        </section>     \n         \n         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->\n        <aside id=\"actions\">\n        \n        <!--@TODO  TEST, NOG TE VERWIJDEREN-->\n       <p *ngFor=\"#actie of acties\"> {{actie.actieLang}} -  {{actie.actieKort}}</p>\n        </aside>\n       </div>\n",
                        directives: [router_2.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent],
                        providers: [begrotingService_1.BegrotingService, ActieService_1.ActieService,
                            townService_component_1.TownService,
                        ],
                        styles: ["\n   \n    .home-menu {\n    padding: 1% 2% 0 2%; \n    background-color: #2ac7d2;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    }\n\n    h3 {\n    margin: 0;\n    padding-bottom: 1%;\n    font-size: 3rem;\n    }\n    \n    .container {\n    width: inherit;\n    padding: 1%;\n    display: flex;\n    flex-direction: row;\n    align-items: flex-start;\n    }\n    #info-town   {\n    padding: 1%;\n    flex-shrink: 2; \n    -webkit-flex-shrink: 2;\n    border-right: #3498db solid 1px;    \n    }\n    \n    #content-town {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 3;\n    -webkit-flex-grow: 3;\n    border: black solid 2px;  <!-- @TODO: LATER TE VERWIJDEREN -->\n    }\n    \n        \n    #actions   {\n    padding: 1%;\n    margin-left: 1%;\n    flex: 1; \n    -webkit-flex-grow: 1;\n    border: black solid 2px;  <!-- @TODO: LATER TE VERWIJDEREN -->\n    }\n    input[type=\"number\"] \n    {\n        width: 15%;\n    }\n    input, span{\n    background-color: transparent;\n    border: 0 solid;\n    color: #a3a3a3;\n    font-size: 1em;\n    }\n    \n    .showInfo{\n        float: right;\n        background: #3498db;\n         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n         background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n         background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n         background-image: -o-linear-gradient(top, #3498db, #2980b9);\n         background-image: linear-gradient(to bottom, #3498db, #2980b9);\n         width: 55%;\n         color: #ffffff;\n         text-decoration: none;\n         font-size: 0.8em;\n    }\n    \n    form p, li {\n        font-size: 0.8em;\n    }\n    form fieldset legend, #info-town h5 {\n    \n    font-size: 1.2em;\n    }\n    \n"]
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