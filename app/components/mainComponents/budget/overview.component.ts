import {Component, Injector} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

import {SunburstComponent} from './../../subComponents/graphs/sunburst.component.js';

import {MainTown} from "../../../models/mainTown.js";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie.js";

import {TownService} from './../../../services/townService.component.js';
import {BegrotingService} from "../../../services/begrotingService.js";
import {ProjectService} from "../../../services/projectService.component.js";


@Component({ //invoke with metadata object
    selector: 'overview-container',
    template: `
        <div class="overview-container">
        <div class="container" (window:resize)="onResize($event)">
        <div class="intro col-xs-12">
            <h1>Dashboard {{mainTown?.naam}}</h1>
            <p>Welkom op het online platform van {{mainTown?.naam}}. Hieronder vind u een overzicht met de belangrijkste informatie over de gemeente {{mainTown?.naam}}. Klik op een widget van uw keuze om meer informatie te verkrijgen rond een specifiek onderwerp.</p>
        </div>

         <section class="col-xs-12 col-sm-6 col-md-6">
            <div class="widget-content">
                <h4>Inkomsten per categorie</h4>
                <sunburst [data]=income [onClick]=onCircleClick [height]=width [width]=width></sunburst>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['Income']">Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-6">
            <div class="widget-content" >
                <h4>Uitgaves per categorie</h4>
                <sunburst [data]=expenses [onClick]=onCircleClick [height]=width [width]=width></sunburst>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['Expenses']">Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6">
             <div class="widget-content">
                <h4> Openstaande projecten</h4>
                <ul>
                    <p [ngClass]="{hide: projects.length >= 1}" class='noData'> Er zijn geen openstaande projecten.</p>
                    <li *ngFor="#project of projects"><button type="button" class="btn btn-primary btn-sm" [routerLink]="['/','App', 'Participation', {town: townString}, 'Projects']">Meer info</button>
{{project.boekjaar}} - {{project.titel}}
                    </li>
                </ul>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-6">
            <div class="widget-content">
                <h4> Extra informatie over projecten </h4>

                <p> Voeg hieronder extra informatie toe over toekomstige projecten en/of projecten uit het verleden </p>
                <div class="col-xs-12 input-group">
                     <label>Jaar:</label>
                     <input  type="number" [(ngModel)]="year"/>
               </div>

                <div class="col-xs-12 input-group">
                    <label>Informatie:</label>
                    <textarea rows="2" [(ngModel)]="information"></textarea>
                </div>
                <button type="button" class="btn btn-primary pull-right" (click)="saveExtraInfo()">Verzenden</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3 pull-right">
            <div class="widget-content">
                <h4> Kerngegevens</h4>
                <img class='icon' src="/app/images/icons/population.png">
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['CoreData']">Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3 pull-right">
            <div class="widget-content">
                <h4>Vergelijk de begroting van 2 gemeentes</h4>
                <p> Doet jouw gemeente het beter dan een andere gemeente? Vergelijk de begrotingsverdeling door op de knop meer info te klikken en selecteer jouw favoriete gemeentes.</p>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['Comparison']">Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3">
             <div class="widget-content">
                <h4>Waar gaan mijn belastingen naartoe?</h4>
                <p>Vul jouw loon in en ontdek hoeveel geld naar de verschillende categorieën van de begroting gaat.</p>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['Taxes']">Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3 pull-right">
             <div class="widget-content">
                <h4>Hoe participeren</h4>
                <p>Wil je zelf participeren aan de begroting van {{mainTown?.naam}}? Klik op meer info en dien jouw voorstel in.</p>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['/','App', 'Participation', {town: townString}, 'Projects']">Meer info</button>
            </div>
        </section>

       </div>
       </div>
`,
    directives: [SunburstComponent,ROUTER_DIRECTIVES],
    providers: [ ProjectService, BegrotingService, TownService],
    styles: [`

    .overview-container {
       background-color: #f2f3f8;
    }

    section {
        box-sizing: border-box;
        padding: 20px;
    }

    .widget-content {
        padding: 20px;
        background-color: white;
        box-shadow: 3px 3px 3px lightgray;
        overflow: auto;
    }

    .widget-content div input {
    }

    .btn {
        margin-top: 15px;
    }

    li {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
    }

    li .btn {
        margin: 10px 20px 10px 0px;
    }

    .icon {
        max-width: 200px;
        margin: 0 auto;
        display:block;
    }
`]
})

export class OverviewComponent {
    //TODO catherine: hide the extra information widget when the role of the user is not admin/superadmin

    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet

    // parameters for extra information widget
    year: number = 2015;
    information: string = "Extra informatie over project";

    // parameters for open projects widget
    projects: [Object];

    // parameters for expenses widget
    expenses: GemeenteCategorie [] = [];
    width: number = window.innerWidth < 768 ? window.innerWidth*0.7 : window.innerWidth/4;

    // parameters for income widget
    income: GemeenteCategorie [] = []; //TODO nadya: create a webapi that shows the income categories

    constructor(private _projectService:ProjectService,
                private _townService:TownService,
                private _begrotingService:BegrotingService,
                private injector: Injector
                )
    {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:Object) => {
                this.mainTown = town;
                }
             );

        //@TODO nadya: een webapi opzetten om de openstaande projecten op te halen
         this.projects = _projectService.getProjects();

        //TODO nadya: webapi aanpassen zodat het ook werkt voor andere jaren en steden --> Deze werkt met andere gemeenten en jaren. Je moet de hardcoded data wijzigen door variabelen
        
        _begrotingService.getGemeenteCategorieen(2020,"Gent")
           .subscribe((finan: any) => this.expenses = finan
            );
    }

    ngOnInit() {
        /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
        EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
        //this.name = this._routeParams.get('town');
    }

    saveExtraInfo: any = () => {
       //TODO nadya: send a call to backend for publishing the extra information
        alert('sending info to backend');
    };

    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.7;

        }else {
            this.width = window.innerWidth/4;
        }
    }

}

