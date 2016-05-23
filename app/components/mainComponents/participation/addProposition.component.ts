import {Component, Injector} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ProjectService} from "../../../services/projectService.component";
import {BegrotingService} from "../../../services/begrotingService";
import {GemeenteCategorie} from "./../../../models/gemeenteCategorie";
import {rangeSlider} from './../../subComponents/input/rangeSlider.component';
/*import {Slider} from './../../subComponents/input/slider.component';*/
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component'
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {MainTown} from "./../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {Project} from "./../../../models/project";
import {Actie} from "./../../../models/actie";
import {BudgetWijziging} from "../../../models/bugdetWijziging";
import {BegrotingsVoorstel} from "../../../models/begrotingsVoorstel";
import {CurConvert} from "./../../../pipes/curConvertPipe"; //



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
                <div class ="row">
                    <h2>Gewijzigde categorieën en acties</h2>
                    <div class="section-content">
                    <!--acties toevoegen aan de box-->
                    <p *ngIf="!budgetChange">Nog geen wijzigingen...</p>
                    <div *ngIf="begrotingsVoorstel.budgetWijzigingen!=null">
                        <table class="table table-striped">
                            <tbody>
                                <tr *ngFor="#change of begrotingsVoorstel.budgetWijzigingen">
                                    <td>{{change.beschrijving}}</td>
                                    <td>{{change.bedrag | currency:'EUR':true:'.0-0'}}</td>
                                    <td id="remove" (click)="resetBudget()"><span class="glyphicon glyphicon-remove"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <div class ="row">
                    <h2 *ngIf="scenario===1">Te besparen bedrag: {{project.bedrag | currency:'EUR':true:'.0-0'}}</h2><!--todo: gebruik project.projectScenario!!!-->
                    <h2 *ngIf="scenario===2">Te herschikken bedrag: {{project.bedrag | currency:'EUR':true:'.0-0'}}</h2>
                    <h2 *ngIf="scenario===3">Te bestemmen bedrag: {{project.bedrag | currency:'EUR':true:'.0-0'}}</h2>
                    <h2>Verschoven bedrag: {{tempTotal | currency:'EUR':true:'.0-0'}}</h2>
                    <!--<h2>Totaal: €{{project.bedrag}}</h2>-->
                </div>
            </div>
        </div>
        <div class="row">
            <form>
                <div class="form-group">
                    <label>Samenvatting</label>
                    <textarea class="form-control" rows="3" [(ngModel)]="begrotingsVoorstel.samenvatting" placeholder="Samenvatting"></textarea>
                </div>
                <div class="form-group">
                    <label>Motivatie</label>
                    <textarea class="form-control" rows="10" [(ngModel)]="begrotingsVoorstel.beschrijving" placeholder="Motivatie"></textarea>
                </div>
                <div class="form-group">
                    <label id="image">Afbeeldingen</label>
                    <label class="btn btn-primary btn-file">
                        Kies bestand <span class="glyphicon glyphicon-upload"></span><input type="file" style="display: none;" (change)="uploadImages($event)" />
                    </label>
                    <div *ngIf="afb">
                        <ul>
                            <li *ngFor="#af of afb">{{af}}</li>
                        </ul>
                    </div>
                </div>
                <button [disabled]="submitProject" (click)="submit()"class="btn btn-primary pull-right">opslaan</button>
            </form>
        </div>
        <div class ="row">
            <h2>Te wijzigen categorieën en acties</h2>
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
                                    <slider name="slide" id="speedSlider" [(data)]="cat.totaal" [value]="cat.totaal" [itemID] = "cat.ID" [propositionParent]="ISPROP" [inspraakNiveau]="cat.inspraakNiveau" (changes)="updateBudget($event)"></slider>
                                </div>
                                <div class="form-group">
                                    <input [ngClass]="{locked: cat.inspraakNiveau  != 3}"  class="form-control" id="taxInput" type="text" [ngModel]="cat.totaal  | curPipe " (ngModelChange)="cat.totaal" readonly>
                                </div>
                            </form>
                            <!--a form for capturing budget shifts on action level-->
                            <!--<h3>Acties</h3>
                            <p *ngIf="cat.acties==null">Er zijn geen acties gedefinieerd op dit niveau</p>
                            <div *ngIf="cat.acties!=null">
                                <form *ngFor="#acA of cat.acties #l = index" class="form-inline">
                                    <div class="form-group">
                                        <label class="actionLabel" for="slide">{{acA.actieKort}}</label>
                                        <input [ngClass]="{locked: acA.inspraakNiveau  != 3}" type="number" class="form-control" id="taxInput" [(ngModel)]="acA.uitgaven" readonly>
                                    </div>
                                    <div class="form-group actionSliderContainer">
                                        &lt;!&ndash;<slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>&ndash;&gt;
                                        <slider name="slide" id="speedSlider" [(data)]="acA.uitgaven" [value]="acA.uitgaven" [itemID] = "acA.ID" [propositionParent]="ISPROP" [inspraakNiveau]="acA.inspraakNiveau" (changes)="updateBudget($event)"></slider>
                                    </div>
                                </form>
                            </div>-->
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
                                            <slider name="slide" id="speedSlider" [(data)]="levB.totaal" [value]="levB.totaal" [itemID] = "levB.ID" [propositionParent]="ISPROP" [inspraakNiveau]="levB.inspraakNiveau" (changes)="updateBudget($event)"></slider>
                                        </div>
                                        <div class="form-group">
                                            <input [ngClass]="{locked: levB.inspraakNiveau  != 3}" type="text" class="form-control" id="taxInput" [ngModel]="levB.totaal  | curPipe" (ngModelChange)="levB.totaal" readonly>
                                        </div>
                                    </form>
                                    <!--a form for capturing budget shifts on action level-->
                                    <!--<h3>Acties</h3>
                                    <p *ngIf="levB.acties==null">Er zijn geen acties gedefinieerd op dit niveau</p>
                                    <div *ngIf="levB.acties!=null">
                                        <form *ngFor="#acB of levB.acties #k = index" class="form-inline">
                                            <div class="form-group">
                                                <label class="actionLabel" for="slide">{{acB.actieKort}}</label>
                                                <input [ngClass]="{locked: acB.inspraakNiveau  != 3}" type="number" class="form-control" id="taxInput" [(ngModel)]="acB.uitgaven" readonly>
                                                &lt;!&ndash;<slider name="slide" id="speedSlider" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)="updateBudget()"></slider>&ndash;&gt;
                                            </div>
                                            <div class="form-group actionSliderContainer">
                                                &lt;!&ndash;<input type="number" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>&ndash;&gt;
                                                <slider name="slide" id="speedSlider" [(data)]="acB.uitgaven" [value]="acB.uitgaven" [itemID] = "acB.ID" [propositionParent]="ISPROP" [inspraakNiveau]="acB.inspraakNiveau" (changes)="updateBudget($event)"></slider>
                                            </div>
                                        </form>
                                    </div>-->
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
                                                    <slider name="slide" id="speedSlider" [(data)]="levC.totaal" [value]="levC.totaal" [itemID] = "levC.ID" [propositionParent]="ISPROP" [inspraakNiveau]="levC.inspraakNiveau" (changes)="updateBudget($event)"></slider>
                                                </div>
                                                <div class="form-group">
                                                    <input [ngClass]="{locked: levC.inspraakNiveau  != 3}" type="text" class="form-control" id="taxInput" [ngModel]="levC.totaal  | curPipe" (ngModelChange)="levC.totaal" readonly>
                                                </div>
                                            </form>
                                            <!--a form for capturing budget shifts on action level-->
                                            <h3>Acties</h3>
                                            <p *ngIf="levC.acties==null">Er zijn geen acties gedefinieerd</p>
                                            <div *ngIf="levC.acties!=null"> 
                                                <!--<form *ngFor="#ac of levC.acties #k = index" class="form-inline">
                                                    <div class="form-group">
                                                        <label class="actionLabel" for="slide">{{ac.actieLang}}</label>
                                                        <input [ngClass]="{locked: ac.inspraakNiveau  != 3}" type="number" class="form-control" id="taxInput" [(ngModel)]="ac.uitgaven" readonly>
                                                    </div>
                                                    &lt;!&ndash;<div class="form-group actionSliderContainer">
                                                        <slider name="slide" id="speedSlider" [(data)]="ac.uitgaven" [value]="ac.uitgaven" [itemID] = "ac.ID" [propositionParent]="ISPROP" [inspraakNiveau]="ac.inspraakNiveau" (changes)="updateBudget($event)"></slider>
                                                    </div>&ndash;&gt;
                                                </form>-->
                                                <table class="table table-striped">
                                                    <tbody>
                                                        <tr *ngFor="#ac of levC.acties #k = index">
                                                            <td>{{ac.actieLang}}</td>
                                                            <td>
                                                                <input [ngClass]="{locked: ac.inspraakNiveau  != 3}" type="text" class="form-control" id="taxInput" [ngModel]="ac.uitgaven  | curPipe" (ngModelChange)="ac.uitgaven" readonly>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
    </div>
    
    
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
    pipes: [CurConvert],
    styles: [`

        /*be very specific to change colors*/
        .panel-default >.panel-heading {
            background-color: #2ac7d2;
        }
        #image{
        width: 100%;
        }
        #remove{
         cursor: pointer; 
         cursor: hand;
        }
        ul
        {
            list-style-type: none;
            margin-top: 1em;
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
        width:60em;
        display: inline-block;
        }
        .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        height: 20em;
        overflow-y: auto; /*of overflow-y: scroll;*/
        }
        
        .locked{
        /*background-color: indianred;*/
        background-color: indianred;
        
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
    private begrotingsVoorstel: BegrotingsVoorstel = new BegrotingsVoorstel(); //
    private scenario: number = 1;//todo: effectief scenario gebruiken via pipe!!!
    private ISPROP: boolean = true;
    private tempTotal: number = 0;
    private submitProject:boolean=true;
    private afb: string [] = [];
    private budgetChange: boolean = false;

    
    constructor(private _routeParams: RouteParams, private _projectService:ProjectService, private _townService : TownService, private _begrotingService:BegrotingService) {

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
    updateBudget(event: any){
        /*alert('budget update voor id ' + event.id + " van " + event.event.target.value);*/
        let originalValue = 0;
        let newValue = event.event.target.value;

        this.budgetChange = true;//Todo; optimaliseren!

        //get original value (2way db - different object!!!)
        for (var i = 0; i < this.categories.length; i++) {
            if(this.categories[i].ID == event.id){
                originalValue = this.categories[i].totaal;
            }
        }

        let result = newValue - originalValue;
        this.tempTotal += result;
        /*alert(this.tempTotal);*/

        let level = 3;
        for (var i = 0; i < this.project.cats.length; i++) {
            //if top level update sub levels
            if(this.project.cats[i].ID == event.id){
                level = 1;
                /*alert(this.project.cats[i].totaal);*/
                /*TODO: update level1 en budgetwijziging!!!!!!!!!*/
                //update level 2
                let levelBTotal = 0;
                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                    if(this.project.cats[i].childCats[j].inspraakNiveau != 2) //take locking into account
                    {
                        levelBTotal += this.project.cats[i].childCats[j].totaal;
                    }
                }
                let levBResult = 0;
                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                    if(this.project.cats[i].childCats[j].inspraakNiveau != 2)
                    {
                        let share = (this.project.cats[i].childCats[j].totaal/levelBTotal);
                        levBResult = result * share;
                        //create budgetWijziging and update total
                        this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, levBResult,this.project.cats[i].childCats[j].naamCat ));
                        this.project.cats[i].childCats[j].totaal = levBResult + this.project.cats[i].childCats[j].totaal;
                    }
                    //update level 3
                    let levelCTotal = 0;
                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                        if(this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) //take locking into account
                        {
                            levelCTotal += this.project.cats[i].childCats[j].childCats[k].totaal;
                        }

                    }
                    let levCResult = 0;
                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                        if(this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) //take locking into account
                        {
                            let share = (this.project.cats[i].childCats[j].childCats[k].totaal/levelCTotal);
                            //create budgetWijziging and update total
                            levCResult = levBResult * share;
                            this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
                            this.project.cats[i].childCats[j].childCats[k].totaal = levCResult + this.project.cats[i].childCats[j].childCats[k].totaal;
                        }
                        //update actions
                        let actTotal = 0;
                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                            if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) //take locking into account
                            {
                                actTotal += this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                            }

                        }
                        let actResult = 0;
                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                            if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) //take locking into account
                            {
                                let share = (this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven/actTotal);
                                //create budgetWijziging and update total
                                actResult = levCResult * share;
                                this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
                                this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                            }

                        }

                    }//

                }


                

            }
        }
        //if level is not a top //TODO: correct top level??????
        if(level != 1){//is level B or C
            for (var i = 0; i < this.project.cats.length; i++) {
                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                    if(this.project.cats[i].childCats[j].ID == event.id){
                        level = 2;
                        //update level 3
                        let levelCTotal = 0;
                        for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                            if(this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) //take locking into account
                            {
                                levelCTotal += this.project.cats[i].childCats[j].childCats[k].totaal;
                            }

                        }
                        let levCResult = 0;
                        for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                            if(this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) //take locking into account
                            {
                                let share = (this.project.cats[i].childCats[j].childCats[k].totaal/levelCTotal);
                                //create budgetWijziging and update total
                                levCResult = result * share;
                                this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult,this.project.cats[i].childCats[j].childCats[k].naamCat ));
                                this.project.cats[i].childCats[j].childCats[k].totaal = levCResult + this.project.cats[i].childCats[j].childCats[k].totaal;
                            }
                            //update actions
                            let actTotal = 0;
                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) //take locking into account
                                {
                                    actTotal += this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                }

                            }
                            let actResult = 0;
                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) //take locking into account
                                {
                                    let share = (this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven/actTotal);
                                    //create budgetWijziging and update total
                                    actResult = levCResult * share;
                                    this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult,this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort ));
                                    this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                }

                            }

                        }
                    }
                }
            }
        }
        //if C level change
        if(level == 3){
            for (var i = 0; i < this.project.cats.length; i++) {
                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                        if(this.project.cats[i].childCats[j].childCats[k].ID == event.id){
                            //update actions
                            let actTotal = 0;
                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) //take locking into account
                                {
                                    actTotal += this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                }

                            }
                            let actResult = 0;
                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) //take locking into account
                                {
                                    let share = (this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven/actTotal);
                                    //create budgetWijziging and update total
                                    actResult = result * share;
                                    this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult));
                                    this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                }

                            }

                        }

                    }

                }
            }

        }
        
        
    }

    resetBudget(event: any){//

    }
    
    /*uploadImages(event: any){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function() {
            this.begrotingsVoorstel.afbeeldingen[0] = reader.result;

        }
        //TODO: afwerken upload
        
        
        
    }*/
    //upload images
    uploadImages = (event: any)=>{
        this.loadimage(event.target.files[0], (img: string) =>{
            this.afb.push(event.target.files[0].name);
            this.begrotingsVoorstel.afbeeldingen.push(img);
        });
    }

    loadimage = (img: string, cb: any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function() {
            let result = reader.result;
            cb(result); //callback to store image
        }
    }


    onCircleClick: any = (id: number) => {
        alert('test');
        
    };

    //@TODO test voor webapi en service  --> te verwijderen
    submit()
    {
        this.begrotingsVoorstel.beschrijving = "kjQGQBjqshgbcjhqbckjb<clgbcqjbck:xjhb";
        // alert(this.BegrotingsVoorstel.budgetWijzigingen.length);
        this._projectService.postBegrotingsVoorstel(this.project.id, this.begrotingsVoorstel).subscribe();

    }



    //@TODO test voor webapi en service --> te verwijderen
    createBudgetWijziging(id: number, inspraak:number)
    {
        /*if(inspraak != 2)
        {
            this.budgetwijzigingen  = this.begrotingsVoorstel.budgetWijzigingen.filter(
                (b:any) => b.inspraakItemId === id);
            if(this.budgetwijzigingen.length == 0)
            {
                this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(id, 1000));
                return true;
            }
            else {
                //totaal wijzigen ofzo...
                return true;
            }
        }
        else {
            return false;
        }*/
    }
    //sessionStorage.removeItem("newUser");
}