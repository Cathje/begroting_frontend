import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {OverviewComponent} from './overview.component';
import {ExpensesComponent} from './expenses.component';
import {IncomeComponent} from './income.component';
import {TaxesComponent} from './taxes.component';
import {ComparisonComponent} from "./comparison.component";
import {CoreDataComponent} from "./coreData.component";

@Component({
    selector: 'budget-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/overview', name: 'Overview', component:OverviewComponent, useAsDefault:true },
    { path: '/expenses', name: 'Expenses', component:ExpensesComponent},
    { path: '/income', name: 'Income', component:IncomeComponent},
    { path: '/taxes', name: 'Taxes', component:TaxesComponent},
    { path: '/comparison', name: 'Comparison', component:ComparisonComponent},
    { path: '/coredata', name: 'CoreData', component:CoreDataComponent}
])

export class BudgetRouter {
    constructor(private _routeParams:RouteParams) {
        console.log('param', _routeParams.get('town'));
    }
}

