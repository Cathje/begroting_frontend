import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {AdminComponent} from './admin.component.js';
import {ManageProjectComponent} from './manageProject.component.js';

@Component({
    selector: 'townRouter',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Admin', component:AdminComponent, useAsDefault:true },
    { path: '/manageProject', name: 'ManageProject', component:ManageProjectComponent}

])

export class AdminRouter {
}

