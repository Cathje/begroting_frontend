import {Component, Injector} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';
import {IngelogdeGebruiker} from "../../../models/ingelogdeGebruiker";
import {MainTown} from "../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {LoginService} from "../../../services/loginService.component";
import {rolType} from "../../../models/rolType";

@Component({
    selector: 'overview-container',
    template: `
        <div class="overview-container">
            <div class="container form-inline">
                    <h1>Instelingen gebruiker </h1>
					<h3>Pas uw gemeente aan voor {{email}}</h3>
					<p>Je huidige gemeente is: {{gemeente}}</p>
					<label>kies een nieuwe gemeente:</label>
					<div class="form-control">
                        <div class="styled-select">
                                <select (change)="onSelect($event)">
                                    <option selected disabled></option>
                                    <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}}</option>
                                </select>
                        </div>
					</div>
					<button (click)="onSubmit()" class="btn btn-primary pull-right">Opslaan</button>
			</div>
		</div>
`,
    directives: [ROUTER_DIRECTIVES],
    providers: [TownService, LoginService],
    styles: [`
        .form-control {
            border:none;
            padding:0;
        }

`]
})

export class UserSettingsComponent {

    gebruiker  = new IngelogdeGebruiker("","","",rolType.standaard,true);
    gemeente:string;
    nieuweGemeente:string;
    email:string;
    err:any;
    towns: MainTown [];

    constructor(private _townService:TownService, private _router:Router,private _loginService : LoginService) {
        _townService.getTowns()
            .subscribe((towns:any) => this.towns = towns);
        this.gemeente = sessionStorage.getItem('gemeente');
        this.email = sessionStorage.getItem('user');
        this.nieuweGemeente = this.gemeente;
        this.gebruiker.userId = this.email;
        this.gebruiker.gemeente = this.gemeente;
        this.gebruiker.naam = sessionStorage.getItem('naam');
    }

    onSubmit()
    {
        this.gemeente = this.nieuweGemeente;
        sessionStorage.setItem('gemeente',this.nieuweGemeente);
        this._loginService.putGebruiker(this.gebruiker).subscribe();
        this._router.navigate(['/', 'App',{ town: this.nieuweGemeente}, 'Budget']);
    }

    onSelect(event:any) {
        this.nieuweGemeente = event.target.value;
        this.gebruiker.gemeente = this.nieuweGemeente;
    }

}