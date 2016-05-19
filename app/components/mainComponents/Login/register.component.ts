
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
        <h1>Register Pagina</h1>

        <div align="center">
            
            <p>Naam: </p>
            <input type="text" [(ngModel)]="gebruiker.Naam"><br>
            <p>Paswoord: </p>
            <input type="password" [(ngModel)]="gebruiker.Password"><br>
             <p>Bevestig Paswoord: </p>
            <input type="password" [(ngModel)]="gebruiker.bevestigPaswoord"><br>
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
            //sessionStorage.setItem("newUser","yes");
            this._router.navigate(['/', 'App','Login']);
        }
    }


    onSelect(event: any) {
        // alert(event.target.value)
        this.gebruiker.gemeente = event.target.value;
    }
}