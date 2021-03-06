import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {BegrotingService} from "../../../services/begrotingService";
import {Begroting} from "../../../models/begroting";
import {StyledDirective} from '../../../directives/styled';
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";

@Component({
    selector: 'projects-container',
    template: `
    <div class="container">
    <p class="alert alert-danger" *ngIf="errorMessage"><i>{{errorMessage}}</i></p>
    <h2>Begrotingsposten</h2>
    <p> Op deze pagina kan u de begrotingsposten terugvinden van uw gemeente per jaar. </p>
        <div class="section-content">
            <div class="panel-group" id="accordion">
                <div *ngFor="#begroting of begrotingen" class="panel panel-default">
                      <div class="panel-heading" styled>
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="{{'#'+begroting.boekjaar}}">
                            <span *ngIf="!begroting.hasProject" class="glyphicon glyphicon-edit"></span>
                            <span *ngIf="begroting.hasProject" class="glyphicon glyphicon-zoom-in"></span>
                            {{begroting.boekjaar}} - <span *ngIf="!begroting.hasProject"> Open</span>
                            <span *ngIf="begroting.hasProject"> Gesloten</span></a>
                        </h4>
                      </div>
                  <div [id]=begroting.boekjaar class="panel-collapse collapse in">
                        <table class="table table-striped">
                        <tbody>
                        <tr *ngFor="#cat of begroting.childCats">
                            <td><p>{{cat.naamCat}}</p></td>
                            <td><p>{{cat.totaal | currency: 'EUR' : true : '3.1-1' }}</p></td>
                        </tr>
                        </tbody>
                    </table>
                  </div>

                </div>
            </div>
             <button class="btn btn-primary pull-right" (click)="onMakeProposition()" styled>Verdeel zelf de begroting</button>
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ BegrotingService, StyledDirective],
    styles: [`
        .panel-heading{
            background-color: #2ac7d2;
        }
    `]
})

export class ProjectsComponent 
{

    town:string;
    begrotingen: Begroting [];
    errorMessage:any;
    constructor(
        private _routeParams: RouteParams, private _begrotingService:BegrotingService,private injector:Injector,private _router : Router)
        {
            _begrotingService.getBegrotingen("Gent").subscribe((begr: any) => this.begrotingen = begr,
                (err:any) => this.errorMessage = "Er zijn geen begrotingen gevonden voor deze gemeenten"
                );
        }

    onMakeProposition = () => {
        this._router.navigate(['/', 'App',{ town: this.injector.parent.parent.parent.parent.get(RouteParams).get('town')}, 'Participation', 'AddPropositions']);
    }
}