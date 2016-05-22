import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {KeysPipe} from "../../../pipes/keysPipe";
import {ProjectService} from "../../../services/projectService.component";
import {NavigationMenuComponent} from "../../subComponents/nav/menu.component";
import {InspraakNiveau} from "../../../models/inspraakNiveau";
import {Project} from "../../../models/project";
import {ProjectScenario} from "../../../models/projectScenario";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";
import {Actie} from "../../../models/actie";


@Component({ //invoke with metadata object
    selector: 'manage-project-container',
    template: `
    <p *ngIf="errorMessage" class="alert alert-info">Er is geen begroting voor dit jaar</p>

    <section class="container">
        <h1>Beheer project - {{town}}</h1>
        <div class="tabs">
            <button class="btn btn-primary" (click)="isNewProject = true" [ngClass]="{inactive: !isNewProject}" data-toggle="tab" href="#new">Nieuw project</button>
            <button class="btn btn-primary" (click)="isNewProject = false" [ngClass]="{inactive: isNewProject}" data-toggle="tab" href="#existing">Bestaand project</button>
        </div>

        <!-- EXISTING PROJECTS TAB-->
        <div class="tab-content">
            <div id="existing" class="tab-pane fade">
                <section class="col-xs-12 form-inline">
                    <h3>Voor welk boekjaar wenst u een bestaand project op te halen?</h3>
                    <div class="section-content">
                     <label>boekjaar:</label>
                     <input type="number" class="form-control" [(ngModel)]="project.boekjaar"/>
                     <button class="btn btn-primary form-control" (click)="getBegroting()">haal begroting op</button>
                    </div>
                 </section>

                 <section class="col-xs-12 form-inline" *ngIf="!errorMessage">
                      <h3>Project</h3>
                      <div class="section-content">
                        <div class="col-xs-12 form-group">
                            <label>Titel:</label>
                            <input type="text" [(ngModel)]="project.titel"/>
                        </div>
                        <div class="col-xs-12 form-group">
                            <label>Vraag:</label>
                            <input type="text" [(ngModel)]="project.vraag"/>
                        </div>

                        <div class="col-xs-12 col-md-6 form-group">
                            <label>ProjectScenario: {{project.projectScenario}}</label>
                            <select class="form-control" (change)="onSelectScenario($event)">
                                    <option *ngFor="#t of projectScene | keys" [value]="t.key">{{t.value}}</option>
                             </select>
                        </div>
                        <div class="col-xs-12 col-md-6 form-group">
                             <label>Bedrag:</label>
                            <input class="form-control" type="number" [(ngModel)]="project.bedrag"/>
                        </div>
                        <div class="col-xs-12 form-group">
                            <label>Extra info:</label>
                            <textarea rows="4" [(ngModel)]="project.extraInfo"></textarea>
                        </div>
                        <div class="col-xs-12 form-group">
                            <label>Afbeelding:</label>
                            <input  id="file" type="file" (change)="onChange($event)"/>
                            <img *ngIf="afb" [src]="afb" />
                        </div>
                      </div>
                </section>

                <section class="col-xs-12 form-inline" *ngIf="!errorMessage">
                     <div class="section-content">
             <div *ngFor="#catA of categorieen #i = index">
                <h5>categorie: {{catA.naamCat}}</h5>
                <p>totaal: {{catA.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[catA.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i,0,0, null, catA)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of catA.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,null, ac)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         </div>
                  <div *ngFor="#catB of catA.childCats #k = index">
                <h5>categorie: {{catB.naamCat}}</h5>
                <p>totaal: {{catB.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[catB.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i,k,0, catA, catB)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of catB.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,catB,ac)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         </div>
                       <div *ngFor="#catC of catB.childCats #l = index">
                <h5>categorie: {{catC.naamCat}}</h5>
                <p>totaal: {{catC.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[catC.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i,k,l, catB, catC)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of catC.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,catC, ac)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         </div>
                        </div>
                         
            </div>       
            </div>
              </div>
                </section>
                <button [hidden]="!errorMessage"(click)="editExistingProject()"class="btn btn-primary pull-right">opslaan</button>
            </div>

            <!-- NEW PROJECTS TAB-->
            <div id="new" class="tab-pane fade in active">
            <section class="col-xs-12 form-inline">
                    <h3>Voor welk boekjaar wenst u een nieuw Project op te stellen?</h3>
                    <div class="section-content">
                     <label>boekjaar:</label>
                     <input type="number" class="form-control" [(ngModel)]="project.boekjaar"/>
                     <button class="btn btn-primary form-control" (click)="getBegroting()">haal begroting op</button>
                    </div>
                 </section>
                <section class="col-xs-12 form-inline" *ngIf="!errorMessage">
                        <h3>Project</h3>

                        <div class="section-content">
                        <div class="col-xs-12 form-group">
                            <label>Titel:</label>
                            <input type="text" [(ngModel)]="project.titel"/>
                        </div>
                        <div class="col-xs-12 form-group">
                            <label>Vraag:</label>
                            <input type="text" [(ngModel)]="project.vraag"/>
                        </div>
                        <div class="col-xs-12 col-md-6 form-group">
                            <label>ProjectScenario: {{project.projectScenario}}</label>
                            <select class="form-control" (change)="onSelectScenario($event)">
                                    <option *ngFor="#t of projectScene | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                        </div>
                        <div class="col-xs-12 col-md-6 form-group">
                            <label>Bedrag:</label>
                            <input class="form-control" type="number" [(ngModel)]="project.bedrag"/>
                        </div>
                        <div class="col-xs-12 form-group">
                            <label>Extra info:</label>
                            <textarea rows="4" [(ngModel)]="project.extraInfo"></textarea>
                        </div>
                        <div class="col-xs-12 form-group">
                            <label>Afbeelding:</label>
                            <input  id="file" type="file" (change)="onChange($event)"/>
                            <img *ngIf="afb" [src]="afb" />
                        </div>
                        </div>
                </section>
                <section class="col-xs-12 form-inline" *ngIf="!errorMessage">
                        <h3>InspraakNiveaus vaststellen</h3>
                        <div class="section-content">
             <div *ngFor="#catA of categorieen #i = index">
                <h5>categorie: {{catA.naamCat}}</h5>
                <p>totaal: {{catA.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[catA.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i,0,0, null, catA)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of catA.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,null, ac)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         </div>
                  <div *ngFor="#catB of catA.childCats #k = index">
                <h5>categorie: {{catB.naamCat}}</h5>
                <p>totaal: {{catB.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[catB.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i,k,0, catA, catB)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of catB.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,catB,ac)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         </div>
                       <div *ngFor="#catC of catB.childCats #l = index">
                <h5>categorie: {{catC.naamCat}}</h5>
                <p>totaal: {{catC.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[catC.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i,k,l, catB, catC)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of catC.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,catC, ac)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         </div>
                        </div>
                         
            </div>       
            </div>
              </div>
                </section>
                <button [hidden]="!errorMessage" (click)="submit()"class="btn btn-primary pull-right">opslaan</button>

            </div>
        </div>
    </section>

`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ ProjectService],
    pipes: [KeysPipe]
    ,
    styles: [`

    section div {
        padding: 5px;
        box-sizing: border-box;
    }

    ::-webkit-file-upload-button {
        background: #2ac7d2;
        box-shadow: none;
        border:none;
        color:white;
        border-radius: 5px;
        padding: 5px;
    }

    input[type=file]{
        border: none;
    }

    .input-group {
        float: left;
        box-sizing: border-box;
    }

    li {
        list-style: none;
        margin-bottom: 10px;
    }

    .form-inline:nth-child(2) {
        border-top: 1px dashed lightgray;
    }

    section .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        overflow: auto;
    }

    textarea {
        width: 100% !important;
    }

    .inactive{
        opacity: 0.3;
    }

    .tabs {
        border-bottom: 1px solid lightgray;
        text-align: right;
    }

 `]
})

export class ManageProjectComponent {
    //TODO : make upload button dutch
    categorieen: GemeenteCategorie[];
    cat:GemeenteCategorie [];
    niveaus = InspraakNiveau;
    projectScene = ProjectScenario;
    isNewProject: boolean = true;
    project: Project = new Project("");
    town:string;
    id: number;
    errorMessage:any;
    errorMessage2:any;
    submitProject:boolean=true;
    afb: string;
    constructor(
        private _routeParams: RouteParams, private _projectService:ProjectService, private _router: Router, injector:Injector) {
        this.town = injector.parent.parent.get(RouteParams).get('town');
    }


    getBegroting(){
        //Todo: get the project details

        this.errorMessage="";
        this._projectService.getInspraakitems(this.project.boekjaar,this.town)
            .subscribe((finan: any) => this.categorieen = finan,
                (err:any) => this.errorMessage = err
            );
    }

    onChange = (event: any)=>{
        this.loadimage(event.target.files[0], (img: string) =>{
            this.afb =  img;
        });
    }

    loadimage = (img: string, cb: any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function() {
            let result = reader.result;
            cb(result);
        }
    }

    onSelectCatNiveau(event: any, iA: number, iB: number, iC: number,catParent: GemeenteCategorie, cat: GemeenteCategorie)
    {
        var inspraak = event.target.value;
        switch (cat.catType)
        {
            case "A" :
                this.categorieen[iA].inspraakNiveau = inspraak;
                if(inspraak == 2) {
                    this.changeInspraak(this.categorieen[iA].childCats, 2);
                    if (this.categorieen[iA].acties != null) {
                        for (var j = 0; j < this.categorieen[iA].acties.length; j++) {
                            this.categorieen[iA].acties[j].inspraakNiveau = 2;
                        }
                    }
                }
                break;
            case "B" :
                if(catParent.inspraakNiveau !=2)
                {
                    this.categorieen[iA].childCats[iB].inspraakNiveau = inspraak;
                    if(inspraak == 2) {
                        this.changeInspraak(this.categorieen[iA].childCats[iB].childCats, 2);
                        if (this.categorieen[iA].childCats[iB].acties != null) {
                            for (var j = 0; j < this.categorieen[iA].childCats[iB].acties.length; j++) {
                                this.categorieen[iA].childCats[iB].acties[j].inspraakNiveau = 2;
                            }
                        }
                    }
                }
                break;
            case "C" :
                if(catParent.inspraakNiveau !=2)
                {
                    this.categorieen[iA].childCats[iB].childCats[iC].inspraakNiveau = inspraak;
                    if(inspraak == 2) {
                        if (this.categorieen[iA].childCats[iB].childCats[iC].acties != null) {
                            for (var j = 0; j < this.categorieen[iA].childCats[iB].childCats[iC].acties.length; j++) {
                                this.categorieen[iA].childCats[iB].childCats[iC].acties[j].inspraakNiveau = 2;
                            }
                        }
                    }
                }
                break;

        }




    }

    changeInspraak(childs : GemeenteCategorie[], inspraak:number)
    {
        if(childs != null)
        {

            for( var i = 0; i < childs.length ; i++)
            {
                //niv B
                childs[i].inspraakNiveau = inspraak;
                if(childs[i].acties != null )
                {
                    for (var j = 0; j < childs[i].acties.length ; j++)
                    {
                        childs[i].acties[j].inspraakNiveau = inspraak;
                    }
                }
                //niv c
                if(childs[i].childCats.length != null)
                {
                    this.changeInspraak(childs[i].childCats, inspraak)
                }
            }
        }
    }
    

    onSelectActieNiveau(event: any, cat:GemeenteCategorie,ac:Actie)
    {
        //actie mag je enkel veranderen als de parent niet gelocked is
        if(cat.inspraakNiveau != 2)
        {
            ac.inspraakNiveau = event.target.value;
        }

    }

    onSelectScenario(event: any)
    {
        this.project.projectScenario = event.target.value;
    }

    submit = ()=>
    {
        this.errorMessage2="";
        this.project.cats = this.categorieen;

        this.project.isActief=true;
        this.project.gemeente = this.town;
        this._projectService.putProject(this.project).subscribe(
            (id: any) => this.id = id,
            (err:any) => this.errorMessage2 = err
        );

        //   this._router.navigate(['MainTown', { town: this.town}]);

    }

    editExistingProject = () =>
    {
        console.log('hello');
        //TODO: write webapi for editing existing project
        this._router.navigate(['/', 'App','Budget', { town: this.town}]);


    }
}