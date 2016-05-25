import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownService} from "../../../services/townService.component";
import {MainTown} from "../../../models/mainTown";
import {Faq} from "../../../models/faq";
import {StyledDirective} from '../../../directives/styled';
import {BegrotingService} from "../../../services/begrotingService";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";
import {ICONS} from '../../../constants/icons'

declare var jQuery: any;

@Component({
    selector: 'manage-categories-container',
    template: `
    <p class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</p>
    <section class="container">
        <h1>Instellingen categorieën {{mainTown?.naam}}</h1>

        <section class="col-xs-12 form-inline">
            <h3>Instellingen kleuren en iconen</h3>
            <table class="section-content table table-striped" >
            <thead>
            <th>Naam categorie</th>
            <th>Kleur</th>
            <th>Icoon</th>
            </thead>
            <tbody>
            <tr *ngFor="#gemeenteCat of gemeenteCategorieen">
                    <td>{{gemeenteCat.naam}}</td>
                   <td><input class="form-control" type="text" [(ngModel)]="gemeenteCat.kleur"/></td>
                   <td> <span>{{gemeenteCat.icoon}}</span>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#icons"  styled >
                        <span class="glyphicon glyphicon-eye-open" (click)="onShowIcons(gemeenteCat)"></span>
                      </button>
                      </td>

                      </tr>
                      </tbody>
            </table>
                <button class="btn btn-primary pull-right" (click)="saveCategories()" styled >Opslaan</button>
        </section>

        <section class="col-xs-12 form-inline">
            <h3>Instellingen extra materiaal per categorie</h3>
            <table class="section-content table table-striped" >
            <thead>
            <th>Naam categorie</th>
            <th>Youtube url</th>
            <th>Extra info</th>
            <th>Afbeelding</th>
            </thead>
            <tbody>
            <tr *ngFor="#gemeenteCat of gemeenteCategorieen">
                    <td>{{gemeenteCat.naam}}</td>
                   <td><input class="form-control" type="text" [(ngModel)]="gemeenteCat.film"/></td>
                   <td><input class="form-control" type="text" [(ngModel)]="gemeenteCat.input"/></td>
                   <td> <label for="file"> <span class="btn filebtn btn-primary" styled>Selecteer afbeelding</span>
                            </label>
                            <input id="file" class="form-control inputfile" (change)="onChange($event, gemeenteCat)" type="file" name="file">
                      </td>

                      </tr>
                      </tbody>
            </table>
                <button class="btn btn-primary pull-right" (click)="saveCategories()" styled >Opslaan</button>
        </section>

         <!-- Modal Icons-->
        <div class="modal bottom fade" id="icons" tabindex="-1" role="dialog" aria-labelledby="icons">
		    <div class="modal-dialog" role="document">
			    <div class="modal-content">
                    <div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					    <h4 class="modal-title" id="icons">Iconen</h4>
				    </div>
				<div class="modal-body">
					 <div class="icons" >
					    <span *ngFor="#icon of icons" [class]="icon" (click)="onSelectIcon($event)" data-toggle="modal" data-target="#icons"></span>
					 </div>
				</div>
			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->

    `,
    providers: [TownService, BegrotingService],
    directives: [ROUTER_DIRECTIVES, StyledDirective, ],
    styles: [`


    section .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        overflow: auto;
    }
    th {
        padding: 8px;
    }

    .icons span {
            display: inline-block;
            font-size: 2em;
            padding: 5px;
    }

    ::-webkit-file-upload-button {
            background: gray;
            box-shadow: none;
            border: none;
            color: white;
            border-radius: 5px;
            padding: 5px;
    }

    input[type=file] {
            border: none;
    }

    .input-group {
            float: left;
            box-sizing: border-box;
    }

    onChange = (event:any)=> {
        this.loadimage(event.target.files[0], (img:string) => {
            this.afb = img;
        });
    }

    loadimage = (img:any, cb:any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
            let result = reader.result;
            cb(result);
        }
    }

    `]
})

export class ManageCategoriesComponent {

    mainTown = new MainTown("", "", 0, 0);
    faq = new Faq("", "");
    afb:string;
    id:number;
    errorMessage:string;
    icons:string[] = ICONS;
    selectedGemeenteCat:GemeenteCategorie;
    gemeenteCategorieen:GemeenteCategorie[] = [{kleur: "red", icoon: "glyphicon glyphicon-ok"}];


    constructor(private _begrotingService:BegrotingService, private _routeParams:RouteParams, private _townService:TownService, private _router:Router, injector:Injector) {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:MainTown) => this.mainTown = town,
                (err:any) => this.errorMessage = "Geen stad gevonden"
            );

        _begrotingService.getGemeenteCategorieen(2020, "Gent")
            .subscribe((finan:any) => this.gemeenteCategorieen = finan,
                (err:any) => this.errorMessage = "Er zijn geen grafiekgegevens gevonden."
            );
    }

    onSelectIcon = (event:any) => {
        this.selectedGemeenteCat.icoon = event.target.className;
    }

    onShowIcons = (gemeenteCat:GemeenteCategorie) => {
        this.selectedGemeenteCat = gemeenteCat;
    }

    saveCategories = () => {
        this._begrotingService.putCategorieInput(this.gemeenteCategorieen)
            .subscribe((finan:any) => this.gemeenteCategorieen = finan,
                (err:any) => this.errorMessage = "Er zijn geen grafiekgegevens gevonden."
            );
    }

    onChange = (event:any, gemeenteCat: GemeenteCategorie)=> {
        this.loadimage(event.target.files[0], (img:string) => {
            gemeenteCat.foto = img;
        });
    }

    loadimage = (img:any, cb:any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
            let result = reader.result;
            cb(result);
        }
    }
}