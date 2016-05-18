import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'; // for routing
import {HTTP_PROVIDERS} from "angular2/http";
import {ProjectsComponent} from './projects.component';
import {PropositionsComponent} from './propositions.component';
import {AddPropositionComponent} from "./addProposition.component";

@Component({
    selector: 'participation-router',
    template: ` <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/projects', name: 'Projects', component:ProjectsComponent, useAsDefault:true },
    { path: '/propositions', name: 'Propositions', component:PropositionsComponent},
    { path: '/addProposition', name: 'AddPropositions', component:AddPropositionComponent}
])

export class ParticipationRouter {
}

