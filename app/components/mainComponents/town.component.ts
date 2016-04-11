import {Component} from 'angular2/core';
import {TownService} from './../../services/townService.component';
import { RouteParams } from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `<h3>{{name}}</h3>`,
    providers: [TownService]
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