import {Component, Injector} from 'angular2/core';

import {NavigationMenuComponent} from './../subComponents/nav/menu.component';

import {HomeComponent} from './home.component';
import {SettingsRouter} from './settings/SettingsRouter';
import {BudgetRouter} from './budget/budgetRouter';
import {ParticipationRouter} from "./participation/participationRouter";

import {RouteConfig, ROUTER_DIRECTIVES, Location, RouteParams} from 'angular2/router';
import {HTTP_PROVIDERS} from "angular2/http";
import {TownService} from "../../services/townService.component";
import {MainTown} from "../../models/mainTown";
import {StyledDirective} from "../../directives/styled";
import {GeneralRouter} from "./general/GeneralRouter";

@Component({
    selector: 'home-router',
    template: `
    <navigation-menu *ngIf="_location.path() !== ''"></navigation-menu>
    <router-outlet></router-outlet>
    <footer styled>
       <img *ngIf="town?.logo" [src]="town.logo" class="smalllogo">
       <p>Tree company, De wakkere Burger en uw gemeente {{town?.naam}}</p>
       <p> <a [routerLink]="['General', 'AboutUs']">Over ons</a> -
       <a [routerLink]="['General', 'Faq']">FAQ</a> -
       <a [routerLink]="['General', 'Privacy']">Privacy</a> -
       </p>
    </footer>
    `
    ,
    directives: [ROUTER_DIRECTIVES, NavigationMenuComponent, StyledDirective],
    providers: [TownService],
    styles:[`
    footer {
        background-color: #2ac7d2;
        padding: 10px;
        text-align: center;
        border-top: 1px solid white !important;
    }

    footer p {
        color: white;
    }

    .smalllogo {
        margin: 0 auto;
        width: 50px;
    }
    `]
})

@RouteConfig([
    { path: '/', name: 'Home', component:HomeComponent, useAsDefault:true },
    { path: '/budget/...', name: 'Budget', component:BudgetRouter},
    { path: '/settings/...', name: 'Settings', component:SettingsRouter },
    { path: '/participation/...', name: 'Participation', component:ParticipationRouter },
    { path: '/general/...', name: 'General', component:GeneralRouter }
])

export class HomeRouter {
    town: MainTown;
    errorMessage: string;

    constructor(
        private _townService: TownService,
        private _routeParams: RouteParams,
        private _location: Location
    )
    {
        _townService.getTown(_routeParams.get('town'))
            .subscribe(town => {
                    this.town = town;
                    console.log('555', this.town);
                },
                (err:any) => this.errorMessage = err
            );
    }
}