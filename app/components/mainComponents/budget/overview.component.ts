import {Component, Injector} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

import {SunburstComponent} from './../../subComponents/graphs/sunburst.component';
import {MainTown} from "../../../models/mainTown";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";
import {TownService} from './../../../services/townService.component';
import {BegrotingService} from "../../../services/begrotingService";
import {ProjectService} from "../../../services/projectService.component";
import {Project} from "../../../models/project";
import {StyledDirective} from '../../../directives/styled';

@Component({ //invoke with metadata object
    selector: 'overview-container',
    template: `
        <div class="overview-container">
            <div class="container" (window:resize)="onResize($event)">
                <div class="intro col-xs-12">
                <h1>Dashboard {{mainTown?.naam}}</h1>
                <p>Welkom op het online platform van {{mainTown?.naam}}. Hieronder vind u een overzicht met de belangrijkste informatie over onze gemeente. Klik op een widget van uw keuze om meer informatie te verkrijgen rond een specifiek onderwerp.</p>
            </div>

            <section class="col-xs-12 col-sm-6">
                <div class="widget-content">
                    <h4>Inkomsten per categorie</h4>
                    <sunburst [data]=income [height]=width [width]=width></sunburst>
                    <button type="button" class="btn btn-primary pull-right" [routerLink]="['Income']" styled>Meer info</button>
                </div>
            </section>

            <section class="col-xs-12 col-sm-6">
                <div class="widget-content" >
                    <h4>Uitgaves per categorie</h4>
                    <sunburst [data]=expenses [height]=width [width]=width></sunburst>
                    <button type="button" class="btn btn-primary pull-right" [routerLink]="['Expenses']" styled>Meer info</button>
                </div>
            </section>
            <section class="col-xs-12 col-sm-6">
             <div class="widget-content">
                <h4> Openstaande projecten</h4>
                <ul>
                   <p *ngIf="projects === null" class='noData'> Er zijn geen openstaande projecten.</p>
                   <li *ngFor="#project of projects">
                       <button type="button" class="btn btn-primary btn-sm" [routerLink]="['/','App', {town: townString}, 'Participation', 'Projects']" styled>Meer info</button>
                       {{project.boekjaar}} - {{project.titel}}
                   </li>
                </ul>
            </div>
           </section>
        <section class="col-xs-12 col-sm-6 col-md-3 pull-right">
            <div class="widget-content">
                <h4> Kerngegevens</h4>
                <img class='icon' src="/app/images/icons/population.png">
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['CoreData']" styled>Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3 pull-right">
            <div class="widget-content">
                <h4>Vergelijk de begroting van 2 gemeentes</h4>
                <p> Doet jouw gemeente het beter dan een andere gemeente? Vergelijk de begrotingsverdeling door op de knop meer info te klikken en selecteer jouw favoriete gemeentes.</p>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['Comparison']" styled>Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3">
             <div class="widget-content">
                <h4>Waar gaan mijn belastingen naartoe?</h4>
                <p>Vul jouw loon in en ontdek hoeveel geld naar de verschillende categorieën van de begroting gaat.</p>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['Taxes']" styled>Meer info</button>
            </div>
        </section>

        <section class="col-xs-12 col-sm-6 col-md-3 pull-right">
             <div class="widget-content">
                <h4>Hoe participeren</h4>
                <p>Wil je zelf participeren aan de begroting van {{mainTown?.naam}}? Klik op meer info en dien jouw voorstel in.</p>
                <button type="button" class="btn btn-primary pull-right" [routerLink]="['/','App', {town: townString}, 'Participation', 'Projects']" styled>Meer info</button>
            </div>
        </section>

       </div>
    </div>
`,
    directives: [SunburstComponent,ROUTER_DIRECTIVES, StyledDirective],
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

    li {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
    }

    .btn {
        margin: 20px 0px 0px 10px;
    }

    .icon {
        max-width: 200px;
        margin: 0 auto;
        display:block;
    }
`]
})

export class OverviewComponent {

    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet

    // parameters for extra information widget
    year: number = 2015;
    information: string = "Extra informatie over project";

    // parameters for open projects widget
    projects: Project[] = null;

    // parameters for expenses widget
    expenses: GemeenteCategorie [] = [];
    width: number = window.innerWidth < 768 ? window.innerWidth*0.7 : window.innerWidth/4;

    // parameters for income widget
    income: GemeenteCategorie [] = [];

    //errors
    errorMessage: string;

    constructor(private _projectService:ProjectService,
                private _townService:TownService,
                private _begrotingService:BegrotingService,
                private injector: Injector
    )
    {
        console.log('55', injector.parent.parent.parent.parent.get(RouteParams).get('town'));
        _townService.getTown(injector.parent.parent.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:MainTown) => {
                    this.mainTown = town;
                },
                (err:any) => this.errorMessage = "Er is geen stad gevonden."

            );

        _projectService.getProjects(injector.parent.parent.get(RouteParams).get('town')).subscribe(
            (projects:any) => {this.projects = projects; },
            (err:any) => this.errorMessage = "Er zijn geen projecten gevonden."
        );

        // TODO: change hardcoded year and city with variables : today.getYear() + injector.parent.parent.parent.parent.get(RouteParams).get('town')
        _begrotingService.getGemeenteCategorieen(2020,"Gent")
            .subscribe((exp: any) => this.expenses = exp
            );
    };

    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.7;

        }else {
            this.width = window.innerWidth/4;
        }
    };
}

