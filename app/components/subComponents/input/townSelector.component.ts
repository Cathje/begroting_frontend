import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {TownService} from './../../../services/townService.component';
import {MainTown} from "../../../models/mainTown";



@Component({ //invoke with metadata object
    selector: 'town-selector',
    template: `
                 <div class=" styled-select slate right-align">
                    <select class="" (change)="gotoHome($event)">
                        <option>Selecteer een gemeente</option>
                        <option *ngFor="#town of towns" [value]="town.GemeenteID">{{town.naam}} </option>
                    </select>
                </div>
    `,
    providers: [TownService],
    styles:[`
.slate{
    text-align: center;
    color:black;
}

.styled-select {
    overflow: hidden;
    width: 240px;
    margin: 0 auto;
}

.styled-select select {
    background: url(./app/images/arrow_down.png) no-repeat right rgba(255,255,255, 0.6);
    background-size: 35px 35px;
    border: none;
    font-size: 14px;
    height: 29px;
    padding: 5px; /* If you add too much padding here, the options won't show in IE */
    width: 240px;
}

select::-ms-expand {
    display: none;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}

      `,]
})

export class TownSelectorComponent {
    towns: MainTown [];
    selectedTown = new MainTown("Berchem","2600", 0);

    constructor( private _router: Router, private _townService: TownService)
    {
       //this.towns = _townService.getTownsHC();

        _townService.getTowns()
           .subscribe(towns => this.towns = towns); 
    }

    gotoHome(event: any) {
       // alert(event.target.value)
      this._router.navigate(['MainTown', { id: event.target.value}]);
    }
}