import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {BegrotingService} from "../../../services/begrotingService";
import {Begroting} from "../../../models/begroting";

@Component({ //invoke with metadata object
    selector: 'projects-container',
    template: `
    <div class="container">
    <h2>Begrotingsposten</h2>
     <p *ngIf="!begrotingen"><i>Er zijn geen begrotingen gevonden voor deze gemeenten</i></p>

        <div class="section-content">
            <div class="panel-group" id="accordion">
                <div *ngFor="#begroting of begrotingen" class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="{{'#'+begroting.boekjaar}}">{{begroting.boekjaar}}</a>
                        </h4>
                      </div>
                  <div [id]=begroting.boekjaar class="panel-collapse collapse in">
            <table class="table table-striped">
            <tbody>
            <tr *ngFor="#cat of begroting.childCats">
                <td><p>{{cat.naamCat}}</p></td>
                <td><p> € {{cat.totaal}}</p></td>
            </tr>
            </tbody>
        </table>
                  </div>

                </div>
            </div>
        </div>
    
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ BegrotingService]
})

export class ProjectsComponent 
{

    town:string;
    begrotingen: Begroting [];
    errorMessage:any;
    constructor(
        private _routeParams: RouteParams, private _begrotingService:BegrotingService, injector:Injector )
        {
            _begrotingService.getBegrotingen("Gent").subscribe((begr: any) => this.begrotingen = begr,
                (err:any) => this.errorMessage = err);
        }
}