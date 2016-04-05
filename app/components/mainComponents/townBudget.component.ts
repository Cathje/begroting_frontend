import {Component} from 'angular2/core';

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: '<h1>{{title}}</h1>'
})

export class TownBudgetComponent {
    title = 'Gemeente - Begrotingsvoorstel';
}