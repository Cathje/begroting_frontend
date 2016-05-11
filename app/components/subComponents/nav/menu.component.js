System.register(['angular2/core', 'angular2/router', '../input/townSelector.component.js'], function(exports_1, context_1) {
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
    var core_1, router_1, townSelector_component_js_1;
    var NavigationMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            }],
        execute: function() {
            NavigationMenuComponent = (function () {
                function NavigationMenuComponent() {
                    this.townString = "Gent";
                }
                NavigationMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'navigation-menu',
                        template: "\n        <nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" [routerLink]=\"['Home']\">Home</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Begroting<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a [routerLink]=\"['Budget', {town: 'townString'}, 'Overview']\">Begrotingsvoorstel</a></li>\n            <li><a [routerLink]=\"['Budget', {town: 'townString'}, 'Expenses']\">Uitgaven</a></li>\n            <li><a [routerLink]=\"['Budget', {town: 'townString'}, 'Taxes']\">Mijn belastingen</a></li>\n          </ul>\n        </li>\n\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Participeren<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a [routerLink]=\"['Participation', {town: 'townString'}, 'Projects']\">Begrotingsposten</a></li>\n            <li><a [routerLink]=\"['Participation', {town: 'townString'}, 'Propositions']\">Burgervoorstellen</a></li>\n            <li><a [routerLink]=\"['Participation', {town: 'townString'}, 'AddPropositions']\">Voorstel indienen</a></li>\n          </ul>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Admin<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a [routerLink]=\"['Admin', {town: townString}, 'ManageData']\">Beheer kerngegevens</a></li>\n            <li><a [routerLink]=\"['Admin', {town: 'townString'}, 'AddInformation']\">Informatie toevoegen</a></li>\n            <li><a [routerLink]=\"['Admin', {town: 'Gent'}, 'ManageTown']\">Instellingen gemeente</a></li>\n            <li><a [routerLink]=\"['Admin', {town: townString}, 'ManageProject']\">Beheer projecten</a></li>\n          </ul>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">SuperAdmin<span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a [routerLink]=\"['SuperAdmin', {town: 'townString'}, 'GeneralSettings']\">Algemene instellingen</a></li>\n            <li><a [routerLink]=\"['SuperAdmin', {town: 'townString'}, 'CreateAdmin']\">Admin aanmaken</a></li>\n          </ul>\n        </li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><town-selector></town-selector></li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n\n    ",
                        styles: ["\n    .navbar-default {\n    padding: 5px;\n    background-color: #2ac7d2;\n    }\n\n    .navbar-right {\n    padding: 10px 0;\n    }\n\n    .dropdown-menu {\n        background-color: #2ac7d2;\n    }\n\n    .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n            background-color: #2ac7d2;\n    }\n\n    .dropdown-menu > li > a:hover {\n                background-color: #8ec7ca;\n    }\n\n      ",],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_js_1.TownSelectorComponent],
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