System.register(['angular2/core', 'angular2/http', 'angular2/router', './../../subComponents/graphs/sunburst.component', "../../../services/begrotingService", "../../../defaults/categories", "../../../models/bestuurType", './../../subComponents/input/selector.component', '../../../directives/styled'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, sunburst_component_1, begrotingService_1, categories_1, bestuurType_1, selector_component_1, styled_1;
    var ExpensesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            },
            function (categories_1_1) {
                categories_1 = categories_1_1;
            },
            function (bestuurType_1_1) {
                bestuurType_1 = bestuurType_1_1;
            },
            function (selector_component_1_1) {
                selector_component_1 = selector_component_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            ExpensesComponent = (function () {
                function ExpensesComponent(elementRef, _begrotingService, http, params, injector, _router) {
                    var _this = this;
                    this.elementRef = elementRef;
                    this._begrotingService = _begrotingService;
                    this.http = http;
                    this._router = _router;
                    this.data = [];
                    this.headCategories = categories_1.CATEGORIES;
                    this.types = bestuurType_1.BestuurType;
                    this.windowWidth = window.innerWidth;
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 2.5;
                    this.onCircleClick = function (id) {
                        //TODO: replace hardcoded id with parameter
                        _this._begrotingService.getActies(24)
                            .subscribe(function (acties) { return _this.acties = acties; }, function (err) { return _this.errorMessage = "Er zijn geen acties gevonden."; });
                    };
                    this.onHover = function (d) {
                        _this.hoveredCategory = d;
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.8;
                        }
                        else {
                            _this.width = window.innerWidth / 2.5;
                        }
                        _this.windowWidth = window.innerWidth;
                    };
                    this.onSelectYear = function (event, town) {
                        _this._begrotingService.getGemeenteCategorieen(event.target.value, town)
                            .subscribe(function (finan) { return _this.data = finan; }, function (err) { return _this.errorMessage = "Er zijn geen grafiekgegevens gevonden."; });
                    };
                    this._getYears = function () {
                        var currentYear = new Date().getFullYear();
                        var years = [];
                        for (var i = 0; i < 5; i++) {
                            years.push(currentYear + i);
                        }
                        return years;
                    };
                    this.checkIconAvailable = function (defaultIcon, categorieNaam) {
                        var filteredData = _this.data.filter(function (obj) {
                            if (obj['naamCat'] === categorieNaam) {
                                return true;
                            }
                            return false;
                        });
                        return filteredData[0] ? filteredData[0]['icoon'] : defaultIcon;
                    };
                    this.town = injector.parent.parent.parent.parent.get(router_1.RouteParams).get('town');
                    this.years = this._getYears();
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.data = finan; }, function (err) { return _this.errorMessage = "Er zijn geen grafiekgegevens gevonden."; });
                }
                ExpensesComponent = __decorate([
                    core_1.Component({
                        selector: 'expenses-container',
                        template: "\n        <div class=\"container\">\n\n        <p *ngIf=\"errorMessage\" class=\"alert alert-danger\">{{errorMessage}}</p>\n\n        <section class=\"intro col-xs-12\">\n            <h1>De uitgaven van {{town}}</h1>\n            <p>Bekijk hieronder de uitgaves van de gemeente {{town}}. Klik op een categorie naar keuze om de specifieke acties te bekijken of beweeg met je muis over een categorie in de legende om meer informatie te verkrijgen over de desbetreffende categorie.</p>\n\n\n        <div class=\"main-content\">\n            <div class=\"graph col-xs-12 col-sm-8\" (window:resize)=\"onResize($event)\">\n                <sunburst [data]=data [onClick]=onCircleClick [onHover]=onHover [height]=width [width]=width></sunburst>\n                <div class=\"button-menu\">\n                    <selector defaultOption=\"Kies een jaar\" [options]=\"years\" (change)=\"onSelectYear($event, town)\"></selector>\n                    <div class=\"btn-group\">\n                      <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" styled>\n                        <span class=\"glyphicon glyphicon-plus\"></span>\n                      </button>\n                      <div class=\"dropdown-menu\">\n                        <a class=\"dropdown-item\" [routerLink]=\"['Comparison']\">Vergelijk 2 gemeentes</a>\n                        <a class=\"dropdown-item\" [routerLink]=\"['/', 'App',  {town: town}, 'Participation', 'AddPropositions']\">Doe een voorstel</a>\n                        <a class=\"dropdown-item\" [routerLink]=\"['Taxes']\">Vergelijk met salaris</a>\n                        <a class=\"dropdown-item\" [routerLink]=\"['/', 'App', {town: town}, 'Participation', 'Projects']\">Begrotingsvoorstellen</a>\n                      </div>\n                    </div>\n                </div>\n            </div>\n\n            <div *ngIf=\"!hoveredCategory\" class=\"legend col-xs-12 col-sm-4 \">\n                <ul>\n                    <li *ngFor=\"#category of headCategories\">\n                        <span class=\"{{' colorblock glyphicon '+ checkIconAvailable(category.icoon, category.name)}}\" style=\"background-color: {{category.kleur}};\"></span>\n                        {{category.naam}}\n                    </li>\n                </ul>\n            </div>\n\n             <div class=\"legend col-xs-12 col-sm-4 \" *ngIf=\"hoveredCategory\">\n                        <h4>{{hoveredCategory.name}}</h4>\n                        <img *ngIf=\"hoveredCategory.foto !== null\" [src]=\"headCategories[7].foto\"/>\n                        <h5> Beschrijving</h5>\n                        {{hoveredCategory.input}}\n                        <span *ngIf=\"!hoveredCategory.input\"> Er is geen beschrijving beschikbaar voor deze categorie.</span>\n                        <h5 *ngIf=\"hoveredCategory.film\"> Bekijk de video</h5>\n                        <iframe *ngIf=\"hoveredCategory.film\" width=\"100%\" [src]=\"hoveredCategory.film+'?rel=0&autoplay=1'\" frameborder=\"0\" allowfullscreen></iframe>\n             </div>\n\n        </div>\n\n\n        <!-- Modal Actions-->\n        <div class=\"modal bottom fade\" id=\"actions\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"actions\">\n\t\t    <div class=\"modal-dialog\" role=\"document\">\n\t\t\t    <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n\t\t\t\t\t    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t\t\t\t    <h4 class=\"modal-title\" id=\"actions\">Acties</h4>\n\t\t\t\t    </div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t <table class=\"table table-striped\">\n                        <tbody>\n                            <tr *ngFor=\"#actie of acties\">\n                                <td>{{actie.actieLang}}</td>\n                                <td>\n                                    <span class=\"glyphicon glyphicon-user\"></span>\n                                    <span>{{types[3]}}</span>\n                                </td>\n                            </tr>\n                        </tbody>\n                      </table>\n\t\t\t\t</div>\n\t\t\t</div><!-- modal-content -->\n\t\t</div><!-- modal-dialog -->\n\t</div><!-- modal -->\n\n\n",
                        directives: [sunburst_component_1.SunburstComponent, router_1.ROUTER_DIRECTIVES, selector_component_1.SelectorComponent, styled_1.StyledDirective],
                        providers: [begrotingService_1.BegrotingService],
                        styles: ["\n    li {\n        list-style: none;\n        display: flex;\n        align-items: center;\n\n    }\n\n    li .glyphicon {\n        font-size: 0.8em;\n        color: white;\n    }\n\n    .glyphicon-info-sign{\n        position: absolute;\n        top: 10px;\n        right: 10px;\n        font-size: 1.5em;\n    }\n\n    .colorblock {\n        margin: 5px;\n        padding: 8px;\n        border-radius: 5px;\n    }\n\n    .button-menu {\n        display:flex;\n        align-items: center;\n        justify-content: center;\n        width: 100%;\n    }\n\n    .dropdown-menu{\n        padding: 0;\n    }\n\n    .dropdown-menu a{\n        color:black !important;\n        padding:5px;\n        display:block;\n        border: 1px solid lightgray;\n    }\n\n    .legend {\n        border: 1px solid lightgray;\n        padding: 10px;\n        max-width: 300px;\n    }\n\n    .legend img {\n        border: 3px solid white;\n        box-shadow: 2px 2px 2px lightgray;\n    }\n\n    .main-content {\n        padding-top: 10px;\n\n    }\n\n    .panel-heading {\n        background-color: gray;\n    }\n\n    .panel-collapse {\n        padding: 10px;\n    }\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, begrotingService_1.BegrotingService, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], ExpensesComponent);
                return ExpensesComponent;
            })();
            exports_1("ExpensesComponent", ExpensesComponent);
        }
    }
});
//# sourceMappingURL=expenses.component.js.map