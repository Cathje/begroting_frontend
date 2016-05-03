import {Component} from 'angular2/core';
import {TownService} from './../../services/townService.component';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'
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
        
        <!-- HiER KOMEN DE KERNGEGEVENS EN OPENSTAANDE PROJECT(EN) VAN EEN GEMEENTE -->  
        <aside id="demographic">
           <form>
            <fieldset >
               <legend>Demografische gegevens</legend>
                    <p>
                        <label for="aantalBewoners">Aantal bewoners:</label>
                        <input type="number"  [(ngModel)]="mainTown.aantalBewoners" step="any"/>
                    </p>
                     <p>
                        <label for="isVrouw">Aantal vrouwen:</label>
                        <input type="number"  [(ngModel)]="mainTown.isVrouw" step="any"/>
                    </p>
                     <p>
                        <label for="isMan">Aantal mannen:</label>
                        <input type="number"  [(ngModel)]="mainTown.isMan" step="any" />
                    </p>
                     <p>
                        <label for="isChild">Aantal kinderen:</label>
                        <input type="number"  [(ngModel)]="mainTown.isKind" step="any"/>
                    </p>
            </fieldset>
           </form>
        </aside>
         
        <!-- HIER KOMT DE GRAPH -->
        <section id="content-town">
            <sunburst [data]=categories width=500 height=600 [onClick]=onClick></sunburst>
            
            <!--@TODO  TEST, NOG TE VERWIJDEREN-->
             <p *ngFor="#town of uitgaves"> {{town.catCode}} - {{town.naamCatx}} - {{town.naamCaty}} - {{town.naamCatz}} - {{town.uitgave}} </p>
        </section>     
         
         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->
        <aside id="geographic">

        <form>
            <fieldset>
                <legend>Geografische gegevens</legend>

                     <p><strong>Provincie:</strong> <span>{{mainTown.provincie}}</span></p>
                     <p>
                        <label for="oppervlakte">Oppervlakte:</label>
                        <input type="number"  [(ngModel)]="mainTown.oppervlakte"  readonly step="any" />
                    </p>
                     <p>
                        <label for="oppervlakteMaat">Oppervlakte maat:</label>
                        <input type="text"  [(ngModel)]="mainTown.oppervlakteMaat" size="4" readonly />
                    </p>
                    <p><strong>Deelgemeenten: </strong></p>
                    <div  *ngIf="mainTown?.deelGemeenten" >
                        <ul>
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                    </div>
                    <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>
                    <button class="showInfo" [hidden]="!isVisable"(click)="toggle()">minder info</button>
            </fieldset>
           </form>

       <p> hier komen actions bij klik/hover over een categorie</p>
       <!--@TODO  TEST, NOG TE VERWIJDEREN-->
        <p *ngFor="#actie of acties"> {{actie.actieLang}} -  {{actie.actieKort}}</p>
        </aside>
       </div>
`,
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent, SunburstComponent],
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

    h3 {
    margin: 0;
    padding-bottom: 1%;
    font-size: 3rem;
    color: white;
    }
    
    .container {
    width: inherit;
    padding: 1%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    }
    #info-town   {
    padding: 1%;
    flex-shrink: 2; 
    -webkit-flex-shrink: 2;
    }
    
    #content-town {
    padding: 1%;
    margin-left: 1%;
    flex: 3;
    -webkit-flex-grow: 3;
    }

    #geographic {
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
    input[type="number"] 
    {
        width: 15%;
    }
    input, span{
    background-color: transparent;
    border: 0 solid;
    color: #a3a3a3;
    font-size: 1em;
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
    
    form p, li {
        font-size: 0.8em;
    }
    form fieldset legend, #info-town h5 {
    
    font-size: 1.2em;
    }
    
`]
})

export class TownComponent {
    title = 'Gemeente - home';
    name:string = "";
    mainTown = new MainTown("","",0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable=false;
    contentbutton="meer info";
    uitgaves: FinancieleLijn [];
    acties: Actie[];
    categories: FinancieleLijn [] =
    [{catCode:"0990",naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",uitgave: 22781},
{catCode:"0991", naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",uitgave:281},
{catCode:"099",naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen",uitgave:3311},
{catCode:"098",naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",uitgave:906}];
    onClick: any = () => {
        alert('hey');
    }

    constructor(private _townService:TownService, _begrotingService:BegrotingService, _actieService:ActieService, private _routeParams:RouteParams)
    {
        _townService.getTown(_routeParams.get('town'))
            .subscribe(town => this.mainTown = town
             );

        _begrotingService.getFinancieleLijnen(2020,"Gent")
            .subscribe(finan => this.uitgaves = finan
            );

        /* @TODO Catherine, Deze methode gaat dus de acties tonen die bij een bepaalde cat horen. Je kan dit testen door de gemeente Gent te selecteren
         Dus wss zal deze methode verplaatst moeten worden naar een onClick event in de sunburst.
         Nu staat er momenteel een catCode hardcoded in. 
         */
        _actieService.getActies("0905","Gent")
            .subscribe(acties => this.acties = acties);
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