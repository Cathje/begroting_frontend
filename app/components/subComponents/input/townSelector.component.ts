import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from './../../../services/townService.component';
import {Town} from "../../../models/town";



@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `<div class="town-selector">
                 <div class=" styled-select slate right-align">
                    <select class="" [(ngModel)]="selectedTown" (change)="gotoHome($event)">
                        <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option> <!-- {{town.postCode}} -->
                    </select>
                </div>
    </div>`,
    providers: [TownService]
})

export class TownSelectorComponent {
    towns: Town [];
    selectedTown = new Town("Berchem","2600" );

    constructor( private _router: Router, private _townService: TownService)
    {
       this.towns = _townService.getTownsHC();
        
        //_townService.getTowns()
        //   .subscribe(towns => this.towns = towns); //
    }

    gotoHome(event: any) {
        this._router.navigate(['Town', { town: event.target.value}]);
    }
}