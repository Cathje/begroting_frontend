import {Component} from 'angular2/core';
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'
import {ProjectOverviewComponent} from './../subComponents/information/projectOverview.component'

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
    <div class="banner-container">
    <h3>Kies een gemeente:</h3>
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
    directives: [TownSelectorComponent, ProjectOverviewComponent],
    styles: [`
    town-selector: {

            position:absolute;
    top: 50%;
    left: 0;
    right: 0;
    }

    .banner-container {
    position:relative;
    height: 350px;
    overflow:hidden;
}

.banner-container h3 {
    position:absolute;
    top: 30%;
    text-align: center;
    color:white;
    left: 0;
    right: 0;
    font-family: 'Roboto', sans-serif;

}


.banner-container town-selector{
    position:absolute;
    top: 50%;
    left: 0;
    right: 0;
}

    .projects-container h3 {
    background-color: black;
    color:white;
    margin: 0;
    text-align: center;
    padding: 10px;
}

.projects-container {
    background-color: #2ac7d2;
    color:white;
    text-align: center;
}


.site-information-container {
    padding: 20px;
    text-align: center;
    background-color:#2ac7d2;
    color:white;
}

.site-information-container h2 {
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-weight: 300;
    padding: 20px 40px ;
}
.site-information-container p {
    margin: 0;

}

video {
    display: block !important;
    width: 120%;
    top: 0;
}


`]
})

export class HomeComponent {
    title = 'Home';
}