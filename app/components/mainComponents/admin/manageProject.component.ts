import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {KeysPipe} from "../../../pipes/keysPipe.js";
import {ActieService} from "../../../services/ActieService.js";
import {ProjectService} from "../../../services/projectService.component.js";
import {NavigationMenuComponent} from "../../subComponents/nav/menu.component.js";
import {InspraakCategorie} from "../../../models/dto/inspraakCategorieDTO.js";
import {InspraakNiveau} from "../../../models/inspraakNiveau.js";
import {Project} from "../../../models/project.js";
import {ProjectScenario} from "../../../models/projectScenario.js";


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
                <p>totaal: {{cat.totaal}}</p>
                <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>
                <select (change)="onSelectNiveau($event, i)">
                        <option *ngFor="#t of niveaus | keys" [value]="t.key">{{t.value}}</option>
                         </select>
                </div>
                
                <button (click)="submit()">opslaan</button>
              
</div>
`,
    directives: [ROUTER_DIRECTIVES, NavigationMenuComponent],
    providers: [ ProjectService,ActieService//routing
    ],
    pipes: [KeysPipe]
})

export class ManageProjectComponent {

    categorieen: InspraakCategorie[];
    niveaus = InspraakNiveau;
    projectScene = ProjectScenario;
    project: Project = new Project("");
    town:string = "Gent";
    constructor(
        private _routeParams: RouteParams, private _projectService:ProjectService, private _router: Router) {

        _projectService.getInspraakcategorieen(2020,"Gent")
            .subscribe((finan: any) => this.categorieen = finan
            );
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }

    onSelectNiveau(event: any, i:any)
    {
        this.categorieen[i].inspraakNiveau = event.target.value;
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