import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {TownService} from "../../../services/townService.component";
import {MainTown} from "../../../models/mainTown";

@Component({
    selector: 'town-selector',
    template: `
                 <div class=" styled-select slate">
                    <select class="" (change)="gotoHome($event)">
                        <option>Selecteer een gemeente</option>
                        <option *ngFor="#town of towns">{{town.naam}} - {{town.postCode}}</option>
                    </select>
                </div>
    `,
    providers: [TownService]
})

export class TownSelectorComponent {
    towns: MainTown[];

    constructor( private _router: Router, private _townService: TownService)
    {
        _townService.getTowns()
           .subscribe((towns:MainTown[]) => this.towns = towns.sort(function(a, b){
               const nameA=a.naam.toLowerCase(),
                     nameB=b.naam.toLowerCase();
               if (nameA < nameB)
                   return -1;
               if (nameA > nameB)
                   return 1;
               return 0;
           }))
    }

    gotoHome(event: any) {
      this._router.navigate(['/', 'App','Budget', { town: event.target.value}]);
    }
}
