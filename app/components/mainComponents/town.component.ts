import {Component} from 'angular2/core';
import {TownService} from './../../services/townService.component';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {TownSelectorComponent} from './../subComponents/input/townSelector.component';
import {EditableFieldComponent} from './../subComponents/input/editableField.component';
import {MainTown} from "../../models/mainTown";
import {SunburstComponent} from './../subComponents/graphs/sunburst.component'
import {BegrotingService} from "../../services/begrotingService";
import {ActieService} from "../../services/ActieService";
import {Actie} from "../../models/actie";

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
        <nav class="home-menu" >
                <div class="breadcrum" >
                    <a [routerLink]="['Home']">Home</a>
                    <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>
                </div>
                <h3>{{mainTown?.naam}}</h3>
                <div>
                    <town-selector></town-selector>
                </div>
        </nav>
        <div class="container">
        <!-- HIER KOMT DE INTRODUCTIE -->
        <section class="intro col-xs-12 col-sm-4">
            <h1> De kerngegevens van {{mainTown?.naam}}</h1>
            <p> Hieronder vindt u de voornaamste gegevens van uw gemeenLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
        </section>

        <!-- HIER KOMT DE GRAPH -->
        <section class="graph col-xs-12 col-sm-8">
            <sunburst [data]=categories width=500 height=500 [onClick]=onCircleClick></sunburst>

            <div class="pointer">
                <img src="./app/images/icons/clickPointer.png">
                <p> Klik op een categorie om de acties van deze categorie te bekijken.</p>
            </div>
            <!--@TODO  TEST, NOG TE VERWIJDEREN-->
             <p *ngFor="#town of uitgaves"> {{town.catCode}} - {{town.naamCatx}} - {{town.naamCaty}} - {{town.naamCatz}} - {{town.uitgave}} </p>
        </section>

        <!-- HiER KOMEN DE KERNGEGEVENS EN OPENSTAANDE PROJECT(EN) VAN EEN GEMEENTE -->  
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
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent, EditableFieldComponent, SunburstComponent],
    providers: [ BegrotingService,ActieService,
        TownService,  //routing
    ],
    styles: [`
   
    .home-menu {
    padding: 5px;
    background-color: #2ac7d2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    sel
    }

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
    padding: 40px;
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

export class TownComponent {
    title = 'Gemeente - home';
    name:string = "";
    mainTown = new MainTown("","",0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable = false;
    contentbutton="meer info";
    uitgaves: FinancieleLijn [];
    acties: Actie[];
    id:number;
    isEditor: boolean = false; //TODO: adapt value when signed in with special role
    categories: FinancieleLijn [] =
    [{catCode:"0990",naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",uitgave: 22781},
{catCode:"0991", naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",uitgave:281},
{catCode:"099",naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen",uitgave:3311},
{catCode:"098",naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",uitgave:906}];
    _actieService: ActieService;

    onCircleClick: any = (categorie: string) => {
        alert('hier komt een popup met de acties van de categorie: ' + categorie);
        this._actieService.getActies("0905","Gent")
            .subscribe(acties => this.acties = acties);
    };

    constructor(private _townService:TownService, _begrotingService:BegrotingService, private _routeParams:RouteParams)
    {
        _townService.getTown(_routeParams.get('town'))
            .subscribe(town => this.mainTown = town
             );

        _begrotingService.getFinancieleLijnen(2020,"Gent")
            .subscribe(finan => this.uitgaves = finan
            );
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

}