import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from './../../../services/townService.component';
import {Town} from "../../../models/town";



@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `<div class="town-selector">
    <h3>{{title}}</h3>
                <div class="grid grid-pad styled-select slate">
                    <select class="" [(ngModel)]="selectedTown" (change)="gotoHome($event)">
                        <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option> <!-- {{town.postCode}} -->
                    </select>
                </div>
    </div>`,
    providers: [TownService]
})

export class TownSelectorComponent {
    title = 'Kies een gemeente';
    towns: Town [];
    selectedTown = new Town("Berchem","2600" );

    constructor( private _router: Router, private _townService: TownService)
    {
       // this.towns = _townService.getTownsHC();
        
        _townService.getTowns()
           .subscribe(towns => this.towns = towns); //
    }

    gotoHome(event: any) {
        let link = ['Town', { town: event.target.value}];
        this._router.navigate(link);
    }
}