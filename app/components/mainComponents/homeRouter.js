System.register(['angular2/core', './../subComponents/nav/menu.component', './home.component', './settings/SettingsRouter', './budget/budgetRouter', "./participation/participationRouter", 'angular2/router', "../../services/townService.component", "../../directives/styled", "./general/GeneralRouter"], function(exports_1, context_1) {
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
    var core_1, menu_component_1, home_component_1, SettingsRouter_1, budgetRouter_1, participationRouter_1, router_1, townService_component_1, styled_1, GeneralRouter_1;
    var HomeRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (SettingsRouter_1_1) {
                SettingsRouter_1 = SettingsRouter_1_1;
            },
            function (budgetRouter_1_1) {
                budgetRouter_1 = budgetRouter_1_1;
            },
            function (participationRouter_1_1) {
                participationRouter_1 = participationRouter_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            },
            function (GeneralRouter_1_1) {
                GeneralRouter_1 = GeneralRouter_1_1;
            }],
        execute: function() {
            HomeRouter = (function () {
                function HomeRouter(_townService, _routeParams, _location) {
                    var _this = this;
                    this._townService = _townService;
                    this._routeParams = _routeParams;
                    this._location = _location;
                    _townService.getTown(_routeParams.get('town'))
                        .subscribe(function (town) {
                        sessionStorage.setItem("mainColor", town.hoofdkleur);
                        _this.town = town;
                    }, function (err) { return _this.errorMessage = err; });
                }
                HomeRouter = __decorate([
                    core_1.Component({
                        selector: 'home-router',
                        template: "\n    <navigation-menu *ngIf=\"_location.path() !== ''\"></navigation-menu>\n    <router-outlet></router-outlet>\n    <footer styled>\n       <img *ngIf=\"town?.logo\" [src]=\"town.logo\" class=\"smalllogo\">\n       <p>Tree company, De wakkere Burger en uw gemeente {{town?.naam}}</p>\n       <p> <a [routerLink]=\"['General', 'AboutUs']\">Over ons</a> -\n       <a [routerLink]=\"['General', 'Faq']\">FAQ</a> -\n       <a [routerLink]=\"['General', 'Privacy']\">Privacy</a> -\n       </p>\n    </footer>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, menu_component_1.NavigationMenuComponent, styled_1.StyledDirective],
                        providers: [townService_component_1.TownService],
                        styles: ["\n    footer {\n        background-color: #2ac7d2;\n        padding: 10px;\n        text-align: center;\n        border-top: 1px solid white !important;\n    }\n\n    footer p {\n        color: white;\n    }\n\n    .smalllogo {\n        margin: 0 auto;\n        width: 50px;\n    }\n    "]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: '/budget/...', name: 'Budget', component: budgetRouter_1.BudgetRouter },
                        { path: '/settings/...', name: 'Settings', component: SettingsRouter_1.SettingsRouter },
                        { path: '/participation/...', name: 'Participation', component: participationRouter_1.ParticipationRouter },
                        { path: '/general/...', name: 'General', component: GeneralRouter_1.GeneralRouter }
                    ]), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, router_1.RouteParams, router_1.Location])
                ], HomeRouter);
                return HomeRouter;
            }());
            exports_1("HomeRouter", HomeRouter);
        }
    }
});
//# sourceMappingURL=homeRouter.js.map