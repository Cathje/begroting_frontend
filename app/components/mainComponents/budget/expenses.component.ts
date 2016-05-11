import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'expenses-container',
    template: `
    <div class="container">
    <h2>Uitgaven</h2>
    </div>
    `
})

export class ExpensesComponent {

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}