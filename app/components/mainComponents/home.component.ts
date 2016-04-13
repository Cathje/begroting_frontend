import {Component} from 'angular2/core';
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'
import {ProjectOverviewComponent} from './../subComponents/information/projectOverview.component'

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
    <div class="home-container">
       <town-selector></town-selector>

     <video width="100%" autoplay="autoplay" loop>
            <source src="./app/images/Big_City-Life.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            <source src="./app/images/Big-City-Life.ogv" type='video/ogg; codecs="theora, vorbis"'>
            Jouw browser ondersteunt geen video's.
        </video>

    </div>
    <div class="site-information-container">
        <h2> Ontdek de openstaande projecten van jouw favoriete gemeente en participeer!</h2>
    </div>
    <div class="projects-container">
        <project-overview></project-overview>
    </div>

    `
    ,
    directives: [TownSelectorComponent, ProjectOverviewComponent]
})

export class HomeComponent {
    title = 'Home';
}