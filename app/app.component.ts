import {Component} from 'angular2/core';
import {HomeComponent} from './components/mainComponents/home.component';
import {TownComponent} from './components/mainComponents/town.component';
import {ProjectComponent} from './components/mainComponents/project.component';
import {TownBudgetComponent} from './components/mainComponents/townBudget.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";


@Component({ //invoke with metadata object
    selector: 'begroting-app',
    template: `
    <div class="menu">
        <img class="logo" src="./app/images/logo.png"/>
        <span class="pull-xs-right">
<a [routerLink]="['Home']">Sign in</a>|
<a [routerLink]="['Home']">Log in</a>
</span>

</div>
                <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, HTTP_PROVIDERS ], //routing    ],
    styles: [`.menu {
    background-color: black;
    color:white;
    padding: 20px;
    text-align: left;
}

.logo {
    width: 150px;
    margin: 0 auto;

}

.menu a  {
    color:white;
    padding: 10px;
}
`]
})

@RouteConfig([
    { path: '/', name: 'Home', component:HomeComponent },
    { path: '/:town', name: 'MainTown', component:TownComponent },
    { path: '/:town/:projectNumber', name: 'Project', component:ProjectComponent },
    { path: '/townBudget', name: 'TownBudget', component:TownBudgetComponent }
])

export class AppComponent {
    title = 'Begroting Vlaanderen';
}