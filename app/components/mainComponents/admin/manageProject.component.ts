import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'project-container',
    template: `<h2>Beheer project</h2>`
})

export class ManageProjectComponent {

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
       // var number = this._routeParams.get('projectNumber');
    }
}