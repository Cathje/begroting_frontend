import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {TestComponent} from "./test.component.js";

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: '<h3>{{title}}</h3>',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, HTTP_PROVIDERS ], //routing    ],
})

@RouteConfig([
    { path: '/test', name: 'Test', component:TestComponent }
])

export class TownBudgetComponent {
    title = 'Gemeente - Begrotingsvoorstel';
}

