
import {Component, ChangeDetectorRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router'; // for routing
import {Observable} from 'rxjs/observable';
import {LoginService} from "../../../services/loginService.component";
import {IngelogdeGebruiker} from "../../../models/ingelogdeGebruiker";
import {MainTown} from "../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {SignInService} from "../../services/SignInService";
import {InTeLoggenGebruiker} from "../../../models/inTeLoggenGebruiker";



@Component({ //invoke with metadata object
    selector: 'main-container',
    template: `
        <townMenu></townMenu>
        <h1>Register Pagina</h1>

        <div align="center">
            
            <p>Naam: </p>
            <input type="text" [(ngModel)]="gebruiker.Naam"><br>
            <p>Paswoord: </p>
            <input type="text" [(ngModel)]="gebruiker.Password"><br>
             <p>Bevestig Paswoord: </p>
            <input type="text" [(ngModel)]="gebruiker.bevestigPaswoord"><br>
            <p>Email: </p>
            <input type="email" [(ngModel)]="gebruiker.email"><br>
             <div class=" styled-select slate right-align">
                    <select class="" (change)="onSelect($event)">
                        <option>Selecteer een gemeente</option>
                        <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option>
                    </select>
                </div>

            <br>

            <button (click)="onSubmit()">Register</button>


        </div> 
    <br><br><br>

`,
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService,TownService
    ],
    styles: [`


`]
})
export class RegisterComponent {
    title = 'Register';
    gebruiker = new InTeLoggenGebruiker("","","","","");
    towns: MainTown [];
    selectedTown = new MainTown("Berchem","2600", 0,0);
    token:string="test";
    data:any;

    constructor(private _loginService: LoginService, private _townService: TownService, private _router:Router)
    {
        _townService.getTowns()
            .subscribe((towns:any) => this.towns = towns);

    }
    onSubmit( )
    {
        this._loginService.register(this.gebruiker).subscribe();
        this._router.navigate(['/', 'App','Budget', { town: this.gebruiker.gemeente}]);

    }


    onSelect(event: any) {
        // alert(event.target.value)
        this.gebruiker.gemeente = event.target.value;
    }
}