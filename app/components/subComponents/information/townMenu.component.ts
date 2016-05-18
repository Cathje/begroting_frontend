import {Component} from 'angular2/core';
import {TownService} from './../../../services/townService.component';
import {TownSelectorComponent} from './../input/townSelector.component'
import {MainTown} from "./../../../models/mainTown";
import { ROUTER_DIRECTIVES } from 'angular2/router';


@Component({ //invoke with metadata object
    selector: 'townMenu',
    template: `
        <nav class="home-menu" >
                <div class="breadcrum" >
                <a [routerLink]="['Home']">Home</a>
                <a [routerLink]="['TownBudget']">Begrotingsvoorstel</a>
                </div>
                <h3>{{mainTown?.naam}}</h3>
                <town-selector></town-selector>              
        </nav>
         
        
        
`,
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    providers: [
        TownService,  //routing
    ],
    styles: [`
   
    .home-menu {
    padding: 1% 2% 0 2%; 
    background-color: #2ac7d2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    }

    h3 {
    margin: 0;
    padding-bottom: 1%;
    font-size: 3rem;
    }
    
    
    
`]
})

export class TownMenuComponent {
    mainTown = new MainTown("","");  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet



}