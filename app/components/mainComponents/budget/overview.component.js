System.register(['angular2/core', 'angular2/router', './../../subComponents/graphs/sunburst.component', "../../../models/mainTown", './../../../services/townService.component', "../../../services/begrotingService", "../../../services/projectService.component", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, sunburst_component_1, mainTown_1, townService_component_1, begrotingService_1, projectService_component_1, styled_1;
    var OverviewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            },
            function (projectService_component_1_1) {
                projectService_component_1 = projectService_component_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            OverviewComponent = (function () {
                function OverviewComponent(_projectService, _townService, _begrotingService, injector) {
                    var _this = this;
                    this._projectService = _projectService;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
                    this.injector = injector;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    // parameters for extra information widget
                    this.year = 2015;
                    this.information = "Extra informatie over project";
                    // parameters for open projects widget
                    this.projects = null;
                    // parameters for expenses widget
                    this.expenses = [];
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.7 : window.innerWidth / 4;
                    // parameters for income widget
                    this.income = [];
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.7;
                        }
                        else {
                            _this.width = window.innerWidth / 4;
                        }
                    };
                    _townService.getTown(injector.parent.parent.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                        _this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') + ".png";
                    }, function (err) { return _this.errorMessage = "Er is geen stad gevonden."; });
                    _projectService.getProjects(injector.parent.parent.get(router_1.RouteParams).get('town')).subscribe(function (projects) { _this.projects = projects; }, function (err) { return _this.errorMessage = "Er zijn geen projecten gevonden."; });
                    // TODO: change hardcoded year and city with variables : today.getYear() + injector.parent.parent.parent.parent.get(RouteParams).get('town')
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (exp) { return _this.expenses = exp; });
                }
                ;
                OverviewComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-container',
                        template: "\n        <div class=\"overview-container\">\n            <div class=\"container\" (window:resize)=\"onResize($event)\" class=\"col-xs-12\">\n                <div class=\"intro col-xs-12\">\n                <h1>Dashboard {{mainTown?.naam}}</h1>\n                <p>Welkom op het online platform van {{mainTown?.naam}}. Hieronder vind u een overzicht met de belangrijkste informatie over onze gemeente. Klik op een widget van uw keuze om meer informatie te verkrijgen rond een specifiek onderwerp.</p>\n                </div>\n\n            <div class=\"col-xs-12 col-sm-3\">\n            </div>\n            <div class=\"col-xs-12 col-sm-9\">\n            <section class=\"col-xs-12 col-sm-6\">\n                <div class=\"widget-content\">\n                    <h4>Inkomsten per categorie</h4>\n                    <sunburst [data]=income [height]=width [width]=width></sunburst>\n                    <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Income']\" styled>Meer info</button>\n                </div>\n            </section>\n\n            <section class=\"col-xs-12 col-sm-6\">\n                <div class=\"widget-content\" >\n                    <h4>Uitgaves per categorie</h4>\n                    <sunburst [data]=expenses [height]=width [width]=width></sunburst>\n                    <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Expenses']\" styled>Meer info</button>\n                </div>\n            </section>\n\n\n<section class=\"col-xs-12 \">\n            <div class=\"widget-content demographics\">\n                <h4> Kerngegevens</h4>\n                <section class=\"demographic col-xs-12 col-sm-12\">\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                         <img class='icon' src=\"/app/images/icons/population.png\">\n                        <h4>Aantal bewoners</h4>\n                        <p>{{mainTown.aantalBewoners}}</p>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/man.png\">\n                        <h4>Aantal mannen</h4>\n                        <p>{{mainTown.isMan}}</p>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/woman.png\">\n                        <h4>Aantal vrouwen</h4>\n                        <p>{{mainTown.isVrouw}}</p>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/child.png\">\n                        <h4>Aantal kinderen</h4>\n                        <p>{{mainTown.isKind}}</p>\n                    </div>\n        </section>\n            </div>\n        </section>\n\n        <div class=\"col-xs-12 col-sm-6\">\n        <section class=\"col-xs-12 \">\n             <div class=\"widget-content\">\n                <h4> Openstaande projecten</h4>\n                <ul>\n                   <p *ngIf=\"projects === null\" class='noData'> Er zijn geen openstaande projecten.</p>\n                   <li *ngFor=\"#project of projects\">\n                       <button type=\"button\" class=\"btn btn-primary btn-sm\" [routerLink]=\"['/','App', {town: townString}, 'Participation', 'Projects']\" styled>Meer info</button>\n                       {{project.boekjaar}} - {{project.titel}}\n                   </li>\n                   <br>\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12\">\n             <div class=\"widget-content\">\n                <h4> Provincie </h4>\n                <div class='col-xs-12'>\n                      <img src={{imglink}} class=\"provincie\">\n                     </div>\n                                                 <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['CoreData']\" styled>Meer info</button>\n\n            </div>\n\n        </section>\n        </div>\n\n\n        <section class=\"col-xs-12 col-sm-6  pull-right\">\n            <div class=\"widget-content\">\n                <h4>Vergelijk de begroting van 2 gemeentes</h4>\n                <p> Doet jouw gemeente het beter dan een andere gemeente? Vergelijk de begrotingsverdeling door op de knop meer info te klikken en selecteer jouw favoriete gemeentes.</p>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Comparison']\" styled>Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 pull-right\">\n             <div class=\"widget-content taxes\">\n                <h4>Waar gaan mijn belastingen naartoe?</h4>\n                <p>Vul jouw loon in en ontdek hoeveel geld naar de verschillende categorie\u00EBn van de begroting gaat.</p>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['Taxes']\" styled>Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6 pull-right\">\n             <div class=\"widget-content\">\n                <h4>Hoe participeren</h4>\n                <p>Wil je zelf participeren aan de begroting van {{mainTown?.naam}}? Klik op meer info en dien jouw voorstel in.</p>\n                <button type=\"button\" class=\"btn btn-primary pull-right\" [routerLink]=\"['/','App', {town: townString}, 'Participation', 'Projects']\" styled>Meer info</button>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 col-sm-6  pull-right\">\n             <div class=\"widget-content questions\">\n                <h4>Heb je nog vragen?</h4>\n                <p> Zit je nog met vragen. Neem dan een kijkje op onze FAQ pagina of stuur een mailtje naar info@debegroting.be.</p>\n            </div>\n        </section>\n</div>\n       </div>\n    </div>\n           <img src=\"/app/images/backgrounds/girl.png\" class=\"front_fixed\">\n\n",
                        directives: [sunburst_component_1.SunburstComponent, router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective],
                        providers: [projectService_component_1.ProjectService, begrotingService_1.BegrotingService, townService_component_1.TownService],
                        styles: ["\n\n    .overview-container {\n       background-color: #f2f3f8;\n       overflow:auto;\n       padding: 25px;\n\n    }\n\n    .front_fixed {\n        position : fixed;\n         bottom:0;\n         max-width:450px;\n         width: 38%;\n         max-height: 100%;\n         left: -30px;\n          animation-name: move;\n        animation-duration: 5s;\n\n    }\n\n\n    .demographics {\n        background-image: url('/app/images/backgrounds/bg.png');\n        background-size:contain;\n    }\n\n    .taxes {\n        background-color: dimgray !important;\n        color: white;\n        border: none;\n    }\n\n\n    @keyframes move {\n    from {left: -800px;}\n    to {left: -30px;}\n\n    }\n\n\n\n    .questions{\n        background-color: darkcyan !important;\n        color: white;\n        border: none;\n    }\n\n    section {\n        box-sizing: border-box;\n        padding: 20px;\n    }\n\n    .demographic *:not(h2){\n        text-align: center;\n    }\n\n    .widget-content {\n        padding: 20px;\n        background-color: white;\n        box-shadow: 3px 3px 3px lightgray;\n        overflow: auto;\n        border: 10px solid white;\n        background-color: #efefef;\n    }\n\n    li {\n        display: flex;\n        align-items: baseline;\n        justify-content: flex-start;\n    }\n\n    .btn {\n        margin: 20px 0px 0px 10px;\n    }\n\n    .icon {\n        max-width: 200px;\n        margin: 0 auto;\n        display:block;\n    }\n\n     @media screen and (max-width: 768px) {\n\n         .front_fixed {\n        display:none;\n\n    }\n    }\n"]
                    }), 
                    __metadata('design:paramtypes', [projectService_component_1.ProjectService, townService_component_1.TownService, begrotingService_1.BegrotingService, core_1.Injector])
                ], OverviewComponent);
                return OverviewComponent;
            }());
            exports_1("OverviewComponent", OverviewComponent);
        }
    }
});
//# sourceMappingURL=overview.component.js.map