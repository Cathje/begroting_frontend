import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {OverviewUsersComponent} from './overviewUsers.component.js';
import {OverviewPropositionsComponent} from "./overviewPropositions.component.js";

@Component({
    selector: 'moderator-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/overviewUsers', name: 'OverviewUsers', component:OverviewUsersComponent},
    { path: '/overviewPropositions', name: 'OverviewPropositions', component:OverviewPropositionsComponent}

])

export class ModeratorRouter {
}

