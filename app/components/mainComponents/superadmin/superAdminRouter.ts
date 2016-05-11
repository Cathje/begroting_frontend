import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {CreateAdminComponent} from './createAdmin.component.js';
import {GeneralSettingsComponent} from './generalSettings.component.js';

@Component({
    selector: 'super-admin-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/generalSettings', name: 'GeneralSettings', component:GeneralSettingsComponent, useAsDefault:true },
    { path: '/createAdmin', name: 'CreateAdmin', component:CreateAdminComponent}

])

export class SuperAdminRouter {
}

