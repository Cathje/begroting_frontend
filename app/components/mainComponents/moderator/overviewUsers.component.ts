import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownSelectorComponent} from "../../subComponents/input/townSelector.component";
import {TownService} from "../../../services/townService.component";
import {LoginService} from "../../../services/loginService.component";
import {PoliticusType} from "../../../models/politicusType";
import {MainTown} from "../../../models/mainTown";
import {IngelogdeGebruiker} from "../../../models/ingelogdeGebruiker";
import {KeysPipe} from "../../../pipes/keysPipe";
import {rolType} from "../../../models/rolType";


@Component({ //invoke with metadata object
    selector: 'overview-users-container',
    template: `
    <p *ngIf="errorMessage">Geen gebruikers gevonden voor deze gemeente</p>
    <section class="container" *ngIf="!errorMessage">
    <h1>Overzicht gebruikers</h1>
    <section class="col-xs-12">
        <div class="section-content">
        <p *ngIf="!gebruikers"><i>Er zijn geen gebruikers gevonden</i></p>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>Naam</th>
                <th>E-mail</th>
                <th>Rol</th>
                <th>Actief?</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="#gebruiker of gebruikers #i=index">
                <td>{{gebruiker.naam}}</td>
                <td>{{gebruiker.email}}</td>
                <td>
                <select (change)="onSelectRolType($event, i)">
                    <option *ngFor="#rol of rolTypes | keys" [value]="rol.key">{{rol.value}}</option>
                </select>
                </td>
                <td>
                <input type="checkbox" [ngModel]=gebruiker.isActief checked={{gebruiker.isActief}}>
                </td>
            </tr>
            </tbody>
        </table>


        </div>
    </section>

        <button class="btn btn-primary pull-right" (click)="submit()">opslaan</button>
</section>
`,
    providers: [TownService, LoginService],
    pipes: [KeysPipe],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],
    styles: [`

    label{
        text-align: left;
        width: 120px;
        background-color:white;
    }
    section div {
        padding: 5px;
        box-sizing: border-box;
    }

    .input-group {
        float: left;
        box-sizing: border-box;
    }

    li {
        list-style: none;
        margin-bottom: 10px;
    }

    .form-inline:nth-child(2) {
        border-top: 1px dashed lightgray;
    }

    section .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        overflow: auto;
    }

    textarea {
        width: 100% !important;
    }

    `]
})


export class OverviewUsersComponent {

    mainTown = new MainTown("", "", 0, 0);
    errorMessage: any;
    rolTypes = rolType;
    gebruikers: IngelogdeGebruiker[] = [];
    gebruikersOrigineel : IngelogdeGebruiker[]=[];

    constructor(private _routeParams:RouteParams, private _townService:TownService, private _loginService:LoginService, private _router:Router, params:RouteParams, injector:Injector) {
        
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:any) => this.mainTown = town,
                (err:any) => this.errorMessage = err
            );

        _loginService.getGebruikers(injector.parent.parent.get(RouteParams).get('town')).subscribe(
            (gebrs:any) => this.gebruikers = gebrs,
            (err:any) => this.errorMessage = err
        );
    }

    onSelectRolType(event: any, i : any)
    {
        this.gebruikers[i].rolType = event.target.value;
    }


    submit() {
        this._loginService.putGebruikers().subscribe(); // nog aan te passen

        this._router.navigate(['/', 'App', 'Budget', {town: this.mainTown.naam}]);

    }
}