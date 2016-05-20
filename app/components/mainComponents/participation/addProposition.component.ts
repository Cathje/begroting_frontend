import {Component, Injector} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ProjectService} from "../../../services/projectService.component";
import {GemeenteCategorie} from "./../../../models/gemeenteCategorie";
import {rangeSlider} from './../../subComponents/input/rangeSlider.component';
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component'
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {MainTown} from "./../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {Project} from "./../../../models/project";
import {Actie} from "./../../../models/actie";
import {BudgetWijziging} from "../../../models/bugdetWijziging";
import {BegrotingsVoorstel} from "../../../models/begrotingsVoorstel";


@Component({ //invoke with metadata object
    selector: 'add-proposition-container',
    template: `
    <div class="container">
    <h2>Voorstel indienen</h2>
        <div class ="row">
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p>hier komt de sunburst voor project {{project.titel}}</p>
             <!--   <sunburst [data]=project.cats [onClick]=onCircleClick [height]=width [width]=width></sunburst> -->
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
            <div class="panel-group" id="accordion1">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">
              Collapsible Group #1
              </a></h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in">
              <div class="panel-body">
                This is a simple accordion inner content...
              </div>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion1" href="#collapseTwo">
                Collapsible Group #2 (With nested accordion inside)
              </a></h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse">
              <div class="panel-body">

                <!-- Here we insert another nested accordion -->

                <div class="panel-group" id="accordion2">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapseInnerOne">
                        Collapsible Inner Group Item #1
                      </a></h4>
                    </div>
                    <div id="collapseInnerOne" class="panel-collapse collapse in">
                      <div class="panel-body">
                        Anim pariatur cliche...
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapseInnerTwo">
                        Collapsible Inner Group Item #2
                      </a></h4>
                    </div>
                    <div id="collapseInnerTwo" class="panel-collapse collapse">
                      <div class="panel-body">
                        Anim pariatur cliche...
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Inner accordion ends here -->

              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
    <button (click)="click()">test</button>
    
               <!--@TODO verwijderen van deze test voor webapi en service -->
          <p>Dit is een test voor de service {{project.titel}}</p>
                 <div *ngFor="#cat of project.cats #i = index">
                <h5>categorie: {{cat.naamCat}}</h5>
                <p>totaal: {{cat.totaal}}</p>
                <div *ngIf="createBudgetWijziging(cat.ID, cat.inspraakNiveau)">              
                </div>
            </div>
            <button (click)="submit()" >opslaan</button>




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
    project: Project = new Project("");
    width: number = window.innerWidth < 768 ? window.innerWidth*0.7 : window.innerWidth/4;
    private budgetwijzigingen: BudgetWijziging [] =  [];
    private BegrotingsVoorstel: BegrotingsVoorstel = new BegrotingsVoorstel();

    
    constructor(private _routeParams: RouteParams, private _projectService:ProjectService, private _townService : TownService) {

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



        }




    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
        
     }

    //load accordion for selected year
    loadAccordion(event: any){


    }

    click(){
        alert(this.project.cats[1].naamCat);
        let counter = 0;
        for (var i = 0; i < this.project.cats.length; i++) {
            console.log("id: " + this.project.cats[i].ID);

        }
        
        
        
    }


    onCircleClick: any = (id: number) => {
        alert('test');
        
    };

    //@TODO test voor webapi en service  --> te verwijderen
    submit()
    {
        this.BegrotingsVoorstel.beschrijving = "kjQGQBjqshgbcjhqbckjb<clgbcqjbck:xjhb";
        // alert(this.BegrotingsVoorstel.budgetWijzigingen.length);
        this._projectService.postBegrotingsVoorstel(this.project.id, this.BegrotingsVoorstel).subscribe();

    }



    //@TODO test voor webapi en service --> te verwijderen
    createBudgetWijziging(id: number, inspraak:number)
    {
        if(inspraak != 2)
        {
            this.budgetwijzigingen  = this.BegrotingsVoorstel.budgetWijzigingen.filter(
                (b:any) => b.inspraakItemId === id);
            if(this.budgetwijzigingen.length == 0)
            {
                this.BegrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(id, "test", 1000));
                return true;
            }
            else {
                //totaal wijzigen ofzo...
                return true;
            }
        }
        else {
            return false;
        }
    }
}