import {Component} from 'angular2/core';
import {HomeComponent} from './components/mainComponents/home.component';
import {TownComponent} from './components/mainComponents/town.component';
import {ProjectComponent} from './components/mainComponents/project.component';
import {AddProjectComponent} from './components/mainComponents/addProject.component';
import {TownBudgetComponent} from './components/mainComponents/townBudget.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";

@Component({ //invoke with metadata object
    selector: 'begroting-app',
    template: `
    <div class="menu">
        <img class="logo" src="./app/images/logo.png"/>
        <span class="pull-xs-right">
            <a class="signIn"[routerLink]="['Home']">Sign in</a>|
            <a class="signIn" [routerLink]="['Home']">Log in</a>
        </span>
        
        <span class="pull-xs-right" id="social">
        
            <span id="titelSocial"> Deel deze website</span>
            <!-- twitter-->
             <a href="http://twitter.com/share?url=http://begrotingwebapi.azurewebsites.net&text=De begroting: Ik doe mee!" 
            target="_blank" class="socialBtn">
            <img src="./app/images/social_media/twitter.jpg" width="40px" height="40px" border="0" >
            </a>
              <!-- Facebook -->
            <a href="http://www.facebook.com/sharer/sharer.php?u=http://begrotingwebapi.azurewebsites.net" 
            target="_blank" class="socialBtn">
            <img src="./app/images/social_media/facebook.jpg" width="40px" height="40px">
            </a>
    
            <!-- LinkedIn -->
            <a href="http://www.linkedin.com/shareArticle?url=http://begrotingwebapi.azurewebsites.net&title=De%20Begroting:%20Ik20doe20mee!&summary=De%20Begroting:%20Ik20doe20mee!&source=http://begrotingwebapi.azurewebsites.net" 
            target="_blank" class="socialBtn">
            <img src="./app/images/social_media/linkedin.jpg" width="40px" height="40px">
            </a>
            
               <!-- Google Plus -->
            <a href="https://plus.google.com/share?url=http://begrotingwebapi.azurewebsites.net" target="_blank"
            class="socialBtn">
                <img src="./app/images/social_media/googlePlus.jpg" width="40px" height="40px">
            </a>
        </span>
    </div>
                <router-outlet></router-outlet>    
                `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, HTTP_PROVIDERS ], //routing    ],
    styles: [`.menu {
    background-color: black;
    color:white;
    padding: 20px;
    text-align: left;
}

.logo {
    width: 150px;
    margin: 0 auto;

}
#social:last-child {
padding-right: 3%;
}
#titelSocial{
padding-right: 10px;
}

.socialBtn:hover{
text-decoration: none;
}

.socialBtn img {
border-radius: 50%;
}

.signIn  {
    color:white;
    padding:10px;
}

`]
})

@RouteConfig([
    { path: '/', name: 'Home', component:HomeComponent },
    { path: '/:town', name: 'MainTown', component:TownComponent },
    { path: '/:town/:projectNumber', name: 'Project', component:ProjectComponent },
    { path: '/:town/addProject', name: 'AddProject', component:AddProjectComponent },
    { path: '/townBudget', name: 'TownBudget', component:TownBudgetComponent }
])

export class AppComponent {
    title = 'Begroting Vlaanderen';
}