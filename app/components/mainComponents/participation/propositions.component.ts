import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ProjectService} from "../../../services/projectService.component";
import {Project} from "../../../models/project";
import {BegrotingsVoorstel} from "../../../models/begrotingsVoorstel";
import {ReactieOpVoorstel} from "../../../models/reactieOpVoorstel";
import {StyledDirective} from '../../../directives/styled';

@Component({
    selector: 'propositions-container',
    template: `
    <div class="container">
          <p class="alert alert-danger" *ngIf="!projects"><i>Er zijn geen projecten gevonden</i></p>
    <h2>Stem en/of geef reactie op een Begrotingsvoorstel</h2>
        <div class="section-content">
            <div class="panel-group" id="accordion">
                <div *ngFor="#project of projects #j=index" class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="{{'#'+project.titel}}">{{project.titel}}</a>
                          
                        </h4>
                      </div>
                  <div [id]=project.titel class="panel-collapse collapse in">
            <table class="table table-striped">
            <tbody>
            <tr *ngFor="#voorstel of project.voorstellen #i=index">
               <td><textarea readonly> {{voorstel.beschrijving}}</textarea></td>
               <td>{{voorstel.auteurNaam}}</td>
                <td>{{voorstel.aantalStemmen}}</td>
                <td>
                <span>Stem: </span><button class="btn btn-primary" (click)="stem(voorstel,j,i)" styled><span class="glyphicon glyphicon-thumbs-up"></span></button>
                </td>
                <td>
                    <table>
                    <tr *ngFor="#reactie of voorstel.reacties #i=index">
                        <td>{{reactie.email}}</td>
                        <td>{{reactie.beschrijving}}</td>
                        <td>{{reactie.reactieDatum}}</td>
                     </tr>
                     <!-- om de laatste reactie te tonen -->
                     <tr><td>{{voorstelreactie.email}}</td>
                        <td>{{voorstelreactie.beschrijving}}</td>
                        <td>{{voorstelreactie.reactieDatum}}</td></tr>
                        <td>
                        <textarea [(ngModel)]=projects[j].voorstellen[i].reactie></textarea>
                        <button (click)="post(j,i)">post</button>
                        </td>
                    </table>
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
    providers: [
        ProjectService
    ],
    directives: [StyledDirective],
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

export class PropositionsComponent
{
    projects: Project[]= [];
    data:number = 0;
    voorstelreactie:ReactieOpVoorstel = new ReactieOpVoorstel("","");


    constructor(
        private _routeParams: RouteParams, private _projectService: ProjectService)
    {
        this._projectService.getProjects("Gent").subscribe((pr:any) => this.projects = pr);
    }

    //@TODO  email toevoegen vanuit token als stemmer (datum toegevoegd op backend)
    stem(v: BegrotingsVoorstel,project:number, voorstel:number)
    {
        this._projectService.putStem(this.projects[project].voorstellen[voorstel].Id, sessionStorage.getItem('user')).subscribe((d:any) => this.data = d);

        setTimeout(function(){
            if(this.data != 0)
            {
                v.aantalStemmen +=1;
            }
        }, 1000);
    }
    post(project:number, voorstel:number)
    {
        this.voorstelreactie = new ReactieOpVoorstel(this.projects[project].voorstellen[voorstel].reactie,sessionStorage.getItem('user'));
        this._projectService.postReactie(this.projects[project].voorstellen[voorstel].Id, this.voorstelreactie).subscribe((d:any) => this.data = d);

        //@TODO zorgen dat de reactie direct op het scherm komt, opl nu is niet ok
       // this.projects[project].voorstellen[voorstel].reacties.push(this.voorstelreactie);
        this.projects[project].voorstellen[voorstel].reactie="";
    }


}