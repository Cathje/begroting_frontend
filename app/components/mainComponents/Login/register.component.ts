
import {Component, ChangeDetectorRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router'; // for routing
import {Observable} from 'rxjs/observable';
import {LoginService} from "../../../services/loginService.component";
import {IngelogdeGebruiker} from "../../../models/ingelogdeGebruiker";
import {MainTown} from "../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {InTeLoggenGebruiker} from "../../../models/inTeLoggenGebruiker";



@Component({ //invoke with metadata object
    selector: 'main-container',
    template: `
        <townMenu></townMenu>

        <div style="width:450px; margin:0 auto;">

            <h2 class="form-login-heading">Registreer</h2>
            <input type="text" [(ngModel)]="gebruiker.Naam" placeholder="Naam" class="form-control"><br>
            <input type="password" [(ngModel)]="gebruiker.Password" placeholder="Wachtwoord" class="form-control"><br>
            <input type="password" [(ngModel)]="gebruiker.bevestigPaswoord"  placeholder="Bevestig Wachtwoord" class="form-control"><br>
            <input type="email" [(ngModel)]="gebruiker.email"  placeholder="Email" class="form-control"><br>
             <div class=" styled-select slate right-align">
                    <select class="" (change)="onSelect($event)" class="form-control">
                        <option>Selecteer een gemeente</option>
                        <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option>
                    </select>
                </div>

            <br>

            <button (click)="onSubmit()" class="btn btn-md btn-info btn-bloc">Registreer</button>

            <div *ngIf="err" class="alert alert-danger">
                Registreren is niet gelukt!
            </div>


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
    err:any;

    constructor(private _loginService: LoginService, private _townService: TownService, private _router:Router)
    {
        _townService.getTowns()
            .subscribe((towns:any) => this.towns = towns);

    }
    onSubmit( )
    {
        this.err="";
        this._loginService.register(this.gebruiker).subscribe((data:any) => this.goToLogin(data),
            (err:any) => this.err = err);

    }

    goToLogin(data:any)
    {
        if(data != null)
        {
            sessionStorage.setItem("newUser","yes");
            this._router.navigate(['/', 'Login']);
        }
        else {
            sessionStorage.removeItem("newUser");
        }
    }


    onSelect(event: any) {
        // alert(event.target.value)
        this.gebruiker.gemeente = event.target.value;
    }
}