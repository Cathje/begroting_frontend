import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'add-information-container',
    template: `<h2>Voeg informatie toe</h2>`
})

export class AddInformationComponent {

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}