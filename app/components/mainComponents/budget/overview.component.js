System.register(['angular2/core', 'angular2/router', './../../subComponents/graphs/sunburst.component.js', "../../../models/mainTown.js", './../../../services/townService.component.js', "../../../services/begrotingService.js", "../../../services/projectService.component.js"], function(exports_1, context_1) {
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
    var core_1, router_1, sunburst_component_js_1, mainTown_js_1, townService_component_js_1, begrotingService_js_1, projectService_component_js_1;
    var OverviewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sunburst_component_js_1_1) {
                sunburst_component_js_1 = sunburst_component_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (begrotingService_js_1_1) {
                begrotingService_js_1 = begrotingService_js_1_1;
            },
            function (projectService_component_js_1_1) {
                projectService_component_js_1 = projectService_component_js_1_1;
            }],
        execute: function() {
            OverviewComponent = (function () {
                function OverviewComponent(_projectService, _townService, _begrotingService, injector) {
                    var _this = this;
                    this._projectService = _projectService;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
                    this.injector = injector;
                    //TODO catherine: hide the extra information widget when the role of the user is not admin/superadmin
                    this.mainTown = new mainTown_js_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    // parameters for extra information widget
                    this.year = 2015;
                    this.information = "Extra informatie over project";
                    // parameters for expenses widget
                    this.expenses = [];
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.7 : window.innerWidth / 4;
                    // parameters for income widget
                    this.income = []; //TODO nadya: create a webapi that shows the income categories
                    this.saveExtraInfo = function () {
                        //TODO nadya: send a call to backend for publishing the extra information
                        alert('sending info to backend');
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.7;
                        }
                        else {
                            _this.width = window.innerWidth / 4;
                        }
                    };
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                    });
                    //@TODO nadya: een webapi opzetten om de openstaande projecten op te halen
                    this.projects = _projectService.getProjects();
                    //TODO nadya: webapi aanpassen zodat het ook werkt voor andere jaren en steden --> Deze werkt met andere gemeenten en jaren. Je moet de hardcoded data wijzigen door variabelen
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.expenses = finan; });
                }
                OverviewComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                OverviewComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-container',
                        template: "\n        <div class=\"overview-container\">\n        <div class=\"container\" (window:resize)=\"onResize($event)\">\n        <div class=\"intro col-xs-12\">\n            <h1>Dashboard {{mainTown?.naam}}</h1>\n            <p>Welkom op het online platform van {{mainTown?.naam}}. Hieronder vind u een overzicht met de belangrijkste informatie over de gemeente {{mainTown?.naam}}. Klik op een widget van uw keuze om meer informatie te verkrijgen rond een specifiek onderwerp.</p>\n        </div>\n\n         <section class=\"col-xs-12 col-sm-6 col-md-6\">\n            <div class=\"widget-content\">\n                <h4>Inkomsten per categorie</h4>\n                <sunburst [data]=income [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Income']\">Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 col-md-6\">\n            <div class=\"widget-content\" >\n                <h4>Uitgaves per categorie</h4>\n                <sunburst [data]=expenses [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Expenses']\">Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6\">\n             <div class=\"widget-content\">\n                <h4> Openstaande projecten</h4>\n                <ul>\n                    <p [ngClass]=\"{hide: projects.length >= 1}\" class='noData'> Er zijn geen openstaande projecten.</p>\n                    <li *ngFor=\"#project of projects\"><button type=\"button\" class=\"btn btn-primary btn-sm\" [routerLink]=\"['/','App', 'Participation', {town: townString}, 'Projects']\">Meer info</button>\n{{project.boekjaar}} - {{project.titel}}\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 col-md-6\">\n            <div class=\"widget-content\">\n                <h4> Extra informatie over projecten </h4>\n\n                <p> Voeg hieronder extra informatie toe over toekomstige projecten en/of projecten uit het verleden </p>\n                <div class=\"col-xs-12 input-group\">\n                     <label>Jaar:</label>\n                     <input  type=\"number\" [(ngModel)]=\"year\"/>\n               </div>\n\n                <div class=\"col-xs-12 input-group\">\n                    <label>Informatie:</label>\n                    <textarea rows=\"2\" [(ngModel)]=\"information\"></textarea>\n                </div>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"saveExtraInfo()\">Verzenden</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 col-md-3 pull-right\">\n            <div class=\"widget-content\">\n                <h4> Kerngegevens</h4>\n                <img class='icon' src=\"/app/images/icons/population.png\">\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['CoreData']\">Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 col-md-3 pull-right\">\n            <div class=\"widget-content\">\n                <h4>Vergelijk de begroting van 2 gemeentes</h4>\n                <p> Doet jouw gemeente het beter dan een andere gemeente? Vergelijk de begrotingsverdeling door op de knop meer info te klikken en selecteer jouw favoriete gemeentes.</p>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Comparison']\">Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 col-md-3\">\n             <div class=\"widget-content\">\n                <h4>Waar gaan mijn belastingen naartoe?</h4>\n                <p>Vul jouw loon in en ontdek hoeveel geld naar de verschillende categorie\u00EBn van de begroting gaat.</p>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Taxes']\">Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 col-md-3 pull-right\">\n             <div class=\"widget-content\">\n                <h4>Hoe participeren</h4>\n                <p>Wil je zelf participeren aan de begroting van {{mainTown?.naam}}? Klik op meer info en dien jouw voorstel in.</p>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['/','App', 'Participation', {town: townString}, 'Projects']\">Meer info</button>\n            </div>\n        </section>\n\n       </div>\n       </div>\n",
                        directives: [sunburst_component_js_1.SunburstComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [projectService_component_js_1.ProjectService, begrotingService_js_1.BegrotingService, townService_component_js_1.TownService],
                        styles: ["\n\n    .overview-container {\n       background-color: #f2f3f8;\n    }\n\n    section {\n        box-sizing: border-box;\n        padding: 20px;\n    }\n\n    .widget-content {\n        padding: 20px;\n        background-color: white;\n        box-shadow: 3px 3px 3px lightgray;\n        overflow: auto;\n    }\n\n    .widget-content div input {\n    }\n\n    .btn {\n        margin-top: 15px;\n    }\n\n    li {\n        display: flex;\n        align-items: baseline;\n        justify-content: flex-start;\n    }\n\n    li .btn {\n        margin: 10px 20px 10px 0px;\n    }\n\n    .icon {\n        max-width: 200px;\n        margin: 0 auto;\n        display:block;\n    }\n"]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof projectService_component_js_1.ProjectService !== 'undefined' && projectService_component_js_1.ProjectService) === 'function' && _a) || Object, (typeof (_b = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _b) || Object, (typeof (_c = typeof begrotingService_js_1.BegrotingService !== 'undefined' && begrotingService_js_1.BegrotingService) === 'function' && _c) || Object, core_1.Injector])
                ], OverviewComponent);
                return OverviewComponent;
                var _a, _b, _c;
            }());
            exports_1("OverviewComponent", OverviewComponent);
        }
    }
});
//# sourceMappingURL=overview.component.js.map