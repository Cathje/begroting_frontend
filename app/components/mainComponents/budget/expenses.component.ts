import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'expenses-container',
    template: `<h2>Uitgaven</h2>`
})

export class ExpensesComponent {

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}