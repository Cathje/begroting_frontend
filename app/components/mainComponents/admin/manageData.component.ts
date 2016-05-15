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
    <section class="col-xs-12 form-inline">
        <h3>Demografische gegevens</h3>
        <div class="col-xs-12 col-sm-6 form-group">
            <label >Aantal bewoners</label>
             <input class="form-control" type="number" [(ngModel)]="mainTown.aantalBewoners"/>
        </div>
        <div class="col-xs-12 col-sm-6  form-group">
           <label >Aantal vrouwen</label>
           <input  class="form-control" type="number" [(ngModel)]="mainTown.isVrouw"/>
        </div>
        <div class="col-xs-12 col-sm-6 form-group">
                        <label >Aantal mannen</label>
                       <input class="form-control" type="number" [(ngModel)]="mainTown.isMan"/>
        </div>
        <div class="col-xs-12 col-sm-6 form-group">
                        <label >Aantal kinderen</label>
                        <input class="form-control" type="number" [(ngModel)]="mainTown.isKind"/>
        </div>
    </section>

    <section class="col-xs-12 form-inline">
        <h3>Geografische gegevens</h3>
        <div class="col-xs-12 col-sm-11 form-group">
                     <label>Provincie:</label>
                     <span>{{mainTown.provincie}}</span>
        </div>
        <div class="col-xs-12 col-sm-6 form-group">
                     <label>Oppervlakte:</label>
                     <input  class="form-control" type="number" [(ngModel)]="mainTown.oppervlakte"/>
        </div>
        <div class="col-xs-12 col-sm-6 form-group">
                     <label >Oppervlaktemaat:</label>
                     <input class="form-control" type="text" [(ngModel)]="mainTown.oppervlakteMaat"/>
        </div>
        <div class="col-xs-12 form-group">
                    <label>Deelgemeenten: </label>
                        <ul *ngIf="mainTown?.deelGemeenten" >
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>

        </div>
    </section>
    <section class="col-xs-12">
        <h3>Bestuur</h3>
        <ul *ngIf="mainTown?.bestuur" >
           <li *ngFor="#b of mainTown.bestuur" >
           <button class="btn btn-sm btn-primary"(click)="verwijder(b.PoliticusId, b)" > - </button>
           <span>{{b.naam}} - {{types[b.type]}}  </span>
            </li>
        </ul>
        <p *ngIf="!mainTown.bestuur"><i>Er zijn geen gegevens over het bestuur</i></p>

        <h4> Voeg een bestuurslid toe:</h4>
        <div class="form-inline">
         <div class="form-group">
            <label >Naam:</label>
            <input class="form-control" type="text" [(ngModel)]="bestuur.naam"/>
        </div>
         <div class="form-group">
            <label for="exampleInputEmail2">Functie</label>
            <select class="form-control" (change)="onSelect($event)">
                <option>Geen functie</option>
                <option *ngFor="#t of types | keys" [value]="t.key">{{t.value}}</option>
            </select>
         </div>
         <button class="btn btn-primary" (click)="voegToe()"> + </button>
        </div>

    </section>
        <button class="btn btn-primary pull-right" (click)="submit()">opslaan</button>
</section>
`,
    providers: [TownService],
    pipes: [KeysPipe],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    styles: [`

    h3 {
        border-bottom: 1px solid lightgray;
        padding-bottom: 5px;
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
        box-sizing: border-box;
    }

    li {
        list-style: none;
        margin-bottom: 10px;
    }

    .btn-sm {
        margin-right: 15px;
    }

    section section {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        padding-top: 0px;
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
        console.log(this.mainTown);
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
        this.mainTown.bestuur.push(this.bestuur);
        console.log(this.mainTown.bestuur);
    }
    verwijder(id: number, b: Bestuur)
    {
        this.mainTown.bestuur.pop(b);
        this._townService.deleteBestuurslid(id).subscribe();
    }
}