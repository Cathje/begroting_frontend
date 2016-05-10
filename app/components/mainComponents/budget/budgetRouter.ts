import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {OverviewComponent} from './overview.component.js';
import {ExpensesComponent} from './expenses.component.js';
import {TaxesComponent} from './taxes.component.js';

@Component({
    selector: 'budgetRouter',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/overview', name: 'Overview', component:OverviewComponent, useAsDefault:true },
    { path: '/expenses', name: 'Expenses', component:ExpensesComponent},
    { path: '/taxes', name: 'Taxes', component:TaxesComponent}
])

export class BudgetRouter {
}

