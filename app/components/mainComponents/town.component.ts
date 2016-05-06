import {Component} from 'angular2/core';
import {TownService} from './../../services/townService.component';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'
import {MainTown} from "../../models/mainTown";
import {SunburstComponent} from './../subComponents/graphs/sunburst.component'

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
        <nav class="home-menu" >
                <div class="breadcrum" >
                <a [routerLink]="['Home']">Home</a>
                <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>
                </div>
                <h3>{{mainTown?.naam}}</h3>
                <town-selector></town-selector>              
        </nav>
        <!-- <h3>{{name}}</h3> --> 
        
        <div class="container">
        
        <!-- HiER KOMEN DE KERNGEGEVENS EN OPENSTAANDE PROJECT(EN) VAN EEN GEMEENTE -->  
        <aside id="info-town"> 
        <h5>Kern gegevens</h5>
           <form>
                 <fieldset>   
                    <p>
                        <label for="postCode">Postcode:</label>
                        <input type="text"  [(ngModel)]="mainTown.postCode" maxlength="4" size="4"/>
                    </p>
                    <button class="showInfo" [hidden]="isVisable" (click)="toggle()">meer info</button>
            </fieldset>
            <fieldset [style.display]="isVisable?'inherit':'none'">
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
            </fieldset><br>
            <fieldset [style.display]="isVisable?'inherit':'none'">
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
        </aside>
         
        <!-- HIER KOMT DE GRAPH -->
        <section id="content-town">
            <sunburst [data]=categories width=500 height=600></sunburst>
        </section>     
         
         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->
        <aside id="actions">
       <p> hier komen actions bij klik/hover over een categorie</p>
        </aside>
       </div>
`,
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent, SunburstComponent],
    providers: [
        TownService,  //routing
    ],
    styles: [`
   
    .home-menu {
    padding: 1% 2% 0 2%; 
    background-color: #2ac7d2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    }

    h3 {
    margin: 0;
    padding-bottom: 1%;
    font-size: 3rem;
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
    border-right: #3498db solid 1px;    
    }
    
    #content-town {
    padding: 1%;
    margin-left: 1%;
    flex: 3;
    -webkit-flex-grow: 3;
    border: black solid 2px;  <!-- @TODO: LATER TE VERWIJDEREN -->
    }
    
        
    #actions   {
    padding: 1%;
    margin-left: 1%;
    flex: 1; 
    -webkit-flex-grow: 1;
    border: black solid 2px;  <!-- @TODO: LATER TE VERWIJDEREN -->
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
    mainTown = new MainTown("","", 0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable=false;
    contentbutton="meer info";
    categories: [[string, string]] =
    [["Algemene financiering -Algemene financiering -Financiële aangelegenheden ", "22781"],
        ["Algemene financiering -Algemene financiering -Patrimonium zonder maatschappelijk doel ", "281"],
        ["Zorg en opvang -Gezin en kinderen -Kinderopvang ", "3311"],
        ["Cultuur en vrije tijd -Sport ", "906"],
        ["Wonen en ruimtelijke ordening -Woonbeleid -Bestrijding van krotwoningen ", "906"],
        ["Veiligheidszorg ", "906"],
        ["Leren en onderwijs -Basisonderwijs -Gewoon basisonderwijs ", "906"]];

    constructor(private _townService:TownService, private _routeParams:RouteParams)
    {
        _townService.getTown(this._routeParams.get('town'))
            .subscribe(town => this.mainTown = town
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