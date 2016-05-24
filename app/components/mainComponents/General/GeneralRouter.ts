import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {UserSettingsComponent} from './userSettings.component';
import {FaqComponent} from './faq.component';
import {AboutUsComponent} from "./aboutUs.component";
import {PrivacyComponent} from "./privacy.component";

@Component({
    selector: 'faq-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/faq', name: 'Faq', component:FaqComponent, useAsDefault:true },
    { path: '/userSettings', name: 'UserSettings', component:UserSettingsComponent},
    { path: '/aboutUs', name: 'AboutUs', component:AboutUsComponent},
    { path: '/privacy', name: 'Privacy', component:PrivacyComponent}

])

export class GeneralRouter {
    constructor() {
    }
}

