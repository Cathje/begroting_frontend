System.register(['angular2/core', 'angular2/router', './overview.component.js', './expenses.component.js', './taxes.component.js'], function(exports_1) {
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
    var core_1, router_1, overview_component_js_1, expenses_component_js_1, taxes_component_js_1;
    var BudgetRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (overview_component_js_1_1) {
                overview_component_js_1 = overview_component_js_1_1;
            },
            function (expenses_component_js_1_1) {
                expenses_component_js_1 = expenses_component_js_1_1;
            },
            function (taxes_component_js_1_1) {
                taxes_component_js_1 = taxes_component_js_1_1;
            }],
        execute: function() {
            BudgetRouter = (function () {
                function BudgetRouter() {
                }
                BudgetRouter = __decorate([
                    core_1.Component({
                        selector: 'budgetRouter',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/overview', name: 'Overview', component: overview_component_js_1.OverviewComponent, useAsDefault: true },
                        { path: '/expenses', name: 'Expenses', component: expenses_component_js_1.ExpensesComponent },
                        { path: '/taxes', name: 'Taxes', component: taxes_component_js_1.TaxesComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], BudgetRouter);
                return BudgetRouter;
            })();
            exports_1("BudgetRouter", BudgetRouter);
        }
    }
});
//# sourceMappingURL=budgetRouter.js.map