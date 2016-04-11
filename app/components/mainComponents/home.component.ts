import {Component} from 'angular2/core';
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'
import {ProjectOverviewComponent} from './../subComponents/information/projectOverview.component'

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `<h2>{{title}}</h2>
                <town-selector></town-selector>
                <project-overview></project-overview>
                `
                ,
    directives: [TownSelectorComponent, ProjectOverviewComponent]
})

export class HomeComponent {
    title = 'Home';
}