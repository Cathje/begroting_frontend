import {Component, Injector, ElementRef, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';

import {SunburstComponent} from './../../subComponents/graphs/sunburst.component';
import {BegrotingService} from "../../../services/begrotingService";
import {Actie} from "../../../models/actie";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";
import {Categorie} from "../../../models/categorie";
import {CATEGORIES} from "../../../defaults/categories";
import {BestuurType} from "../../../models/bestuurType";
import {SelectorComponent} from './../../subComponents/input/selector.component';
import {StyledDirective} from '../../../directives/styled';

@Component({
    selector: 'expenses-container',
    template: `
        <div class="container">

        <p *ngIf="errorMessage" class="alert alert-danger">{{errorMessage}}</p>

        <section class="intro col-xs-12">
            <h1>De uitgaven van {{town}}</h1>
            <p>Bekijk hieronder de uitgaves van de gemeente {{town}}. Klik op een categorie naar keuze om de specifieke acties te bekijken of beweeg met je muis over een categorie in de legende om meer informatie te verkrijgen over de desbetreffende categorie.</p>


        <div class="main-content">
            <div class="graph col-xs-12 col-sm-8" (window:resize)="onResize($event)">
                <sunburst [data]=data [onClick]=onCircleClick [onHover]=onHover [height]=width [width]=width></sunburst>
                <div class="button-menu">
                    <selector defaultOption="Kies een jaar" [options]="years" (change)="onSelectYear($event, town)"></selector>
                    <div class="btn-group">
                      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" styled>
                        <span class="glyphicon glyphicon-plus"></span>
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" [routerLink]="['Comparison']">Vergelijk 2 gemeentes</a>
                        <a class="dropdown-item" [routerLink]="['/', 'App',  {town: town}, 'Participation', 'AddPropositions']">Doe een voorstel</a>
                        <a class="dropdown-item" [routerLink]="['Taxes']">Vergelijk met salaris</a>
                        <a class="dropdown-item" [routerLink]="['/', 'App', {town: town}, 'Participation', 'Projects']">Begrotingsvoorstellen</a>
                      </div>
                    </div>
                </div>
            </div>

            <div *ngIf="!hoveredCategory" class="legend col-xs-12 col-sm-4 ">
                <ul>
                    <li *ngFor="#category of headCategories">
                        <span class="{{' colorblock glyphicon '+ checkIconAvailable(category.icoon, category.naam)}}" style="{{'background-color:' + checkColorAvailable(category.kleur, category.naam)}}"></span>
                        {{category.naam}}
                    </li>
                </ul>
            </div>

             <div class="legend col-xs-12 col-sm-4 " *ngIf="hoveredCategory">
                        <h4>{{hoveredCategory.name}}</h4>
                        <img *ngIf="hoveredCategory.foto !== null" [src]="headCategories[7].foto"/>
                        <h5> Beschrijving</h5>
                        {{hoveredCategory.input}}
                        <span *ngIf="!hoveredCategory.input"> Er is geen beschrijving beschikbaar voor deze categorie.</span>
                        <h5 *ngIf="hoveredCategory.film"> Bekijk de video</h5>
                        <iframe *ngIf="hoveredCategory.film" width="100%" [src]="film" frameborder="0" allowfullscreen></iframe>
             </div>

        </div>


        <!-- Modal Actions-->
        <div class="modal bottom fade" id="actions" tabindex="-1" role="dialog" aria-labelledby="actions">
		    <div class="modal-dialog" role="document">
			    <div class="modal-content">
                    <div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					    <h4 class="modal-title" id="actions">Acties</h4>
				    </div>
				<div class="modal-body">
					 <table class="table table-striped">
                        <tbody>
                            <tr *ngFor="#actie of acties">
                                <td>{{actie.actieLang}}</td>
                                <td>
                                    <span class="glyphicon glyphicon-user"></span>
                                    <span>{{types[3]}}</span>
                                </td>
                            </tr>
                        </tbody>
                      </table>
				</div>
			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->


`,
    directives: [SunburstComponent,ROUTER_DIRECTIVES, SelectorComponent, StyledDirective],
    providers: [BegrotingService],
    styles: [`
    li {
        list-style: none;
        display: flex;
        align-items: center;

    }

    li .glyphicon {
        font-size: 0.8em;
        color: white;
    }

    .glyphicon-info-sign{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5em;
    }

    .colorblock {
        margin: 5px;
        padding: 8px;
        border-radius: 5px;
    }

    .button-menu {
        display:flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .dropdown-menu{
        padding: 0;
    }

    .dropdown-menu a{
        color:black !important;
        padding:5px;
        display:block;
        border: 1px solid lightgray;
    }

    .legend {
        border: 1px solid lightgray;
        padding: 10px;
    }

    .legend img {
        border: 3px solid white;
        box-shadow: 2px 2px 2px lightgray;
    }

    .main-content {
        padding-top: 10px;

    }

    .panel-heading {
        background-color: gray;
    }

    .panel-collapse {
        padding: 10px;
    }


`]
})

export class ExpensesComponent {
    town: string;
    acties: Actie[]=[];
    id:number;
    years:number[];
    errorMessage:string;
    data: GemeenteCategorie [] = [];
    headCategories: Categorie [] = CATEGORIES;
    types = BestuurType;
    windowWidth = window.innerWidth;
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/2.5;
    hoveredCategory: any;
    film:string = "https://youtu.be/A8Cfc62xdMo?&autoplay=1";

    constructor (private elementRef: ElementRef, private _begrotingService:BegrotingService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {
        this.town = injector.parent.parent.parent.parent.get(RouteParams).get('town');
        this.years = this._getYears();

        _begrotingService.getGemeenteCategorieen(2019,this.town)
            .subscribe((finan: any) => this.data = finan,
                (err:any) => this.errorMessage = "Er zijn geen grafiekgegevens gevonden."
            );

    }

    onCircleClick: any = (id: number) => {
        //TODO: replace hardcoded id with parameter
        this.errorMessage="";
        this._begrotingService.getActies(id)
            .subscribe((acties : any) => this.acties = acties,
                (err:any) => this.errorMessage = "Er zijn geen acties gevonden.");
    };

    onHover: any = (d:any) => {
        this.hoveredCategory = d;
        this.film = this.hoveredCategory.film+"?autoplay=1";
    };

    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/2.5;

        }
        this.windowWidth = window.innerWidth;
        console.log("11",this.acties);
    }

    onSelectYear: any = (event: any, town: string) => {
        this._begrotingService.getGemeenteCategorieen(event.target.value,town)
            .subscribe((finan: any) => this.data = finan,
                (err:any) => this.errorMessage = "Er zijn geen grafiekgegevens gevonden."
            );
    }

    _getYears = () => {
        const currentYear: number = new Date().getFullYear();
        const years: number[] = [];
        for(let i=0; i < 5; i++){
            years.push(currentYear + i)
        }
        return years;
    }

    checkIconAvailable = (defaultIcon : string, categorieNaam: string) => {
    var filteredData = this.data.filter((obj) => {
        if (obj['naamCat'] === categorieNaam) {
            return true;
        }
        return false;
    });
    console.log("666",filteredData[0]);
    return filteredData[0]? filteredData[0]['icoon'] : defaultIcon;
}

    checkColorAvailable = (defaultColor : string, categorieNaam: string) => {
        var filteredData = this.data.filter((obj) => {
            if (obj['naamCat'] === categorieNaam) {
                return true;
            }
            return false;
        });
        console.log("666",filteredData[0]);
        return filteredData[0]? filteredData[0]['kleur'] : defaultColor;
    }

}

