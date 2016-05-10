import {Component} from 'angular2/core';
import {TownService} from './../../../services/townService.component.js';
import { RouteParams } from 'angular2/router';
import {TownSelectorComponent} from './../../subComponents/input/townSelector.component.js';
import {EditableFieldComponent} from './../../subComponents/input/editableField.component.js';
import {MainTown} from "../../../models/mainTown.js";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component.js';
import {BegrotingService} from "../../../services/begrotingService.js";
import {ActieService} from "../../../services/ActieService.js";
import {Actie} from "../../../models/actie.js";


@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
        <div class="container">
        <section class="intro col-xs-12 col-sm-4">
            <h1>De kerngegevens van {{mainTown?.naam}}</h1>
            <p>Hier komt een paragraaf.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
        </section>

        <section class="graph col-xs-12 col-sm-8" (window:resize)="onResize($event)">
           <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>

            <div class="pointer">
                <img src="./app/images/icons/clickPointer.png">
                <p> Klik op een categorie om de acties van deze categorie te bekijken.</p>
            </div>
            <!--@TODO  TEST, NOG TE VERWIJDEREN-->
             <p *ngFor="#town of uitgaves"> {{town.ID}} - {{town.naamCatx}} - {{town.naamCaty}} - {{town.naamCatz}} - {{town.totaal}} </p>
        </section>

        <section class="demographic col-xs-12 col-sm-12">
        <h2>Demografische gegevens</h2>
                    <div class="col-xs-6 col-sm-3">
                        <img class='icon' src="./app/images/icons/population.png">
                        <h4>Aantal bewoners</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.aantalBewoners"></editable-field>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                        <img class='icon' src="./app/images/icons/woman.png">
                        <h4>Aantal vrouwen</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.isVrouw"></editable-field>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                        <img class='icon' src="./app/images/icons/man.png">
                        <h4>Aantal mannen</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.isMan"></editable-field>
                    </div>
                    <div class="col-xs-6 col-sm-3">
                        <img class='icon' src="./app/images/icons/child.png">
                        <h4>Aantal kinderen</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.isKind"></editable-field>
                    </div>
        </section>


         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->
        <section id="geographic" class="col-xs-12 col-sm-12">
        <h2>Geografische gegevens</h2>
                    <div class='col-xs-12 col-md-6'>
                      <img src="./app/images/provincies/vlaamsbrabant.png" class="provincie">
                     </div>
                     <div class='col-xs-12 col-md-6'>
                     <h4>Provincie:</h4>
                     <span>{{mainTown.provincie}}</span>

                     <h4>Oppervlakte:</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.oppervlakte"></editable-field>
                        <span>{{mainTown.oppervlakteMaat}}</span>
                    <h4>Deelgemeenten: </h4>
                        <ul *ngIf="mainTown?.deelGemeenten" >
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>
                    <button class="showInfo" [hidden]="!isVisable"(click)="toggle()">minder info</button>
                    </div>
        </section>
        <section>
             <!--@TODO  TEST, NOG TE VERWIJDEREN-->
            <p *ngFor="#actie of acties"> {{actie.actieLang}} -  {{actie.actieKort}}</p>
        </section>
       </div>
`,
    directives: [TownSelectorComponent, EditableFieldComponent, SunburstComponent],
    providers: [ BegrotingService,ActieService,
        TownService,  //routing
    ],
    styles: [`

    .icon {
    width: 200px;
    margin: 10px;
    float:left;
    }

    h2 {
    text-align: left;
    margin: 40px 0;
    }

    h3 {
    margin: 0;
    padding-bottom: 1%;
    font-size: 3rem;
    color: white;
    }

    h4{
    margin-bottom: 0;
    }

    .container {
    max-width: 1200px;
    }

    #info-town   {
    padding: 1%;
    flex-shrink: 2; 
    -webkit-flex-shrink: 2;
    }

    .intro {
    padding: 20px;
    }

    .provincie {
    }
    .graph {
    padding: 40px 20px;
    text-align: center;
    margin: O auto;
    }

    .pointer img{
     width: 50px;
     display: inline-block;
    }

    .pointer p{
     display: inline-block;
    }

    .pointer {
    text-align: center;
    }

    .demographic{
    text-align: center;
    }

    .geographic {
    padding: 1%;
    margin-left: 1%;
    flex: 1;
    -webkit-flex-grow: 1;
    text-align: right;
    }
        
    #actions   {
    padding: 1%;
    margin-left: 1%;
    flex: 1; 
    -webkit-flex-grow: 1;

    }


    label {
    display:block;
    }
    
    .showInfo{
        float: right;
        background: #3498db;
         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
         background-image: -moz-linear-gradient(top, #3498db, #2980b9);
         background-image: -ms-linear-gradient(top, #3498db, #2980b9);
         background-image: -o-linear-gradient(top, #3498db, #2980b9);
         background-image: linear-gradient(to bottom, #3498db, #2980b9);
         width: 55%;
         color: #ffffff;
         text-decoration: none;
         font-size: 0.8em;
    }

    
`]
})

export class OverviewComponent {
    title = 'Gemeente - home';
    name:string = "";
    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable = false;
    contentbutton="meer info";
    uitgaves: GemeenteCategorie [];
    acties: Actie[];
    id:number;
    isEditor: boolean = false; //TODO: adapt value when signed in with special role
    categories: FinancieleLijn [] =
    [{catCode:"0990",naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",uitgave: 22781},
{catCode:"0991", naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",uitgave:281},
{catCode:"099",naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen",uitgave:3311},
{catCode:"098",naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",uitgave:906}];
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/2;
    _actieService: ActieService;

    onCircleClick: any = (categorie: string) => {
        alert('hier komt een popup met de acties van de categorie: ' + categorie);
       this._actieService.getActies(15)
           .subscribe((acties : any) => this.acties = acties);
    };

    constructor(private _townService:TownService, _begrotingService:BegrotingService, private _routeParams:RouteParams,_actieService: ActieService )
    {
        _townService.getTown(_routeParams.get('town'))
            .subscribe(town => this.mainTown = town
             );

        _begrotingService.getFinancieleLijnen(2020,"Gent")
           .subscribe(finan => this.uitgaves = finan
            );

        this._actieService = _actieService;
    }

    ngOnInit() {
        /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
        EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
        //this.name = this._routeParams.get('town');
    }


    public toggle(): void
    {
        this.isVisable = !this.isVisable;
    }


    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/2;

        }
    }

}

