System.register(['angular2/core', '/app/components/subComponents/input/townSelector.component', './../subComponents/nav/menu.component', './home.component', './admin/adminRouter', './budget/budgetRouter', "./participation/participationRouter", "./superadmin/superAdminRouter", "./moderator/moderatorRouter", 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, townSelector_component_1, menu_component_1, home_component_1, adminRouter_1, budgetRouter_1, participationRouter_1, superAdminRouter_1, moderatorRouter_1, router_1;
    var HomeRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (adminRouter_1_1) {
                adminRouter_1 = adminRouter_1_1;
            },
            function (budgetRouter_1_1) {
                budgetRouter_1 = budgetRouter_1_1;
            },
            function (participationRouter_1_1) {
                participationRouter_1 = participationRouter_1_1;
            },
            function (superAdminRouter_1_1) {
                superAdminRouter_1 = superAdminRouter_1_1;
            },
            function (moderatorRouter_1_1) {
                moderatorRouter_1 = moderatorRouter_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HomeRouter = (function () {
                function HomeRouter(_location) {
                    this._location = _location;
                    this.title = 'Home';
                }
                HomeRouter = __decorate([
                    core_1.Component({
                        selector: 'home-router',
                        template: "\n    <navigation-menu [ngClass]=\"{hide: _location.path() === ''}\"></navigation-menu>\n    <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, menu_component_1.NavigationMenuComponent, townSelector_component_1.TownSelectorComponent],
                        styles: ["    .home-menu {\n    padding: 5px;\n    background-color: #2ac7d2;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    sel\n    }"]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: '/:town/budget/...', name: 'Budget', component: budgetRouter_1.BudgetRouter },
                        { path: '/:town/admin/...', name: 'Admin', component: adminRouter_1.AdminRouter },
                        { path: '/:town/moderator/...', name: 'Moderator', component: moderatorRouter_1.ModeratorRouter },
                        { path: '/:town/participation/...', name: 'Participation', component: participationRouter_1.ParticipationRouter },
                        { path: '/:town/superadmin/...', name: 'SuperAdmin', component: superAdminRouter_1.SuperAdminRouter },
                    ]), 
                    __metadata('design:paramtypes', [router_1.Location])
                ], HomeRouter);
                return HomeRouter;
            })();
            exports_1("HomeRouter", HomeRouter);
        }
    }
});
//# sourceMappingURL=homeRouter.js.map