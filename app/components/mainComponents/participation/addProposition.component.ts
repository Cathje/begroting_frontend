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
    <div class ="row">
    <h2>{{project.titel}}</h2>
    <h3>{{project.vraag}}</h3>
    <p>Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
    <!--<p>{{project.extraInfo}}</p>--><!--todo: vervang bovenstaande paragraaf door deze-->
    <!--TODO: hoe voorzien om nieuw jaar te selecteren. Huidig jaar is default?-->
     </div>
        <div class ="row">
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst> 
            </div>
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <!-- <div class ="row">
                    <p>Hier komt project info</p>
                </div>-->
                <div class ="row">
                    <h2>Gewijzigde categorieën en acties</h2>
                    <div class="section-content">
                    <!--acties toevoegen aan de box-->
                    </div>
                </div>
                <div class ="row">
                    <h2 *ngIf="scenario===1">Te besparen bedrag: €{{project.bedrag}}</h2><!--todo: gebruik project.projectScenario!!!-->
                    <h2 *ngIf="scenario===2">Te herschikken bedrag: €{{project.bedrag}}</h2>
                    <h2 *ngIf="scenario===3">Te bestemmen bedrag: €{{project.bedrag}}</h2>
                    <!--<h2>Totaal: €{{project.bedrag}}</h2>-->
                </div>
            </div>
        </div>
        <div class ="row">
            <!--<p>hier komt de accordeon</p>-->
                    <!--outer accordion-->
                    <div *ngFor="#cat of project.cats #i = index" class="panel-group" #elem1 [attr.id]="'levelA_' + cat.ID"><!--id="levelA+cat.id""-->
                        <div class="panel panel-default">
                        <div class="panel-heading">
                          <h4 class="panel-title"><a data-toggle="collapse" data-parent="#elem1.id" href="#collA_{{cat.ID}}"> <!--data parent aanpassen?-->
                            {{cat.naamCat}} <!--{{elem1.id}}--> 
                          </a></h4>
                        </div>
                        <div [attr.id]="'collA_' + cat.ID" class="panel-collapse collapse"><!--id="collapseInnerA"-->
                          <div class="panel-body">
                            <!--a form for capturing budget shifts on cat level-->
                            <form class="form-inline">
                                <div class="form-group sliderContainer">
                                    <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                </div>
                                <div class="form-group">
                                    <input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>
                                </div>
                            </form>
                            <!--a form for capturing budget shifts on action level-->
                            <h3>Acties</h3>
                            <p *ngIf="cat.acties==null">Er zijn geen acties gedefinieerd op dit niveau</p>
                            <div *ngIf="cat.acties!=null">
                                <form *ngFor="#acA of cat.acties #l = index" class="form-inline">
                                    <div class="form-group">
                                        <label class="actionLabel" for="slide">{{acA.actieKort}}</label>
                                        <input type="number" class="form-control" id="taxInput" [(ngModel)]="acA.uitgaven" readonly>
                                        <!--<slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>-->
                                    </div>
                                    <div class="form-group actionSliderContainer">
                                        <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                    </div>
                                </form>
                            </div>
                            <!-- Level B accordion -->
                            <div *ngFor="#levB of cat.childCats #j = index" class="panel-group" #elem2 [attr.id]="'levelB_' + levB.ID"><!--id="levelA+cat.id""-->
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h4 class="panel-title"><a data-toggle="collapse" data-parent="#elem2.id" href="#collB_{{levB.ID}}">
                                    {{levB.naamCat}}
                                  </a></h4>
                                </div>
                                <div [attr.id]="'collB_' + levB.ID" class="panel-collapse collapse in">
                                  <div class="panel-body">
                                    <!--a form for capturing budget shifts-->
                                    <form class="form-inline">
                                        <div class="form-group sliderContainer">
                                            <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>
                                        </div>
                                    </form>
                                    <!--a form for capturing budget shifts on action level-->
                                    <h3>Acties</h3>
                                    <p *ngIf="levB.acties==null">Er zijn geen acties gedefinieerd op dit niveau</p>
                                    <div *ngIf="levB.acties!=null">
                                        <form *ngFor="#acB of levB.acties #k = index" class="form-inline">
                                            <div class="form-group">
                                                <label class="actionLabel" for="slide">{{acB.actieKort}}</label>
                                                <input type="number" class="form-control" id="taxInput" [(ngModel)]="acB.uitgaven" readonly>
                                                <!--<slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>-->
                                            </div>
                                            <div class="form-group actionSliderContainer">
                                                <!--<input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>-->
                                                <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                            </div>
                                        </form>
                                    </div>
                                  <!--Level C accordion-->
                                    <div *ngFor="#levC of levB.childCats #j = index" class="panel-group" #elem3 [attr.id]="'levelC_' + levC.ID"><!--id="levelA+cat.id""-->
                                      <div class="panel panel-default">
                                        <div class="panel-heading">
                                          <h4 class="panel-title"><a data-toggle="collapse" data-parent="#elem3.id" href="#collC_{{levC.ID}}">
                                            {{levC.naamCat}}
                                          </a></h4>
                                        </div>
                                        <div [attr.id]="'collC_' + levC.ID" class="panel-collapse collapse in">
                                          <div class="panel-body">
                                          <!--a form for capturing budget shifts-->
                                            <form class="form-inline">
                                                <div class="form-group sliderContainer">
                                                    <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                                </div>
                                                <div class="form-group">
                                                    <input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>
                                                </div>
                                            </form>
                                            <!--a form for capturing budget shifts on action level-->
                                            <h3>Acties</h3>
                                            <p *ngIf="levC.acties===null">Er zijn geen acties gedefinieerd</p>
                                            <div *ngIf="levC.acties!=null"> 
                                                <form *ngFor="#ac of levC.acties #k = index" class="form-inline">
                                                    <div class="form-group">
                                                        <label class="actionLabel" for="slide">{{ac.actieKort}}</label>
                                                        <input type="number" class="form-control" id="taxInput" [(ngModel)]="ac.uitgaven" readonly>
                                                        <!--<slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>-->
                                                    </div>
                                                    <div class="form-group actionSliderContainer">
                                                        <!--<input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>-->
                                                        <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                                    </div>
                                                </form>
                                            </div>
                                          <!--Level D accordion: actions-->
                                           <!-- <div class="panel-group" id="levelD">
                                              <div class="panel panel-default">
                                                <div class="panel-heading">
                                                  <h4 class="panel-title"><a data-toggle="collapse" data-parent="#levelD" href="#collapseInnerD">
                                                    Collapsible Inner Group Level D
                                                  </a></h4>
                                                </div>
                                                <div id="collapseInnerD" class="panel-collapse collapse in">
                                                  <div class="panel-body">
                                                  &lt;!&ndash;Level 4 accordion: actions&ndash;&gt;
                                                    <h3>Acties</h3>
                                                    <p *ngIf="scenario===1"></p>
                                                    <form class="form-inline">
                                                        <div class="form-group">
                                                            <label class="actionLabel" for="slide">Dit is een actie </label>
                                                            <input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>
                                                            &lt;!&ndash;<slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>&ndash;&gt;
                                                        </div>
                                                        <div class="form-group actionSliderContainer">
                                                            &lt;!&ndash;<input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>&ndash;&gt;
                                                            <slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>
                                                        </div>
                                                    </form>
                                                  </div>
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

        /*be very specific to change colors*/
        .panel-default >.panel-heading {
            background-color: #2ac7d2;
        }
        .sliderContainer{
        width: 50%;
        margin-right: 1em;
        }
        .form-inline{
        margin-bottom: 1em;
        }
        .actionSliderContainer{
        width: 30%;
        margin-left: 1em;
        }
        .actionLabel{
        width:20em;
        display: inline-block;
        }
        .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        min-height: 20em;
        overflow: auto; /*of overflow(-y): scroll;*/
        }
        
        
        
        

        `]
})

export class AddPropositionComponent {
    private categories: GemeenteCategorie [] = [];
    private myTown: MainTown;
    private year: number = 2020;//TODO: default is current year?
    private errorMessage:any;
    project: Project = new Project("");
    private width: number = window.innerWidth < 768 ? window.innerWidth*0.7 : window.innerWidth/4;
    private budgetwijzigingen: BudgetWijziging [] =  [];
    private BegrotingsVoorstel: BegrotingsVoorstel = new BegrotingsVoorstel();
    private scenario: number = 1;//todo: effectief scenario gebruiken!!!

    
    constructor(private _routeParams: RouteParams, private _projectService:ProjectService, private _townService : TownService, private _begrotingService:BegrotingService) {

        /* this._projectService.getInspraakitems(this.year, "Gent")
            .subscribe((finan: any) => this.categories = finan,
                (err:any) => this.errorMessage = err
            );

        if(!this.errorMessage)
        {
            console.log("call ok?");

            
        }*/
        this._begrotingService.getGemeenteCategorieen(2020,"Gent")
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


        for (var i = 0; i < this.project.cats[0].childCats[0].childCats.length; i++) {
         alert("dit is het id van level 1: "+this.project.cats[0].childCats[0].childCats[i].naamCat);

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