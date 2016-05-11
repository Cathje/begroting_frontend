import {Component} from 'angular2/core';
import {NavigationMenuComponent} from './../subComponents/nav/menu.component';
import {TownSelectorComponent} from "../subComponents/input/townSelector.component";
import {HomeComponent} from './home.component';
import {AdminRouter} from './admin/adminRouter';
import {BudgetRouter} from './budget/budgetRouter';

import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";


@Component({ //invoke with metadata object
    selector: 'home-router',
    template: `
    <navigation-menu></navigation-menu>
    <router-outlet></router-outlet>
    `
    ,
    directives: [ROUTER_DIRECTIVES, NavigationMenuComponent, TownSelectorComponent],
    styles: [`    .home-menu {
    padding: 5px;
    background-color: #2ac7d2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    sel
    }`]
})

@RouteConfig([
    { path: '/', name: 'Home', component:HomeComponent, useAsDefault:true },
    { path: '/:town/budget/...', name: 'Budget', component:BudgetRouter},
    { path: '/:town/admin/...', name: 'Admin', component:AdminRouter },
])

export class HomeRouter {
    title = 'Home';
}