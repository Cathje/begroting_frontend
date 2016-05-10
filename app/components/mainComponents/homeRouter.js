System.register(['angular2/core', '/app/components/subComponents/input/townSelector.component.js', './../subComponents/nav/menu.component.js', './home.component.js', './admin/adminRouter.js', './budget/budgetRouter.js', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, townSelector_component_js_1, menu_component_js_1, home_component_js_1, adminRouter_js_1, budgetRouter_js_1, router_1;
    var HomeRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            },
            function (menu_component_js_1_1) {
                menu_component_js_1 = menu_component_js_1_1;
            },
            function (home_component_js_1_1) {
                home_component_js_1 = home_component_js_1_1;
            },
            function (adminRouter_js_1_1) {
                adminRouter_js_1 = adminRouter_js_1_1;
            },
            function (budgetRouter_js_1_1) {
                budgetRouter_js_1 = budgetRouter_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HomeRouter = (function () {
                function HomeRouter() {
                    this.title = 'Home';
                }
                HomeRouter = __decorate([
                    core_1.Component({
                        selector: 'home-router',
                        template: "\n    <navigation-menu></navigation-menu>\n    <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, menu_component_js_1.NavigationMenuComponent, townSelector_component_js_1.TownSelectorComponent],
                        styles: ["    .home-menu {\n    padding: 5px;\n    background-color: #2ac7d2;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    sel\n    }"]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_component_js_1.HomeComponent, useAsDefault: true },
                        { path: '/:town/budget/...', name: 'Budget', component: budgetRouter_js_1.BudgetRouter },
                        { path: '/:town/admin/...', name: 'Admin', component: adminRouter_js_1.AdminRouter },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], HomeRouter);
                return HomeRouter;
            })();
            exports_1("HomeRouter", HomeRouter);
        }
    }
});
//# sourceMappingURL=homeRouter.js.map