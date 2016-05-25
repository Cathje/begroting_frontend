System.register(['angular2/core', 'angular2/router', '../input/townSelector.component', '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, townSelector_component_1, styled_1;
    var NavigationMenuComponent;
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
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            NavigationMenuComponent = (function () {
                function NavigationMenuComponent() {
                    this.townString = "Gent";
                }
                NavigationMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'navigation-menu',
                        template: "\n        <nav class=\"navbar navbar-default\" styled>\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" [routerLink]=\"['/','Default']\"><span class=\"glyphicon glyphicon-home\"></span></a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\" styled>\n        <li class=\"dropdown\" styled>\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" styled>Begroting<span class=\"caret\" ></span></a>\n          <ul class=\"dropdown-menu\" styled>\n            <li><a [routerLink]=\"['Budget', 'Overview']\">Dashboard</a></li>\n            <li><a [routerLink]=\"['Budget', 'Income']\">Inkomsten</a></li>\n            <li><a [routerLink]=\"['Budget',  'Expenses']\">Uitgaven</a></li>\n            <li><a [routerLink]=\"['Budget', 'CoreData']\">Kerngegevens</a></li>\n            <li><a [routerLink]=\"['Budget', 'Taxes']\">Mijn belastingen</a></li>\n          </ul>\n        </li>\n\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" styled>Participeren<span class=\"caret\" ></span></a>\n          <ul class=\"dropdown-menu\" styled>\n            <li><a [routerLink]=\"['Participation', 'Projects']\">Begrotingsposten</a></li>\n            <li><a [routerLink]=\"['Participation', 'Propositions']\">Burgervoorstellen</a></li>\n            <li><a [routerLink]=\"['Participation', 'AddPropositions']\">Voorstel indienen</a></li>\n          </ul>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" styled>Settings<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\" styled>\n            <li><a [routerLink]=\"['Settings', 'GeneralSettings']\">Algemene instellingen</a></li>\n            <li><a [routerLink]=\"['Settings', 'ManageTown']\">Instellingen gemeente</a></li>\n            <li><a [routerLink]=\"['Settings', 'ManageCategories']\">Instellingen categorie\u00EBn</a></li>\n            <li><a [routerLink]=\"['Settings', 'ManageUsers']\">Beheer gebruikers</a></li>\n            <li><a [routerLink]=\"['Settings',   'ManageData']\">Beheer kerngegevens</a></li>\n            <li><a [routerLink]=\"['Settings', 'ManageProject']\">Beheer projecten</a></li>\n            <li><a [routerLink]=\"['Settings', 'OverviewPropositions']\">Beheer voorstellen</a></li>\n          </ul>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" styled>Algemeen<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\" styled>\n            <li><a [routerLink]=\"['General', 'UserSettings']\">Account settings</a></li>\n            <li><a [routerLink]=\"['General', 'Faq']\">FAQ</a></li>\n            <li><a [routerLink]=\"['General', 'AboutUs']\">Over ons</a></li>\n          </ul>\n        </li>\n\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><town-selector></town-selector></li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n\n    ",
                        styles: ["\n    .navbar {\n        margin-bottom: 0;\n        border: none;\n    }\n\n    .navbar-default {\n    padding: 5px;\n    background-color: #2ac7d2;\n    }\n\n    .navbar-right {\n    padding: 10px 0;\n    }\n\n    .navbar-default .navbar-toggle .icon-bar{\n    background-color:white;\n    }\n\n    .dropdown-menu {\n        background-color: #2ac7d2;\n    }\n\n    .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n            background-color: #2ac7d2;\n    }\n\n    .dropdown-menu > li > a:hover {\n                opacity: 0.9;\n    }\n\n      ",],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent, styled_1.StyledDirective],
                    }), 
                    __metadata('design:paramtypes', [])
                ], NavigationMenuComponent);
                return NavigationMenuComponent;
            }());
            exports_1("NavigationMenuComponent", NavigationMenuComponent);
        }
    }
});
//# sourceMappingURL=menu.component.js.map