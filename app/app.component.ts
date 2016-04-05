import {Component} from 'angular2/core';
import {HomeComponent} from './components/mainComponents/home.component';
import {TownComponent} from './components/mainComponents/town.component';
import {TownBudgetComponent} from './components/mainComponents/townBudget.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'; // for routing

@Component({ //invoke with metadata object
    selector: 'begroting-app',
    template: ` <h1>{{title}}</h1>
                <a [routerLink]="['Home']">Home</a>
                <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>

                <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, //routing
    ],
})

@RouteConfig([
    { path: '/home', name: 'Home', component:HomeComponent },
    { path: '/home/:town', name: 'Town', component:TownComponent },
    { path: '/townBudget', name: 'TownBudget', component:TownBudgetComponent }
])

export class AppComponent {
    title = 'Begroting Vlaanderen';
}