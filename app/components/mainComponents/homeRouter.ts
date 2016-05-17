import {Component} from 'angular2/core';

import {TownSelectorComponent} from '/app/components/subComponents/input/townSelector.component.js'
import {NavigationMenuComponent} from './../subComponents/nav/menu.component.js';

import {HomeComponent} from './home.component.js';
import {AdminRouter} from './admin/adminRouter.js';
import {BudgetRouter} from './budget/budgetRouter.js';
import {ParticipationRouter} from "./participation/participationRouter.js";
import {SuperAdminRouter} from "./superadmin/superAdminRouter.js";
import {ModeratorRouter} from "./moderator/moderatorRouter.js";

import {RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";


@Component({ //invoke with metadata object
    selector: 'home-router',
    template: `
    <navigation-menu [ngClass]="{hide: _location.path() === ''}"></navigation-menu>
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
    { path: '/:town/moderator/...', name: 'Moderator', component:ModeratorRouter },
    { path: '/:town/participation/...', name: 'Participation', component:ParticipationRouter },
    { path: '/:town/superadmin/...', name: 'SuperAdmin', component:SuperAdminRouter },

])

export class HomeRouter {
    title = 'Home';
    constructor( private _location:Location )
    {
    }
}