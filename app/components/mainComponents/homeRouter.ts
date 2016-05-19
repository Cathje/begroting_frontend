import {Component} from 'angular2/core';

import {NavigationMenuComponent} from './../subComponents/nav/menu.component';

import {HomeComponent} from './home.component';
import {AdminRouter} from './admin/adminRouter';
import {BudgetRouter} from './budget/budgetRouter';
import {ParticipationRouter} from "./participation/participationRouter";
import {SuperAdminRouter} from "./superadmin/superAdminRouter";
import {ModeratorRouter} from "./moderator/moderatorRouter";

import {RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {HTTP_PROVIDERS} from "angular2/http";


@Component({
    selector: 'home-router',
    template: `
    <navigation-menu *ngIf="_location.path() !== ''"></navigation-menu>
    <router-outlet></router-outlet>    `
    ,
    directives: [ROUTER_DIRECTIVES, NavigationMenuComponent],
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
    constructor( private _location:Location ) {}
}