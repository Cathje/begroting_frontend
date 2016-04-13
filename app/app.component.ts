import {Component} from 'angular2/core';
import {HomeComponent} from './components/mainComponents/home.component';
import {TownComponent} from './components/mainComponents/town.component';
import {ProjectComponent} from './components/mainComponents/project.component';
import {TownBudgetComponent} from './components/mainComponents/townBudget.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'; // for routing

@Component({ //invoke with metadata object
    selector: 'begroting-app',
    template: `
    <div class="menu">
                <a [routerLink]="['Home']">Home</a>
                <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>
</div>
                <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, //routing
    ],
})

@RouteConfig([
    { path: '/home', name: 'Home', component:HomeComponent },
    { path: '/home/:town', name: 'Town', component:TownComponent },
    { path: '/home/:town/:projectNumber', name: 'Project', component:ProjectComponent },
    { path: '/townBudget', name: 'TownBudget', component:TownBudgetComponent }
])

export class AppComponent {
    title = 'Begroting Vlaanderen';
}