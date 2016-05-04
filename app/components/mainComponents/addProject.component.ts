import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'project-container',
    template: `<h2>Voeg project toe</h2>`
})

export class AddProjectComponent {

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}