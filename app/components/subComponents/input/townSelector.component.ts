import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from './../../../services/townService.component';


@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `<div class="town-selector">
    <h3>{{title}}</h3>
                <div class="grid grid-pad styled-select slate">
                    <select class="" [(ngModel)]="selectedTown" (change)="gotoHome($event)">
                        <option *ngFor="#town of towns" [value]="town.name">{{town.name}} - {{town.postalCode}}</option>
                    </select>
                </div>
    </div>`,
    providers: [TownService]
})

export class TownSelectorComponent {
    title = 'Kies een gemeente';
    towns = this._townService.getTowns();
    selectedTown = { 'name':'Berchem' };

    constructor(
        private _router: Router,
        private _townService: TownService) {
    }

    gotoHome(event: any) {
        let link = ['Town', { town: event.target.value}];
        this._router.navigate(link);
    }
}
