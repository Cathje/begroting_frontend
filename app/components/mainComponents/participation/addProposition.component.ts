import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'add-proposition-container',
    template: `<h2>Voorstel indienen</h2>`
})

export class AddPropositionComponent {

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}