/**
 * Created by nadya on 10/05/2016.
 */
import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownService} from "../../../services/townService.component.js";
import {MainTown} from "../../../models/mainTown.js";
import {Bestuur} from "../../../models/bestuur.js";
import {PoliticusType} from "../../../models/politicusType.js";
import {TownSelectorComponent} from "../../subComponents/input/townSelector.component.js";

@Component({ //invoke with metadata object
    selector: 'manage-town-container',
    template: `
    <div class="container">
<h2>Isntellingen gemeente</h2>


</div>
`,
    providers: [TownService],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent]
})

export class ManageTownComponent {

    mainTown = new MainTown("","",0,0);
    // newBestuur:Bestuur = new Bestuur(""); // this gives an error
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