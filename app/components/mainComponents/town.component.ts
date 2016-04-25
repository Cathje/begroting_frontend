import {Component} from 'angular2/core';
import {TownService} from './../../services/townService.component';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {TownSelectorComponent} from './../subComponents/input/townSelector.component'
import {MainTown} from "../../models/mainTown";
import {Town} from "../../models/town";

@Component({ //invoke with metadata object
    selector: 'home-container',
    template: `
        <div class="home-menu menu">
                <a [routerLink]="['Home']">Home</a>
                <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>
                <town-selector></town-selector>
        </div>
        <!-- @CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE h3 UIT COMMENTAAR ZETTEN --> 
       <!-- <h3>{{name}}</h3> --> 
       <h3>{{mainTown?.naam}}</h3>
       
       <!--test om te zien of deelgemeenten ook binnenkomen -->
       <div *ngIf="mainTown?.deelGemeenten" >
            <ul>
            <li *ngFor="#town of mainTown?.deelGemeenten">
            {{town.naam}}
            </li>
            </ul>
       </div>
        
        
       
`,
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    providers: [
        TownService,  //routing
    ],
    styles: [`
    town-selector{
float: right;

}

.home-menu {
    padding: 10px 20px 20px 30px;
    background-color: #2ac7d2;
}
`]
})

export class TownComponent {
    title = 'Gemeente - home';
    name:string = "";
    mainTown: MainTown;


    constructor(private _townService:TownService, private _routeParams:RouteParams)
    {
        
        _townService.getTown(this._routeParams.get('town'))
            .subscribe(town => this.mainTown = town
             );
    }

    ngOnInit() {
        /* @CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN 
        * EN DE SERVICE VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
        
        //this.name = this._routeParams.get('town');
    }
}