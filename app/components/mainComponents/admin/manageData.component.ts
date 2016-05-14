import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownSelectorComponent} from "../../subComponents/input/townSelector.component.js";
import {TownService} from "../../../services/townService.component.js";
import {PoliticusType} from "../../../models/politicusType.js";
import {MainTown} from "../../../models/mainTown.js";

@Component({ //invoke with metadata object
    selector: 'manage-data-container',
    template: `
<section class="container">
    <h1>Beheer informatie</h1>
    <section class="col-xs-12">
        <h3>Demografische gegevens</h3>
        <div class="col-xs-12 col-sm-6 input-group">
            <label >Aantal bewoners</label>
             <div  class="input-group-addon">
                 <img class='icon' src="/app/images/icons/population.png">
              </div>
             <input type="number" [(ngModel)]="mainTown.aantalBewoners"/>
        </div>
        <div class="col-xs-12 col-sm-6 input-group">
                        <label >Aantal vrouwen</label>
                        <div  class="input-group-addon">
                            <img class='icon' src="/app/images/icons/woman.png">
                        </div>
                        <input  type="number" [(ngModel)]="mainTown.isVrouw"/>
        </div>
        <div class="col-xs-12 col-sm-6 input-group">
                        <label >Aantal mannen</label>
                        <div  class="input-group-addon">
                            <img class='icon' src="/app/images/icons/man.png">
                        </div>
                       <input type="number" [(ngModel)]="mainTown.isMan"/>
        </div>
        <div class="col-xs-12 col-sm-6 input-group">
                        <label >Aantal kinderen</label>
                        <div  class="input-group-addon">
                            <img class='icon' src="/app/images/icons/child.png">
                        </div>
                        <input type="number" [(ngModel)]="mainTown.isKind"/>
        </div>
                        <!-- @TODO uitzoeken hoe bestuur enkel wordt aangepast in backend en niet opnieuw wordt weggeschreven -->
                     <!--    <h4>Bestuur: </h4>
                        <ul *ngIf="mainTown?.bestuur" >
                            <li *ngFor="#bestuur of mainTown.bestuur"><span>{{bestuur.naam}} - {{types[bestuur.type]}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.bestuur"><i>Er is nog geen bestuur aangesteld</i></p>
                        
                       <h4>Voeg bestuurslid toe</h4>
                        <input type="text" [(ngModel)]="newBestuur.naam"/>
                         <select (change)="onSelect($event.target.value)">
                        <option *ngFor="#t of types" [value]="t">{{t}}</option>
                         </select> -->
    </section>

    <section class="col-xs-12">
        <h3>Geografische gegevens</h3>
        <div class="col-xs-12 col-sm-12 input-group">
                     <label>Provincie:</label>
                     <span>{{mainTown.provincie}}</span>
        </div>
        <div class="col-xs-12 col-sm-6 input-group">
                     <label>Oppervlakte:</label>
                     <input  type="number" [(ngModel)]="mainTown.oppervlakte"/>
        </div>
        <div class="col-xs-12 col-sm-6 input-group">
                     <label >Oppervlaktemaat:</label>
                     <input type="text" [(ngModel)]="mainTown.oppervlakteMaat"/>
        </div>
        <div class="col-xs-12 col-sm-6 input-group">
                    <label>Deelgemeenten: </label>
                        <ul *ngIf="mainTown?.deelGemeenten" >
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>
        </div>
    </section>
    <section class="col-xs-12">
        <button class="btn btn-primary pull-right" (click)="submit()">opslaan</button>
    </section>
</section>
`,
    providers: [TownService],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    styles: [`

    .icon {
        width: 13px;
    }
    label{
        text-align: left;
        width: 120px;
        background-color:white;
    }
    section div {
        padding: 5px;
        box-sizing: border-box;
    }

    .input-group {
        float: left;
    }

    input {
        text-align: center;
        border: 1px solid lightgray;
        height: 30px;
        width: 100%;
    }

    button {
    }
    `]
})


export class ManageDataComponent {

    mainTown = new MainTown("", "", 0, 0);
    // newBestuur:Bestuur = new Bestuur(""); // this gives an error
    types = PoliticusType;
    selectedType:PoliticusType = PoliticusType.Schepen;
    keys:boolean;

    constructor(private _routeParams:RouteParams, private _townService:TownService, private _router:Router, params:RouteParams, injector:Injector) {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:any) => this.mainTown = town
            );

    }

    onSelect(event:any) {
        this.selectedType = event.target.value;
    }

    submit() {
        this._townService.putTown(this.mainTown).subscribe();
        this._router.navigate(['/', 'App', 'Budget', {town: this.mainTown.naam}]);

    }
}