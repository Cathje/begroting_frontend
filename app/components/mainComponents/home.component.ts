import {Component} from 'angular2/core';

import {TownSelectorComponent} from "../subComponents/input/townSelector.component";
import {ProjectOverviewComponent} from "../subComponents/information/projectOverview.component";
import {StyledDirective} from '../../directives/styled';

@Component({
    selector: 'home-container',
    template: `
    <div class="banner-container">
        <div class="select-container">
            <h3>Kies een gemeente:</h3>
            <town-selector></town-selector>
        </div>

        <video width="100%" autoplay="autoplay" loop>
            <source src="/app/images/Big-City-Life.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            <source src="/app/images/Big-City-Life.ogv" type='video/ogg; codecs="theora, vorbis"'>
            Jouw browser ondersteunt geen video's.
        </video>
    </div>

    <div class="site-information-container" styled>
        <h2> Ontdek de openstaande projecten van jouw favoriete gemeente en participeer!</h2>
        <p>Het doel van dit platform is om de begrotingen en de uitgaven van Vlaamse steden en gemeenten transparant en begrijpelijk te maken voor de burgers en om
burgervoorstellen over de begroting te verzamelen en te communiceren met de bevoegde instanties binnen de steden en gemeenten.
        </p>
    </div>
    `
    ,
    directives: [TownSelectorComponent, ProjectOverviewComponent, StyledDirective],
    styles: [`

    h2 {
        color:white;
    }

    .select-container{
        position:absolute;
        top: 35%;
        left: 0;
        right: 0;
        z-index: 5;
    }

    .banner-container {
        position:relative;
        max-height: 400px;
        overflow: hidden;
        width:100%
    }

    .banner-container h3 {
        text-align: center;
        color:white;
    }

    .site-information-container {
        padding: 20px;
        text-align: center;
        background-color:#2ac7d2;
        color:white;
        padding-bottom: 200px;
    }

    .site-information-container h2 {
        font-weight: 300;
        padding: 20px 40px;
    }

    .site-information-container p {
        margin: 0;
        padding: 0px 0px;
    }

    video {
        display: block !important;
        width: 120%;
        top: 0;
        z-index:0;
    }
    `]
})

export class HomeComponent {}