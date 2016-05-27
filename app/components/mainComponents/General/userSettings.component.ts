import {Component, Injector} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';
import {IngelogdeGebruiker} from "../../../models/ingelogdeGebruiker";
import {MainTown} from "../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {rolType} from "../../../models/rolType";

@Component({
    selector: 'overview-container',
    template: `
        <div class="overview-container">
            <div class="container">
				<div style="width:450px; margin:0 auto;">

					<h2 class="form-login-heading">Pas uw gemeente aan voor {{gebruiker.email}}</h2>
					<p>Je huidige gemeente is: {{gemeente}}</p>
					<br/>
					<p>kies een nieuwe gemeente:</p>
					<div class=" styled-select slate right-align">
							<select class="" (change)="onSelect($event)" class="form-control">
								<option selected disabled></option>
								<option *ngFor="#town of towns" [value]="town.naam">{{town.naam}}</option>
							</select>
					</div>

					<br>

					<button (click)="onSubmit()" class="btn btn-md btn-info btn-bloc">Opslaan</button>
				</div>
			</div>
		</div>
`,
    directives: [ROUTER_DIRECTIVES],
    providers: [TownService],
    styles: [`

`]
})

export class UserSettingsComponent {

    gemeente:string;
    nieuweGemeente:string;
    email:string;
    err:any;

    constructor(private _townService:TownService, private _router:Router) {
        _townService.getTowns()
            .subscribe((towns:any) => this.towns = towns);
        this.gemeente = sessionStorage.getItem('gemeente');
        this.email = sessionStorage.getItem('user');
    }

    onSubmit()
    {
        this._loginService.putGebruiker(this.email, this.nieuweGemeente).subscribe();
        this._router.navigate(['/', 'App',{ town: this.nieuweGemeente}, 'Budget']);
    }

    onSelect(event:any) {
        this.nieuweGemeente = event.target.value;
    }

}