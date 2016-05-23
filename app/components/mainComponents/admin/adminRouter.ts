import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {ManageDataComponent} from './manageData.component';
import {ManageProjectComponent} from './manageProject.component';
import {ManageTownComponent} from './manageTown.component';
import {OverviewUsersComponent} from "./overviewUsers.component";

@Component({
    selector: 'admin-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/manageData', name: 'ManageData', component:ManageDataComponent, useAsDefault:true },
    { path: '/manageProject', name: 'ManageProject', component:ManageProjectComponent},
    { path: '/manageTown', name: 'ManageTown', component:ManageTownComponent},
    { path: '/manageUsers', name: 'ManageUsers', component:OverviewUsersComponent}

])

export class AdminRouter {
}

