import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Project} from "../../../models/project";

@Component({ //invoke with metadata object
    selector: 'overview-propositions-container',
    template: `
    <div class="container">
        <h2>Overzicht voorstellen</h2>
        <p *ngIf="!projects"><i>Er zijn geen projecten gevonden</i></p>

        <div class="section-content">
            <div class="panel-group" id="accordion">
                <div *ngFor="#project of projects" class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="{{'#'+project.naam}}">{{project.naam}}</a>
                        </h4>
                      </div>
                  <div [id]=project.naam class="panel-collapse collapse in">
            <table class="table table-striped">
            <tbody>
            <tr *ngFor="#antwoord of project.antwoorden">
                <td><textarea> {{antwoord.naam}}</textarea></td>
                <td>
                <button class="btn btn-primary approve" (click)="approve(gebruiker.email, gebruiker)"><span class="glyphicon glyphicon-thumbs-up"></span></button>
                <button class="btn btn-primary disapprove" (click)="disapprove(gebruiker.email, gebruiker)"><span class="glyphicon glyphicon-thumbs-down"></span></button>
                </td>
            </tr>
            </tbody>
        </table>
                  </div>

                </div>
            </div>
        </div>

    </div>
    `,
    styles : [`
        .panel-heading {
            background-color: #2ac7d2;
        }

        .approve{
            background-color: #d0d257 !important;
            border: none;
        }

        .disapprove{
            background-color: #f7baba !important;
            border: none;
        }

        tr {
            display: flex;
            justify-content: center;
        }

        td:nth-child(1){
            flex: 1 1 auto;
        }

        td:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `]
})

export class OverviewPropositionsComponent {

    projects: Project[]= [{naam: "Project1", antwoorden: [{naam: "Antwoord1", status:"afgekeurd"}, {naam: "Antwoord1", status:"goedgekeurd"}]}, {naam: "Project2"}];

    constructor(
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}