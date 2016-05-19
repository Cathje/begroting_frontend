import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownSelectorComponent} from "../../subComponents/input/townSelector.component";
import {TownService} from "../../../services/townService.component";
import {PoliticusType} from "../../../models/politicusType";
import {MainTown} from "../../../models/mainTown";
import {Bestuur} from "../../../models/bestuur";
import {KeysPipe} from "../../../pipes/keysPipe";

@Component({ //invoke with metadata object
    selector: 'manage-data-container',
    template: `
    <p *ngIf="errorMessage">Deze gemeente is niet gekend</p>
<section class="container" *ngIf="!errorMessage">
    <h1>Beheer informatie</h1>
    <section class="col-xs-12 form-inline">
        <h3>Demografische gegevens</h3>
        <div class="section-content">
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
        </div>
    </section>

    <section class="col-xs-12 form-inline">
        <h3>Geografische gegevens</h3>
        <div class="section-content">
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
        </div>
    </section>
    <section class="col-xs-12">
        <h3>Bestuur</h3>
        <div class="section-content">
        <div class="form-inline">
        <ul *ngIf="mainTown?.bestuur" >
           <li *ngFor="#b of mainTown.bestuur" >
           <button class="btn btn-primary"(click)="verwijder(b.PoliticusId, b)" ><span class="glyphicon glyphicon-trash"></span></button>
           <span>{{b.naam}} - {{types[b.type]}}  </span>
            </li>
        </ul>
        <p *ngIf="!mainTown.bestuur"><i>Er zijn geen gegevens over het bestuur</i></p>
        </div>

        <div class="form-inline">
         <button class="btn btn-primary" (click)="voegToe()"><span class="glyphicon glyphicon-plus"></span></button>
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
        </div>
        </div>
    </section>
    <section class="col-xs-12 form-inline">
        <h3> Extra informatie over projecten </h3>
        <div class="section-content">
        <h4> Voeg hieronder extra informatie toe over toekomstige projecten en/of projecten uit het verleden </h4>
                <div class="col-xs-12 col-md-6 form-group">
                     <label>Jaar:</label>
                     <input  class="form-control" type="number" [(ngModel)]="year"/>
               </div>

                <div class="col-xs-12 form-group">
                    <label>Informatie:</label>
                    <textarea class="form-control" rows="2" [(ngModel)]="information"></textarea>
                </div>
        </div>
    </section>
        <button class="btn btn-primary pull-right" (click)="submit()">opslaan</button>
</section>
`,
    providers: [TownService],
    pipes: [KeysPipe],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    styles: [`

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

    .form-inline:nth-child(2) {
        border-top: 1px dashed lightgray;
    }

    section .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        overflow: auto;
    }

    textarea {
        width: 100% !important;
    }

    `]
})


export class ManageDataComponent {

    mainTown = new MainTown("", "", 0, 0);
    types = PoliticusType;
    keys:boolean;
    errorMessage: any;
    bestuur: Bestuur = new Bestuur("", null);

    constructor(private _routeParams:RouteParams, private _townService:TownService, private _router:Router, params:RouteParams, injector:Injector) {
        
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:any) => this.mainTown = town,
                (err:any) => this.errorMessage = err
            );
    }

    onSelect(event:any) {
        this.bestuur.type = event.target.value;
    }

    submit() {
        //TODO: extra info over projecten moet ook bewaard worden in de databank
        this._townService.putTown(this.mainTown).subscribe();
        this._router.navigate(['/', 'App', 'Budget', {town: this.mainTown.naam}]);

    }

    voegToe()
    {

        this.mainTown.bestuur.push(new Bestuur(this.bestuur.naam, this.bestuur.type));
        console.log(this.mainTown.bestuur);
    }
    verwijder(id: number, b: Bestuur)
    {
        //@TODO geeft in code een error maar werkt --> ??
        this.mainTown.bestuur.pop(b);
        if(id != 0)
        {
            this._townService.deleteBestuurslid(id).subscribe();
        }

    }
}