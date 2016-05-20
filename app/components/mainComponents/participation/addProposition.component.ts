import {Component, Injector} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ProjectService} from "../../../services/projectService.component";
import {BegrotingService} from "../../../services/begrotingService";
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
                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst> 
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
                    <!--outer accordion-->
                    <div class="panel-group" id="levelA">
                        <div class="panel panel-default">
                        <div class="panel-heading">
                          <h4 class="panel-title"><a data-toggle="collapse" data-parent="#levelA" href="#collapseInnerA">
                            Collapsible Inner Group Level A
                          </a></h4>
                        </div>
                        <div id="collapseInnerA" class="panel-collapse collapse"><!---->
                          <div class="panel-body">
                            <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                            <!-- Level B accordion -->
                            <div class="panel-group" id="levelB">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h4 class="panel-title"><a data-toggle="collapse" data-parent="#levelB" href="#collapseInnerB">
                                    Collapsible Inner Group Level B
                                  </a></h4>
                                </div>
                                <div id="collapseInnerB" class="panel-collapse collapse in">
                                  <div class="panel-body">
                                  <!--Level C accordion-->
                                    <div class="panel-group" id="levelC">
                                      <div class="panel panel-default">
                                        <div class="panel-heading">
                                          <h4 class="panel-title"><a data-toggle="collapse" data-parent="#levelC" href="#collapseInnerC">
                                            Collapsible Inner Group Level C
                                          </a></h4>
                                        </div>
                                        <div id="collapseInnerC" class="panel-collapse collapse in">
                                          <div class="panel-body">
                                          <!--Level D accordion: actions-->
                                            <div class="panel-group" id="levelD">
                                              <div class="panel panel-default">
                                                <div class="panel-heading">
                                                  <h4 class="panel-title"><a data-toggle="collapse" data-parent="#levelD" href="#collapseInnerD">
                                                    Collapsible Inner Group Level D
                                                  </a></h4>
                                                </div>
                                                <div id="collapseInnerD" class="panel-collapse collapse in">
                                                  <div class="panel-body">
                                                  <!--Level 4 accordion: actions-->
                                                    Hier komen acties...
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
                              <!--<div class="panel panel-default">
                                <div class="panel-heading">
                                  <h4 class="panel-title"><a data-toggle="collapse" data-parent="#levelA" href="#collapseInnerTwo">
                                    Collapsible Inner Group Item #2
                                  </a></h4>
                                </div>
                                <div id="collapseInnerTwo" class="panel-collapse collapse">
                                  <div class="panel-body">
                                    Anim pariatur cliche...
                                  </div>
                                </div>
                              </div>-->
                            </div>
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
        ProjectService, TownService, BegrotingService
    ],
    styles: [`

        h4.panel-title{
        color: black;
        }
        /*be very specific to change colors*/
        .panel-default >.panel-heading {
            background-color: #2ac7d2;
        }

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

    
    constructor(private _routeParams: RouteParams, private _projectService:ProjectService, private _townService : TownService, private _begrotingService:BegrotingService) {

        /* this._projectService.getInspraakitems(this.year, "Gent")
            .subscribe((finan: any) => this.categories = finan,
                (err:any) => this.errorMessage = err
            );

        if(!this.errorMessage)
        {
            console.log("call ok?");

            
        }*/
        _begrotingService.getGemeenteCategorieen(2020,"Gent")
            .subscribe((cats: any) => this.categories = cats
            );

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
    updateBudget(){
        alert('budget update');
    }

    click(){
        alert(this.categories[1].naamCat);
        /*let counter = 0;
        for (var i = 0; i < this.project.cats.length; i++) {
            console.log("id: " + this.project.cats[i].ID);

        }*/
        
        
        
    }


    onCircleClick: any = (id: number) => {
        alert('test');
        
    };

    //@TODO test voor webapi en service  --> te verwijderen
    submit()
    {
        var today = new Date().toLocaleDateString();
        this.BegrotingsVoorstel.indiening = today;
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