/**
 * Created by nadya on 10/05/2016.
 */
import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownService} from "../../services/townService.component";
import {MainTown} from "../../models/mainTown";
import {Bestuur} from "../../models/bestuur";
import {PoliticusType} from "../../models/politicusType";
import {NavigationMenuComponent} from "../subComponents/nav/menu.component";
import {TownSelectorComponent} from "../subComponents/input/townSelector.component";

@Component({ //invoke with metadata object
    selector: 'Town-container',
    template: `
<navigation-menu></navigation-menu>
<h2>Beheer gegevens</h2>

 <h2>Demografische gegevens</h2>
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
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent, NavigationMenuComponent]
})

export class ManageTownComponent {

    mainTown = new MainTown("","",0,0);
    newBestuur:Bestuur = new Bestuur("");
    types =  PoliticusType;
    selectedType:PoliticusType = PoliticusType.Schepen;
    _townService:TownService;
    keys: boolean;

    constructor( private _routeParams: RouteParams, _townService: TownService, private _router:Router)
    {
        _townService.getTown(_routeParams.get('town'))
           .subscribe(town => this.mainTown = town
           );

        this._townService = _townService;
      //  alert(_routeParams.get('town'));
    }

    onSelect(event: any) {
        this.selectedType = event.target.value;
    }

    submit()
    {
        this._townService.putTown(this.mainTown).subscribe();
        this._router.navigate(['MainTown', { town: this.mainTown.naam}]);

    }
}