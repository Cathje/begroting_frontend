import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {ManageDataComponent} from './manageData.component.js';
import {ManageProjectComponent} from './manageProject.component.js';
import {ManageTownComponent} from './manageTown.component.js';
import {AddInformationComponent} from "./addInformation.component.js";

@Component({
    selector: 'admin-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/manageData', name: 'ManageData', component:ManageDataComponent, useAsDefault:true },
    { path: '/manageProject', name: 'ManageProject', component:ManageProjectComponent},
    { path: '/manageTown', name: 'ManageTown', component:ManageTownComponent},
    { path: '/addInformation', name: 'AddInformation', component:AddInformationComponent}

])

export class AdminRouter {
}

