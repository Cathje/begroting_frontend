import {Component} from 'angular2/core';
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `<h2>{{title}}</h2>
                <town-selector></town-selector>`,
    directives: [TownSelectorComponent]
})

export class HomeComponent {
    title = 'Home';
}