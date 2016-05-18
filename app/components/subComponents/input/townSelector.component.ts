import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from "../../../services/townService.component";
import {MainTown} from "../../../models/mainTown";



@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `
                 <div class=" styled-select slate right-align">
                    <select class="" (change)="gotoHome($event)">
                        <option>Selecteer een gemeente</option>
                        <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option>
                    </select>
                </div>
    `,
    providers: [TownService],
    styles:[`

      `,]
})

export class TownSelectorComponent {
    towns: MainTown [];
    selectedTown = new MainTown("Berchem","2600", 0,0);

    constructor( private _router: Router, private _townService: TownService)
    {
       //this.towns = _townService.getTownsHC();

        _townService.getTowns()
           .subscribe((towns:any) => this.towns = towns);



    }

    gotoHome(event: any) {
       // alert(event.target.value)
      this._router.navigate(['/', 'App','Budget', { town: event.target.value}]);
    }
}