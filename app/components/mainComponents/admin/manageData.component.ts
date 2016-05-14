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
<div>
                        <label class="col-xs-12 col-sm-3">Aantal bewoners</label>
                        <input class="col-xs-12 col-sm-3"type="number" [(ngModel)]="mainTown.aantalBewoners"/>
</div>
<div>
                        <label class="col-xs-12 col-sm-3">Aantal vrouwen</label>
                        <input class="col-xs-12 col-sm-3" type="number" [(ngModel)]="mainTown.isVrouw"/>
</div>
<div>
                        <label class="col-xs-12 col-sm-3">Aantal mannen</label>
                       <input class="col-xs-12 col-sm-3" type="number" [(ngModel)]="mainTown.isMan"/>
</div>
<div>
                        <label class="col-xs-12 col-sm-3">Aantal kinderen</label>
                        <input class="col-xs-12 col-sm-3" type="number" [(ngModel)]="mainTown.isKind"/>
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
  <h2>Geografische gegevens</h2>
  <div>
                     <label class="col-xs-12 col-sm-3">Provincie:</label>
                     <span class="col-xs-12 col-sm-3">{{mainTown.provincie}}</span>
</div>
<div>
                     <label class="col-xs-12 col-sm-3">Oppervlakte:</label>
                     <input class="col-xs-12 col-sm-3" type="number" [(ngModel)]="mainTown.oppervlakte"/>
                     </div><div>
                     <label class="col-xs-12 col-sm-3">Oppervlaktemaat:</label>
                     <input class="col-xs-12 col-sm-3" type="text" [(ngModel)]="mainTown.oppervlakteMaat"/>
                     </div>
                     <div>
                    <label class="col-xs-12 col-sm-3">Deelgemeenten: </label>
                        <ul *ngIf="mainTown?.deelGemeenten" >
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>
                   </div>
                    <button class="btn btn-primary pull-xs-right" (click)="submit()">opslaan</button>
                    </section>
</section>
`,
    providers: [TownService],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    styles: [`
    label{
        text-align: left;
    }
    section div {
        margin: 5px;
    }
    section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: left;
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