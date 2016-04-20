import {Component} from 'angular2/core';
import {TownService} from './../../services/townService.component';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
        <div class="home-menu menu">
                <a [routerLink]="['Home']">Home</a>
                <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>
                <town-selector></town-selector>

</div>
<h3>{{name}}</h3>`,
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    providers: [
        TownService,  //routing
    ],
})

export class TownComponent {
    title = 'Gemeente - home';
    name: string = "";

    constructor(
        private _townService: TownService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.name = this._routeParams.get('town');
    }
}