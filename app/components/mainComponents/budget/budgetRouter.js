System.register(['angular2/core', 'angular2/router', './overview.component.js', './expenses.component.js', './taxes.component.js', "./comparison.component.js", "./coreData.component.js"], function(exports_1, context_1) {
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
    var core_1, router_1, overview_component_js_1, expenses_component_js_1, taxes_component_js_1, comparison_component_js_1, coreData_component_js_1;
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
            },
            function (comparison_component_js_1_1) {
                comparison_component_js_1 = comparison_component_js_1_1;
            },
            function (coreData_component_js_1_1) {
                coreData_component_js_1 = coreData_component_js_1_1;
            }],
        execute: function() {
            BudgetRouter = (function () {
                function BudgetRouter(_routeParams) {
                    this._routeParams = _routeParams;
                    console.log('param', _routeParams.get('town'));
                }
                BudgetRouter = __decorate([
                    core_1.Component({
                        selector: 'budget-router',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/overview', name: 'Overview', component: overview_component_js_1.OverviewComponent, useAsDefault: true },
                        { path: '/expenses', name: 'Expenses', component: expenses_component_js_1.ExpensesComponent },
                        { path: '/taxes', name: 'Taxes', component: taxes_component_js_1.TaxesComponent },
                        { path: '/comparison', name: 'Comparison', component: comparison_component_js_1.ComparisonComponent },
                        { path: '/coredata', name: 'CoreData', component: coreData_component_js_1.CoreDataComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], BudgetRouter);
                return BudgetRouter;
            }());
            exports_1("BudgetRouter", BudgetRouter);
        }
    }
});
//# sourceMappingURL=budgetRouter.js.map