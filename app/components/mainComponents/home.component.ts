import {Component} from 'angular2/core';
import {TownSelectorComponent} from '/app/components/subComponents/input/townSelector.component.js'
import {ProjectOverviewComponent} from '/app/components/subComponents/information/projectOverview.component.js'

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
        <p>Het doel van dit platform is om de begrotingen en de uitgaven van Vlaamse steden en gemeenten transparant en begrijpelijk te maken voor de burgers en om
burgervoorstellen over de begroting te verzamelen en te communiceren met de bevoegde instanties binnen de steden en gemeenten.
</p>
    </div>
    <project-overview></project-overview>
    `
    ,
    directives: [TownSelectorComponent, ProjectOverviewComponent],
    styles: [`

    town-selector{
    position:absolute;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 5;
    }

    .banner-container {
    position:relative;
    height: 350px;
    overflow: hidden;
    width:100%
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
    padding: 0px 40px;
}

video {
    display: block !important;
    width: 120%;
    top: 0;
    z-index:0;
}


`]
})

export class HomeComponent {
    title = 'Home';
}