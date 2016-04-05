import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from './../../../services/townService.component';


@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `<h3>{{title}}</h3>
                <div class="grid grid-pad">
                    <select [(ngModel)]="selectedTown" (change)="gotoHome($event)">
                        <option *ngFor="#town of towns" [value]="town.name">{{town.name}}</option>
                    </select>
                </div>`,
    providers: [TownService]
})

export class TownSelectorComponent {
    title = 'Kies een gemeente';
    towns = this._townService.getHeroes();
    selectedTown = { 'name':'Berchem' };

    constructor(
        private _router: Router,
        private _townService: TownService) {
    }

    gotoHome(event: Event) {

        let link = ['Town', { town: event.target.value}];
        this._router.navigate(link);
    }
}
