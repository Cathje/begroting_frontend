import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownSelectorComponent} from "../../subComponents/input/townSelector.component.js";
import {TownService} from "../../../services/townService.component.js";
import {PoliticusType} from "../../../models/politicusType";
import {MainTown} from "../../../models/mainTown";

@Component({ //invoke with metadata object
    selector: 'manage-data-container',
    template: `<h2>Beheer informatie</h2> <h2>Demografische gegevens</h2>
                        <h4>Aantal bewoners</h4>
                        <input type="number" [(ngModel)]="mainTown.aantalBewoners"/>

                        <h4>Aantal vrouwen</h4>
                        <input type="number" [(ngModel)]="mainTown.isVrouw"/>

                        <h4>Aantal mannen</h4>
                       <input type="number" [(ngModel)]="mainTown.isMan"/>

                        <h4>Aantal kinderen</h4>
                        <input type="number" [(ngModel)]="mainTown.isKind"/>
                        
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

  <h2>Geografische gegevens</h2>
  
                     <h4>Provincie:</h4>
                     <span>{{mainTown.provincie}}</span>

                     <h4>Oppervlakte:</h4>
                     <input type="number" [(ngModel)]="mainTown.oppervlakte"/>
                     <h4>Oppervlakte:</h4>
                     <input type="text" [(ngModel)]="mainTown.oppervlakteMaat"/>
                     
                    <h4>Deelgemeenten: </h4>
                        <ul *ngIf="mainTown?.deelGemeenten" >
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>
                   
                    <button (click)="submit()">opslaan</button>

`,
    providers: [TownService],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent]
})


export class ManageDataComponent {

    mainTown = new MainTown("","",0,0);
    // newBestuur:Bestuur = new Bestuur(""); // this gives an error
    types =  PoliticusType;
    selectedType:PoliticusType = PoliticusType.Schepen;
    keys: boolean;

    constructor( private _routeParams: RouteParams, private _townService: TownService, private _router:Router, params: RouteParams, injector: Injector)
    {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:any) => this.mainTown = town
            );

    }

    onSelect(event: any) {
        this.selectedType = event.target.value;
    }

    submit()
    {
        this._townService.putTown(this.mainTown).subscribe();
        this._router.navigate(['/', 'App','Budget', { town: this.mainTown.naam}]);

    }
}