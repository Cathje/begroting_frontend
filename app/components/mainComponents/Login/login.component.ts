/**
 * Created by nadya on 11/05/2016.
 */
/**
 * Created by nadya on 11/05/2016.
 */
import {Component, ChangeDetectorRef} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {Observable} from 'rxjs/observable';
import {TownService} from "../../../services/townService.component.js";
import {LoginService} from "../../../services/loginService.component.js";
import {IngelogdeGebruiker} from "../../../models/ingelogdeGebruiker.js";
import {MainTown} from "../../../models/mainTown.js";


@Component({ //invoke with metadata object
    selector: 'main-container',
    template: `
        <townMenu></townMenu>
        <h1>Login Pagina</h1>

        <div align="center">
            
            <p>Email: </p>
            <input type="email" [(ngModel)]="gebruiker.email"><br>
            <p>Paswoord: </p>
            <input type="text" [(ngModel)]="gebruiker.Password"><br>

            <br>

            <button (click)="onSubmit()">login</button>


        </div> 
    <br><br><br>

`,
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService,TownService
    ],
    styles: [`


`]
})
export class LoginComponent {
    title = 'Login';
    gebruiker = new IngelogdeGebruiker("Test","","","","");
    towns: MainTown [];
    selectedTown = new MainTown("Berchem","2600", 0,0);
    token:string="test";
    data:any;

    constructor(private _loginService: LoginService, private _townService: TownService)
    {
        _townService.getTowns()
            .subscribe((towns:any) => this.towns = towns);

    }
    onSubmit( )
    {
        this._loginService.login(this.gebruiker.email, this.gebruiker.Password).subscribe();

    }


    onSelect(event: any) {
        // alert(event.target.value)
        this.gebruiker.gemeente = event.target.value;
    }
}