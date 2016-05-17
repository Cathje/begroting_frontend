import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Project} from "../../../models/project.js";

@Component({ //invoke with metadata object
    selector: 'overview-propositions-container',
    template: `
    <div class="container">
    <h2>Overzicht voorstellen</h2>

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
            <tr *ngFor="#project of projects.antwoorden">
                <td>{{project.naam}}</td>
                <td>{{project.email}}</td>
                <td>
                <select class="form-control" [ngModel]=gebruiker.rol >
                    <option>admin</option>
                    <option>moderator</option>
                </select>
                </td>
                <td>
                <input type="checkbox" [ngModel]=project.status>
                </td>
                <td>
                    <button class="btn btn-primary" (click)="verwijder(gebruiker.email, gebruiker)"><span class="glyphicon glyphicon-trash"></span></button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    `
})

export class OverviewPropositionsComponent {

    projects: Project[]= [];

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}