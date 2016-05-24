import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {GeneralSettingsComponent} from './generalSettings.component';
import {OverviewUsersComponent} from "./overviewUsers.component";
import {ManageProjectComponent} from "./manageProject.component";

@Component({
    selector: 'super-admin-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/generalSettings', name: 'GeneralSettings', component:GeneralSettingsComponent, useAsDefault:true },
    { path: '/manageUsers', name: 'ManageUsers', component:OverviewUsersComponent},
    { path: '/manageProject', name: 'ManageProject', component:OverviewUsersComponent}

])

export class SuperAdminRouter {
}

