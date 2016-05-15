import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownSelectorComponent} from "../../subComponents/input/townSelector.component.js";
import {TownService} from "../../../services/townService.component.js";
import {PoliticusType} from "../../../models/politicusType.js";
import {MainTown} from "../../../models/mainTown.js";
import {Bestuur} from "../../../models/bestuur.js";
import {KeysPipe} from "../../../pipes/keysPipe.js";

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
                         <h4>Bestuur: </h4>
                        <ul *ngIf="mainTown?.bestuur" >
                            <li *ngFor="#b of mainTown.bestuur" ><span>{{b.naam}} - {{types[b.type]}}</span> <button (click)="verwijder(b.PoliticusId, b)" >verwijder betsuurslid</button></li>
                        </ul>
                        <p *ngIf="!mainTown.bestuur"><i>Er zijn geen gegevens over het bestuur</i></p>
               
               <h4>voeg bestuurslid toe: </h4>
                <p>naam: </p>    
                           <input type="text" [(ngModel)]="bestuur.naam"/>
                <select (change)="onSelect($event)">
                        <option *ngFor="#t of types | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                <button (click)="voegToe()">voeg toe</button>
        </div>
    </section>
    <section class="col-xs-12">
        <button class="btn btn-primary pull-right" (click)="submit()">opslaan</button>
    </section>
</section>
`,
    providers: [TownService],
    pipes: [KeysPipe],
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


    `]
})


export class ManageDataComponent {

    mainTown = new MainTown("", "", 0, 0);
    types = PoliticusType;
    keys:boolean;
    bestuur: Bestuur = new Bestuur("");

    constructor(private _routeParams:RouteParams, private _townService:TownService, private _router:Router, params:RouteParams, injector:Injector) {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:any) => this.mainTown = town
            );

    }

    onSelect(event:any) {
        this.bestuur.type = event.target.value;
    }

    submit() {
        this._townService.putTown(this.mainTown).subscribe();
        this._router.navigate(['/', 'App', 'Budget', {town: this.mainTown.naam}]);

    }

    voegToe()
    {
        let b = new Bestuur(this.bestuur.naam, this.bestuur.type);
        this.mainTown.bestuur.push(b);
    }
    verwijder(id: number, b: Bestuur)
    {
        this.mainTown.bestuur.pop(b);
        this._townService.deleteBestuurslid(id).subscribe();
    }
}