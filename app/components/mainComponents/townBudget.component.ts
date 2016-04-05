import {Component} from 'angular2/core';

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: '<h3>{{title}}</h3>'
})

export class TownBudgetComponent {
    title = 'Gemeente - Begrotingsvoorstel';
}