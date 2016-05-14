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
        <div class="col-md-6" align="center">
            <h2 class="form-login-heading">Login</h2>
            

            <input type="email" [(ngModel)]="gebruiker.email" class="form-control" placeholder="Email" required autofocus><br>
            <input type="text" [(ngModel)]="gebruiker.Password" class="form-control" placeholder="Wachtwoord" required><br>

            <br>

            <button (click)="onSubmit()" class="btn btn-md btn-info btn-block">login</button>

            <!--
            <div class="alert alert-danger">
                {{data}}
            </div>
            -->

        </div>

        <div class="col-md-6" align="center">
            <h2 class="form-login-heading">Social Logins</h2>
            <p>Or you can login using one of the social logins below</p>

            <button class="btn btn-large btn-facebook btn-block" type="button" (click)="authExternalProvider('Facebook')"><i class="fa fa-facebook"></i> | Connect with Facebook</button>
            <button class="btn btn-large btn-google-plus btn-block" type="button" (click)="authExternalProvider('Google')"><i class="fa fa-google-plus"></i> | Connect with Google+</button>

        </div>


`,
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService,TownService
    ],
    styles: [`

    .form-login {
    max-width: 330px;
    padding: 0px 15px 5px 15px;
    margin: 0 auto;
}

    .form-login .form-login-heading {
        margin-bottom: 10px;
    }

    .form-login .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }

        .form-login .form-control:focus {
            z-index: 2;
        }

    .form-login input[type="password"] {
        margin-top:5px;
        margin-bottom: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }


    .btn-facebook {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #2b4b90;
  *background-color: #133783;
  background-image: -moz-linear-gradient(top, #3b5998, #133783);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3b5998), to(#133783));
  background-image: -webkit-linear-gradient(top, #3b5998, #133783);
  background-image: -o-linear-gradient(top, #3b5998, #133783);
  background-image: linear-gradient(to bottom, #3b5998, #133783);
  background-repeat: repeat-x;
  border-color: #133783 #133783 #091b40;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3b5998', endColorstr='#ff133783', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}

.btn-facebook:hover,
.btn-facebook:focus,
.btn-facebook:active,
.btn-facebook.active,
.btn-facebook.disabled,
.btn-facebook[disabled] {
  color: #ffffff;
  background-color: #133783;
  *background-color: #102e6d;
}

.btn-facebook:active,
.btn-facebook.active {
  background-color: #0d2456 \9;
}

    .btn-google-plus {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #d34332;
  *background-color: #c53727;
  background-image: -moz-linear-gradient(top, #dd4b39, #c53727);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#dd4b39), to(#c53727));
  background-image: -webkit-linear-gradient(top, #dd4b39, #c53727);
  background-image: -o-linear-gradient(top, #dd4b39, #c53727);
  background-image: linear-gradient(to bottom, #dd4b39, #c53727);
  background-repeat: repeat-x;
  border-color: #c53727 #c53727 #85251a;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffdd4b39', endColorstr='#ffc53727', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}

.btn-google-plus:hover,
.btn-google-plus:focus,
.btn-google-plus:active,
.btn-google-plus.active,
.btn-google-plus.disabled,
.btn-google-plus[disabled] {
  color: #ffffff;
  background-color: #c53727;
  *background-color: #b03123;
}

.btn-google-plus:active,
.btn-google-plus.active {
  background-color: #9a2b1f \9;
}


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