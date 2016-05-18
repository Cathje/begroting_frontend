import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ProjectService} from "../../../services/projectService.component";
import {GemeenteCategorie} from "./../../../models/gemeenteCategorie";
import {rangeSlider} from './../../subComponents/input/rangeSlider.component';
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component'
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {MainTown} from "./../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {InspraakCategorie} from "./../../../models/dto/inspraakCategorieDTO";
import {Project} from "./../../../models/project";

@Component({ //invoke with metadata object
    selector: 'add-proposition-container',
    template: `
    <div class="container">
    <h2>Voorstel indienen</h2>
        <div class ="row">
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p>hier komt de sunburst</p>
                
            </div>
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class ="row">
                    <p>hier komen de acties</p>
                </div>
                <div class ="row">
                    <p>hier komt het totaal</p>
                </div>
            </div>
        </div>
        <div class ="row">
            <p>hier komt de accordeon</p>
            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Collapsible Group 1</a>
                    </h4>
                  </div>
                  <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Collapsible Group 2</a>
                    </h4>
                  </div>
                  <div id="collapse2" class="panel-collapse collapse">
                    <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Collapsible Group 3</a>
                    </h4>
                  </div>
                  <div id="collapse3" class="panel-collapse collapse">
                    <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  </div>
                </div>
              </div>
        </div>
    </div>
    





        `,
    directives: [SunburstComponent, ROUTER_DIRECTIVES, rangeSlider],
    providers: [
        ProjectService, TownService
    ],
    styles: [`



        `]
})

export class AddPropositionComponent {
    private categories: GemeenteCategorie [] = [];
    private myTown: MainTown;
    private year: number = 2020;//TODO: default is current year?
    private errorMessage:any;
    private project: Project = new Project("");

    constructor(private _routeParams: RouteParams, private _projectService:ProjectService, private _townService : TownService) {

        //this.myTown = _townService.getTownHC("Antwerpen");//TODO: delete

       /* this._projectService.getInspraakitems(this.year, "Gent")
            .subscribe((finan: any) => this.categories = finan,
                (err:any) => this.errorMessage = err
            );

        if(!this.errorMessage)
        {
            for (let i of this.categories) {
                console.log("categories: " + i); // "4", "5", "6"
            }
            
        }*/
        this._projectService.getProject(this.year, "Gent")
            .subscribe((project: any) => this.project = project,
                (err:any) => this.errorMessage = err
            );

        if(!this.errorMessage)
        {
            console.log("project: " + this.project);
        }




    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');



    }

    //load accordion for selected year
    loadAccordion(event: any){


    }
}