import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS} from "angular2/http";

import {HomeRouter} from './components/mainComponents/homeRouter';
import {LoginComponent} from "./components/mainComponents/login/login.component";
import {RegisterComponent} from "./components/mainComponents/login/register.component";

@Component({
    selector: 'begroting-app',
    template: `
    <div class="menu">
        <img class="logo" src="/app/images/logo.png"/>
        <div class="right-menu">
        <style>
            .btn-primary { background-color: red;}
        </style>
        <span  id="social">
            <span> Deel deze website</span>
            <!-- twitter-->
             <a href="http://twitter.com/share?url=http://begrotingwebapi.azurewebsites.net&text=De begroting: Ik doe mee!" 
            target="_blank" class="btn-social">
            <img src="/app/images/social_media/twitter.jpg" width="40px" height="40px" border="0" >
            </a>
              <!-- Facebook -->
            <a href="http://www.facebook.com/sharer/sharer.php?u=http://begrotingwebapi.azurewebsites.net" 
            target="_blank" class="btn-social">
            <img src="/app/images/social_media/facebook.jpg" width="40px" height="40px">
            </a>
    
            <!-- LinkedIn -->
            <a href="http://www.linkedin.com/shareArticle?url=http://begrotingwebapi.azurewebsites.net&title=De%20Begroting:%20Ik20doe20mee!&summary=De%20Begroting:%20Ik20doe20mee!&source=http://begrotingwebapi.azurewebsites.net" 
            target="_blank" class="btn-social">
            <img src="/app/images/social_media/linkedin.jpg" width="40px" height="40px">
            </a>
            
               <!-- Google Plus -->
            <a href="https://plus.google.com/share?url=http://begrotingwebapi.azurewebsites.net" target="_blank"
            class="btn-social">
                <img src="/app/images/social_media/googlePlus.jpg" width="40px" height="40px">
            </a>
        </span>

        <span id="registration">
            <a [routerLink]="['Register']">Registreer</a>|
            <a [routerLink]="['Login']">Log in</a>
        </span>
        </div>
    </div>
                <router-outlet></router-outlet>    
                `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS],
    styles: [`

    .menu {
        background-color: black;
        color: white;
        padding: 20px;
        text-align: left;
    }

    .logo {
        width: 150px;
        margin: 0 auto;
    }

    .right-menu {
        margin-top: 40px;
        float: right;
        color: white;
    }

    #social span{
        padding-right: 10px;
    }

    .btn-social img {
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }

    #registration a {
        padding:10px;
    }

    @media screen and (max-width: 768px) {
        .right-menu {
            margin-top: 0;;
            float: none;
        }

        #social, #registration{
            display: inline-block;
        }

        #registration {
            float:right
        }
    }

    @media screen and (max-width: 420px) {
        #social {
            display: none;
        }

        #registration {
            float: none;
            margin-left: 0;
        }

        #registration a {
            padding-left: 0;
        }
    }

    `]
})

@RouteConfig([
    {path: '/...', name: 'App', component: HomeRouter},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/register', name: 'Register', component: RegisterComponent}
])

export class AppComponent {
    colorme = "red";
}