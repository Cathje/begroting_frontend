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
          <p class="alert alert-danger" *ngIf="!projects"><i>{{errorMessage}}</i></p>
        <h2>Stem en/of geef reactie op een Begrotingsvoorstel</h2>

        <section>
         <div class="panel-group" id="accordion">
          <div class="panel panel-default" *ngFor="#project of projects #j=index" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="{{'#'+project.id}}">{{project.titel}}</a>
              </h4>
            </div>
            <div [id]="project.id" class="panel-collapse collapse in">
              <div class="panel-body no-padding">
                    <div class="" *ngFor="#voorstel of project.voorstellen #i=index">
                        <div class="panel-group" id="{{'accordion-sub'+(i+1)}}">
                          <div class="panel panel-default">
                            <div class="panel-heading proposition">
                              <h4 class="panel-title prop-title">
                                <a data-toggle="collapse" [attr.data-parent]="'#accordion-sub'+(i+1)" href="{{'#'+(i+1)}}">
                                <span class="glyphicon glyphicon-tasks"></span>
                                {{voorstel.beschrijving}} <i>gepost door {{voorstel.auteurNaam}}</i>
                                </a>
                                <span>{{voorstel.aantalStemmen}}</span>
                                <span>
                                 <button class="btn btn-primary" (click)="stem(voorstel,j,i)" styled><span class="glyphicon glyphicon-thumbs-up"></span></button>
                                </span>
                              </h4>
                            </div>
                            <div [id]="(i+1)" class="panel-collapse collapse">
                              <div class="panel-body">

                              <div class="section-content">
                                    <div class="form-inline">
                                    <ul >
                                       <li *ngFor="#reactie of voorstel.reacties #i=index" >
                                       <p>
                                                 <span>{{reactie.email}}</span>
                                                <span>{{reactie.beschrijving}}</span>
                                                <span>{{reactie.reactieDatum}}</span>
                                        </li>
                                        <li *ngIf="voorstelreactie.email">
                                        <span>{{voorstelreactie.email}}</span>
                                         <span>{{voorstelreactie.beschrijving}}</span>
                                        <span>{{voorstelreactie.reactieDatum}}</span>
                                        </li>
                                    </ul>
                                    <p *ngIf="voorstel?.reacties?.length < 1"><i>Er zijn nog geen reacties ingediend.</i></p>
                                    </div>

                                    <div class="addFaq">
                                        <div class="form-group">
                                            <label >Reactie:</label>
                                            <textarea [(ngModel)]=projects[j].voorstellen[i].reactie></textarea>
                                        </div>
                                       <button class="btn btn-primary pull-right" (click)="post(j,i)" styled>Voeg reactie toe</button>
                                    </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
        </section>
    </div>
    `,
    providers: [
        ProjectService
    ],
    directives: [StyledDirective],
    styles : [`
        .panel-heading {
            background-color: lightgray;
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

        .proposition {
            background-color: #f2f3f8;
            padding-bottom: 2px;
            padding-top: 2px;
            color: black
        }

        .prop-title {
            display:flex;
            align-items: center;
        }

        .prop-title a {
            flex: 1 1 auto;
            color:black !important;
        }

        .prop-title span {
            padding:0 5px ;
        }

        .prop-title i {
            font-size: 0.8em;
        }

        .no-padding {
            padding: 0;
        }

        .panel-group {
        margin-bottom: 0
        }

        .panel-default {
            border: none;
        }
    `]
})

export class PropositionsComponent
{
    projects: Project[]= [];
    data:number = 0;
    errorMessage: string;
    voorstelreactie:ReactieOpVoorstel = new ReactieOpVoorstel("","");


    constructor(
        private _routeParams: RouteParams, private _projectService: ProjectService)
    {
        this._projectService.getProjects("Gent").subscribe((pr:any) => {
            this.projects = pr;
            console.log(pr)},
                (err:any) => this.errorMessage = "Er zijn geen projecten gevonden voor deze gemeenten"
        );

    }

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
        this.projects[project].voorstellen[voorstel].reactie="";
    }


}