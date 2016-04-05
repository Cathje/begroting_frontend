import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from './../../../services/townService.component';


@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `<h3>{{title}}</h3>
                <div class="grid grid-pad">
                    <div *ngFor="#town of towns" (click)="gotoHome(town)" class="col-1-4">
                        <div>
                        <h4>{{town.name}}</h4>
                        </div>
                    </div>
                </div>`,
    providers: [TownService]
})

export class TownSelectorComponent {
    title = 'Kies een gemeente';
    towns = this._townService.getHeroes();

    constructor(
        private _router: Router,
        private _townService: TownService) {
    }

    gotoHome(town: any) {
        let link = ['Town', { town: town.name }];
        this._router.navigate(link);
    }
}
