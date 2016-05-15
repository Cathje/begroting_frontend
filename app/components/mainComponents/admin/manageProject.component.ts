import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {KeysPipe} from "../../../pipes/keysPipe.js";
import {ProjectService} from "../../../services/projectService.component.js";
import {NavigationMenuComponent} from "../../subComponents/nav/menu.component.js";
import {InspraakCategorie} from "../../../models/dto/inspraakCategorieDTO.js";
import {InspraakNiveau} from "../../../models/inspraakNiveau.js";
import {Project} from "../../../models/project.js";
import {ProjectScenario} from "../../../models/projectScenario.js";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie.js";


@Component({ //invoke with metadata object
    selector: 'manage-project-container',
    template: `
<div class="container">
    <h2>Beheer project</h2><h4>Titel:</h4>
     
     <input type="text" [(ngModel)]="project.titel"/>
     <h4>boekjaar:</h4>
     <input type="number" [(ngModel)]="project.boekjaar"/>
     <h4>gemeente:</h4>
     <input type="text" [(ngModel)]="project.gemeente"/>
     <h4>vraag:</h4>
     <input type="text" [(ngModel)]="project.vraag"/>
     <h4>ProjectScenario:</h4>
     <p>{{project.projectScenario}}</p>
                <select (change)="onSelectScenario($event)">
                        <option *ngFor="#t of projectScene | keys" [value]="t.key">{{t.value}}</option>
                 </select>
     <h4>extraInfo:</h4>
     <input type="text" [(ngModel)]="project.extraInfo"/>  <!--@TODO wijzigen naar textarea -->
     <h4>Bedrag:</h4>
     <input type="number" [(ngModel)]="project.bedrag"/>
    
    
    <h2>InspraakNiveaus vaststellen</h2>
             <div *ngFor="#cat of categorieen #i = index"> 
                <h5>categorie: {{cat.naamCatz}}</h5>
                <h5>ID: {{cat.ID}}</h5>
                <h5>gemCatId: {{cat.gemcatID}}</h5>
                <p>totaal: {{cat.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>
                
                <select (change)="onSelectCatNiveau($event, i)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                    <br>    
                         <div class="acties" *ngFor="#ac of cat.acties #j = index"> 
                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>
                            <p> uitgave: {{ac.uitgaven}}</p>
                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>
                            <select (change)="onSelectActieNiveau($event,i,j)">
                                <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                            </select>
                         <div>
                    </div> 
            </div> 
                               <br><br>

</div>
   <button (click)="submit()">opslaan</button>           
</div>
`,
    directives: [ROUTER_DIRECTIVES, NavigationMenuComponent],
    providers: [ ProjectService//routing
    ],
    pipes: [KeysPipe]
    ,
    styles: [`
 .acties{
 
    padding-left: 4em; 
 }
 
 `]
})

export class ManageProjectComponent {

    categorieen: GemeenteCategorie[];
    cat:GemeenteCategorie [];
    niveaus = InspraakNiveau;
    projectScene = ProjectScenario;
    project: Project = new Project("");
    town:string = "Gent";
    constructor(
        private _routeParams: RouteParams, private _projectService:ProjectService, private _router: Router) {

        _projectService.getInspraakitems(2020,"Gent")
            .subscribe((finan: any) => this.categorieen = finan
            );
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }

    onSelectCatNiveau(event: any, i:any)
    {
        this.cat  = this.categorieen.filter(
            (cat:any) => cat.ID === this.categorieen[i].gemcatID);

        if(event.target.value == 2)
        {
            this.categorieen[i].inspraakNiveau = event.target.value;
            this.changeInspraak(event.target.value, i);



        }
        else {
            if(this.cat.length==0)
            {
                alert("A");
                this.categorieen[i].inspraakNiveau = event.target.value;
            }
            if( this.cat.length != 0 && this.cat[0].inspraakNiveau !=2)
            {
                alert("lower cat: " + this.cat[0].inspraakNiveau);

                this.categorieen[i].inspraakNiveau = event.target.value;
            }

        }

    }

    changeInspraak(inspraak:number, i:number)
    {
        //CAT A

        if(this.categorieen[i].acties != null)
        {
            for (let k = 0; k < this.categorieen[i].acties.length; k++)
            {
                this.categorieen[i].acties[k].inspraakNiveau = 2;
            }
        }

        for (let j = 0; j < this.categorieen.length; j++)
        {
            if( this.categorieen[j].gemcatID == this.categorieen[i].ID)
            {
                //CAT B
                this.categorieen[j].inspraakNiveau = 2;
                if(this.categorieen[j].acties != null)
                {
                    for (let k = 0; k < this.categorieen[j].acties.length; k++)
                    {
                        this.categorieen[j].acties[k].inspraakNiveau = 2;
                    }
                }


                for (let a = 0; a < this.categorieen.length; a++)
                {
                    if( this.categorieen[a].gemcatID == this.categorieen[j].ID)
                    {
                        //CAT C
                        this.categorieen[a].inspraakNiveau = 2;
                        if(this.categorieen[a].acties != null)
                        {
                            for (let k = 0; k < this.categorieen[a].acties.length; k++)
                            {
                                this.categorieen[a].acties[k].inspraakNiveau = 2;
                            }
                        }

                    }
                }

            }
        }
    }

    onSelectActieNiveau(event: any, i:any, j:any)
    {
        //actie mag je enkel veranderen als de parent niet gelocked is
        if(this.categorieen[i].inspraakNiveau != 2)
        {
            this.categorieen[i].acties[j].inspraakNiveau = event.target.value;
        }

    }

    onSelectScenario(event: any)
    {
        this.project.projectScenario = event.target.value;
    }

    submit()
    {
        this.project.categorieen = this.categorieen;
        this._projectService.putProject(this.project).subscribe();
        // this._router.navigate(['MainTown', { town: this.town}]);

    }
}