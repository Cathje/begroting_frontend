import {Component, Injector} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
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
import {StyledDirective} from '../../../directives/styled';
import {CurConvert} from "./../../../pipes/curConvertPipe";





@Component({ //invoke with metadata object
    selector: 'add-proposition-container',
    template: `
    <p class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</p>
    <p class="alert alert-danger" *ngIf="errorMessage2">{{errorMessage2}}</p>
    <p class="alert alert-danger" *ngIf="errorMessage3">{{errorMessage3}}</p>
    <div class="container">
    <div class ="row">
    <h2>{{project.titel}}</h2>
    <h3>{{project.vraag}}</h3>
    <!--<p>Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>-->
    <p>{{project.extraInfo}}</p>
    <!--TODO: hoe voorzien om nieuw jaar te selecteren. Huidig jaar is default?-->
     </div>
        <div class ="row">
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst> 
            </div>
            <div class ="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class ="row">
                        <section class="col-xs-12 form-inline">
                        <label>boekjaar:</label>
                        <input type="number" class="form-control" [(ngModel)]="budgetYear"/>
                        <button class="btn btn-primary form-control" (click)="getBudget()" styled><span class="glyphicon glyphicon-ok"></span></button>
                        </section>
                    
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
                <button [disabled]="!submitProject" (click)="submit()"class="btn btn-primary pull-right" styled>opslaan</button>
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
                                                            <td class="tdInput">
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
        width: 80%;
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
        height: 18em;
        overflow-y: auto; /*of overflow-y: scroll;*/
        }
        
        .locked{
        /*background-color: indianred;*/
        background-color: indianred;
        
        
        }
        .tdInput{
        width: 15em;
        }
        
        
        
        

        `]
})

export class AddPropositionComponent {
    private categories: GemeenteCategorie [] = [];
    private myTown: string;
    private year: number = 2020;//TODO: default is current year?
    private errorMessage:string;
    private errorMessage2: string;
    private errorMessage3: string;
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
    private budgetMap : Map<number, BudgetWijziging> = new Map<number, BudgetWijziging>();
    private actionMap : Map<number, number> = new Map<number, number>();
    private budgetYear: number = 2020;//hc due to limited data
    private totalMap: Map<number, number> = new Map<number, number>();


    constructor(private _routeParams: RouteParams, private _projectService:ProjectService, private injector:Injector, private _begrotingService:BegrotingService, _router:Router) {

        this.myTown = injector.parent.parent.parent.parent.get(RouteParams).get('town');
        //default view is current year, TODO: us in api call!
        var today = new Date();
        //this.budgetYear = today.getFullYear;

        this._begrotingService.getGemeenteCategorieen(this.budgetYear,this.myTown)
            .subscribe((cats: any) => this.categories = cats,
                (err:any) => this.errorMessage = "Er zijn geen categorieën gevonden."
            );

        this._projectService.getProject(this.year, "Gent")
            .subscribe((project: any) => {
                    this.project = project;
                    console.log(project);
                },
                (err:any) => {
                    this._projectService.getInspraakitems(this.year, this.myTown)
                        .subscribe((cats:any) => this.project = cats,
                            (err:any) => this.errorMessage = "Geen inspraakitems gevonden."
                        );
                }
            );

        if(!this.errorMessage)
        {



        }




    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');

    }

    //reload info for selected year
    getBudget(){
        this.errorMessage2 = "";

        this._begrotingService.getGemeenteCategorieen(this.budgetYear,this.myTown)
            .subscribe((cats: any) => this.categories = cats,
                (err:any) => this.errorMessage2 = "Er zijn geen categorieën of projecten gevonden voor dit boekjaar."
            );

        this._projectService.getProject(this.year, this.myTown)
            .subscribe((project: any) => {
                    this.project = project;
                    console.log(project);
                },
                (err:any) => {
                    this._projectService.getInspraakitems(this.budgetYear, this.myTown)
                        .subscribe((cats:any) => this.project = cats,
                            (err:any) => this.errorMessage2 = "Er zijn geen categorieën of projecten gevonden voor dit boekjaar."
                        );
                }
            );

    }
    updateBudget(event: any){
        /*alert('budget update voor id ' + event.id + " van " + event.event.target.value);*/
        let originalValue = 0;
        let newValue = event.event.target.value;

        this.budgetChange = true;//Todo; optimaliseren!

        /*Check for repeating change. If so, remove from budget map and reset all values*/
        var item = this.budgetMap.get(event.id);
        if (item!=null){//repeat
            /*this.budgetMap.forEach(this.logMapElements);*/


            //correct budgetChanges if previously changed cat is changed again
            //remove elements, children, parents and adjust amounts
            let tempSavings: number [] = [];
            let repLevel = 3;
            //get A level elements
            for (var i = 0; i < this.project.cats.length; i++) {//toplevel locken als
                if(this.project.cats[i].ID == event.id){
                    //if top level
                    repLevel = 1;
                    tempSavings.push(this.project.cats[i].ID);
                    this.totalMap.delete(this.project.cats[i].ID);
                    for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                        if(this.project.cats[i].childCats[j].inspraakNiveau != 2){
                            tempSavings.push(this.project.cats[i].childCats[j].ID);
                        }
                        for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                            if(this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2){
                                tempSavings.push(this.project.cats[i].childCats[j].childCats[k].ID);
                            }
                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                if(this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2){
                                    tempSavings.push(this.project.cats[i].childCats[j].childCats[k].acties[l].ID);
                                }
                            }
                        }

                    }

                }
            }
            //get B level elements
            if(repLevel != 1) {//is level B or C
                for (var i = 0; i < this.project.cats.length; i++) {
                    for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                        if(this.project.cats[i].childCats[j].ID == event.id) {
                            repLevel == 3;
                            //add parent
                            tempSavings.push(this.project.cats[i].ID);
                            this.totalMap.delete(this.project.cats[i].ID);

                            if (this.project.cats[i].childCats[j].inspraakNiveau != 2) {
                                tempSavings.push(this.project.cats[i].childCats[j].ID);
                            }
                            for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                    tempSavings.push(this.project.cats[i].childCats[j].childCats[k].ID);
                                }
                                for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                    if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                        tempSavings.push(this.project.cats[i].childCats[j].childCats[k].acties[l].ID);
                                    }
                                }
                            }
                        }

                    }

                }

            }
            //get C level elements
            if(repLevel == 3){
                for (var i = 0; i < this.project.cats.length; i++) {
                    for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                        for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                            if (this.project.cats[i].childCats[j].childCats[k].ID == event.id) {
                                //add parents
                                tempSavings.push(this.project.cats[i].ID);
                                this.totalMap.delete(this.project.cats[i].ID);
                                tempSavings.push(this.project.cats[i].childCats[j].ID);
                                if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                    tempSavings.push(this.project.cats[i].childCats[j].childCats[k].ID);
                                }
                                for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                    if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                        tempSavings.push(this.project.cats[i].childCats[j].childCats[k].acties[l].ID);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //delete all temp elements from map and reset prices by looping through project cats
            for (var i = 0; i < tempSavings.length; i++) {
                let origValue: number = 0;
                for (var j = 0; j < this.categories.length; j++) {
                    if(this.categories[j].ID == tempSavings[i]){
                        origValue = this.categories[j].totaal;
                        /*console.log("original" + origValue);*/
                        for (var k = 0; k < this.project.cats.length; k++) {
                            if(this.categories[j].ID == this.project.cats[k].ID){
                                this.project.cats[k].totaal = origValue;

                            }
                            for (var l = 0; l < this.project.cats[k].childCats.length; l++) {
                                if(this.categories[j].ID == this.project.cats[k].childCats[l].ID){
                                    this.project.cats[k].childCats[l].totaal = origValue;
                                }
                                for (var m = 0; m < this.project.cats[k].childCats[l].childCats.length; m++) {
                                    if(this.categories[j].ID == this.project.cats[k].childCats[l].childCats[m].ID){
                                        this.project.cats[k].childCats[l].childCats[m].totaal = origValue;
                                    }
                                    for (var n = 0; n < this.project.cats[k].childCats[l].childCats[m].acties.length; n++) {
                                        if(this.categories[j].ID == this.project.cats[k].childCats[l].childCats[m].acties[n].ID){
                                            this.project.cats[k].childCats[l].childCats[m].acties[n].uitgaven = origValue;
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                this.budgetMap.delete(tempSavings[i]);
            }
            //reset action values
            for (var p = 0; p < this.project.cats.length; p++) {//A level
                for (var q = 0; q < this.project.cats[p].childCats.length; q++) {// B level
                    for (var r = 0; r < this.project.cats[p].childCats[q].childCats.length; r++) { //C Level
                        for (var s = 0; s < this.project.cats[p].childCats[q].childCats[r].acties.length; s++) { //Acties
                            var amount = this.actionMap.get(this.project.cats[p].childCats[q].childCats[r].acties[s].ID);
                            if(amount!=null){
                                this.project.cats[p].childCats[q].childCats[r].acties[s].uitgaven = amount;
                                this.budgetMap.delete(this.project.cats[p].childCats[q].childCats[r].acties[s].ID);
                            }
                        }
                    }
                }
            }
        }



        /*Update budget changes*/
        //get original value (2way db - different object!!!)
        for (var i = 0; i < this.categories.length; i++) {
            if(this.categories[i].ID == event.id){
                originalValue = this.categories[i].totaal;
            }
        }

        let result = newValue - originalValue;

        let level = 3;
        for (var i = 0; i < this.project.cats.length; i++) {
            //if top level update sub levels
            if(this.project.cats[i].ID == event.id){
                level = 1;

                this.totalMap.set(this.project.cats[i].ID, result);
                this.project.cats[i].totaal = newValue;


                //add top level budget change
                //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
                this.budgetMap.set(this.project.cats[i].ID,new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
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
                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, levBResult,this.project.cats[i].childCats[j].naamCat ));
                        this.budgetMap.set(this.project.cats[i].childCats[j].ID,new BudgetWijziging(this.project.cats[i].childCats[j].ID, levBResult,this.project.cats[i].childCats[j].naamCat ));
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
                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
                            this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].ID,new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
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
                                if (item==null){
                                    this.actionMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven);
                                }
                                //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
                                this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID,new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
                                this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                            }

                        }

                    }

                }

            }
        }
        //if level is not a top
        if(level != 1){//is level B or C
            for (var i = 0; i < this.project.cats.length; i++) {
                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                    if(this.project.cats[i].childCats[j].ID == event.id){
                        level = 2;
                        this.project.cats[i].childCats[j].totaal = newValue;

                        //add B level budget change
                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, result,this.project.cats[i].childCats[j].naamCat ));
                        this.budgetMap.set(this.project.cats[i].childCats[j].ID,new BudgetWijziging(this.project.cats[i].childCats[j].ID, result,this.project.cats[i].childCats[j].naamCat ));
                        //adjust upper level
                        this.project.cats[i].totaal += result;
                        this.totalMap.set(this.project.cats[i].ID, result);
                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
                        this.budgetMap.set(this.project.cats[i].ID,new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));



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
                                //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult,this.project.cats[i].childCats[j].childCats[k].naamCat ));
                                this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].ID,new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult,this.project.cats[i].childCats[j].childCats[k].naamCat));
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
                                    if (item==null){
                                        this.actionMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven);
                                    }
                                    //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult,this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort ));
                                    this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID,new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult,this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
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

                            this.project.cats[i].childCats[j].childCats[k].totaal = newValue;
                            //add C-level budget change
                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, result, this.project.cats[i].childCats[j].childCats[k].naamCat));
                            this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].ID,new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, result, this.project.cats[i].childCats[j].childCats[k].naamCat));
                            //adjust upper levels
                            this.project.cats[i].totaal += result;
                            this.totalMap.set(this.project.cats[i].ID, result);
                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
                            this.budgetMap.set(this.project.cats[i].ID,new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat));
                            this.project.cats[i].childCats[j].totaal += result;
                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, result,this.project.cats[i].childCats[j].naamCat ));
                            this.budgetMap.set(this.project.cats[i].childCats[j].ID,new BudgetWijziging(this.project.cats[i].childCats[j].ID, result,this.project.cats[i].childCats[j].naamCat));

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
                                    if (item==null){
                                        this.actionMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven);
                                    }
                                    //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
                                    this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID,new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].naamCat));
                                    this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                }

                            }

                        }

                    }

                }
            }

        }
        //convert for visualisation purposes and posting to backend
        let budgetArray:BudgetWijziging [] = [];
        //using "this" in forEach results in errors!!!???
        this.budgetMap.forEach(function (value) {
            budgetArray.push(value);
        });
        this.begrotingsVoorstel.budgetWijzigingen = budgetArray;
        let total = 0;
        this.totalMap.forEach(function (value) {
            total+=value;
        })
        this.tempTotal = total;




    }

    //utility method: map printing
    logMapElements(value : any, key : any, map : any) {
        this.budgetwijzigingen = [];
        this.budgetwijzigingen.push(value);
        console.log("k " + key + "] = " + value);
    }

    //upload images
    uploadImages = (event: any)=>{
        this.loadimage(event.target.files[0], (img: string) =>{
            this.afb.push(event.target.files[0].name);
            this.begrotingsVoorstel.afbeeldingen.push(img);
        });
    }

    loadimage = (img: any, cb: any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function() {
            let result = reader.result;
            cb(result); //callback to store image
        }
    }


    onCircleClick: any = (id: number) => {
        //do nothing

    };


    submit()
    {
        let submittable = false;
        this.errorMessage3 = "";
        //check scenarios
        switch(this.project.projectScenario){
            case 1 :
                if((this.tempTotal + this.project.bedrag)===0){submittable = true;}
                else{
                    this.errorMessage3 = "De voorgestelde besparing komt niet overeen met het te besparen bedrag";
                };
                break;
            case 2:
                if(this.tempTotal === 0){submittable = true;}
                else{
                    this.errorMessage3 = "De voorgestelde herschikking komt niet overeen met het te herschikken bedrag";
                };
                break;
            case 3:
                if(this.tempTotal === this.project.bedrag){submittable = true;}
                else{
                    this.errorMessage3 = "De voorgestelde bestemming komt niet overeen met het te bestemmen bedrag";
                };
                break;
        }

        if (submittable === true)
        {
            this.begrotingsVoorstel.auteurEmail = sessionStorage.getItem('user');
            this._projectService.postBegrotingsVoorstel(this.project.id, this.begrotingsVoorstel).subscribe();
            this._router.navigate(['/', 'App',{town: this.myTown}, 'Participation','Propositions']);
        }


    }

}