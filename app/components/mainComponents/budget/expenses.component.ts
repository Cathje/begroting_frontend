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
                        <span class="{{' colorblock glyphicon '+ checkIconAvailable(category.icoon, category.name)}}" style="background-color: {{category.kleur}};"></span>
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
                        <iframe *ngIf="hoveredCategory.film" width="100%" [src]="hoveredCategory.film+'?rel=0&autoplay=1'" frameborder="0" allowfullscreen></iframe>
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
        max-width: 300px;
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
    acties: Actie[];
    id:number;
    years:number[];
    errorMessage:string;
    data: GemeenteCategorie [] = [{"ID":22,"naamCat":"Zorg en opvang","catA":"Zorg en opvang","totaal":71069008607,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":23,"naamCat":"Sociaal beleid","catA":"Zorg en opvang","catB":"Sociaal beleid","totaal":6.09997E+07,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":24,"naamCat":"Sociale bijstand","catA":"Zorg en opvang","catB":"Sociaal beleid","catC":"Sociale bijstand","totaal":58133804.0,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":30,"naamCat":"Dienst voor juridische informatie en advies","catA":"Zorg en opvang","catB":"Sociaal beleid","catC":"Dienst voor juridische informatie en advies","totaal":262774.8,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":63,"naamCat":"Sociale huisvesting","catA":"Zorg en opvang","catB":"Sociale huisvesting","totaal":363442.3,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":64,"naamCat":"Sociale huisvesting","catA":"Zorg en opvang","catB":"Sociale huisvesting","catC":"Sociale huisvesting","totaal":363442.3,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":68,"naamCat":"Activering van tewerkstelling","catA":"Zorg en opvang","catB":"Sociaal beleid","catC":"Activering van tewerkstelling","totaal":2603125.25,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":82,"naamCat":"Ouderen","catA":"Zorg en opvang","catB":"Ouderen","totaal":9706714.0,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":83,"naamCat":"Overige verrichtingen betreffende ouderen","catA":"Zorg en opvang","catB":"Ouderen","catC":"Overige verrichtingen betreffende ouderen","totaal":189167.063,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":88,"naamCat":"Dienstencentra","catA":"Zorg en opvang","catB":"Ouderen","catC":"Dienstencentra","totaal":2290145.25,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":137,"naamCat":"Assistentiewoningen","catA":"Zorg en opvang","catB":"Ouderen","catC":"Assistentiewoningen","totaal":561507.6,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":149,"naamCat":"Algemeen bestuur","catA":"Algemeen bestuur","totaal":2774508.5,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":150,"naamCat":"Algemene diensten","catA":"Algemeen bestuur","catB":"Algemene diensten","totaal":2739689.25,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":151,"naamCat":"Personeelsdienst en vorming","catA":"Algemeen bestuur","catB":"Algemene diensten","catC":"Personeelsdienst en vorming","totaal":885426.063,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":169,"naamCat":"Overige algemene diensten","catA":"Algemeen bestuur","catB":"Algemene diensten","catC":"Overige algemene diensten","totaal":1321554.13,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":183,"naamCat":"Archief","catA":"Algemeen bestuur","catB":"Algemene diensten","catC":"Archief","totaal":60048.84,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":188,"naamCat":"Organisatiebeheersing","catA":"Algemeen bestuur","catB":"Algemene diensten","catC":"Organisatiebeheersing","totaal":2566.25,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":195,"naamCat":"Secretariaat","catA":"Algemeen bestuur","catB":"Algemene diensten","catC":"Secretariaat","totaal":221096.25,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":198,"naamCat":"Politieke organen","catA":"Algemeen bestuur","catB":"Politieke organen","totaal":34819.28,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":199,"naamCat":"Politieke organen","catA":"Algemeen bestuur","catB":"Politieke organen","catC":"Politieke organen","totaal":34819.28,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":207,"naamCat":"Fiscale en financiële diensten","catA":"Algemeen bestuur","catB":"Algemene diensten","catC":"Fiscale en financiële diensten","totaal":248998.078,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":214,"naamCat":"Woon- en zorgcentra","catA":"Zorg en opvang","catB":"Ouderen","catC":"Woon- en zorgcentra","totaal":6615400.0,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":218,"naamCat":"Dagzorgcentra","catA":"Zorg en opvang","catB":"Ouderen","catC":"Dagzorgcentra","totaal":50494.86,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":236,"naamCat":"Algemene financiering","catA":"Algemene financiering","totaal":403532.375,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":237,"naamCat":"Algemene financiering","catA":"Algemene financiering","catB":"Algemene financiering","totaal":403532.375,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":238,"naamCat":"Financiële aangelegenheden","catA":"Algemene financiering","catB":"Algemene financiering","catC":"Financiële aangelegenheden","totaal":12554.87,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":240,"naamCat":"Transacties in verband met de openbare schuld","catA":"Algemene financiering","catB":"Algemene financiering","catC":"Transacties in verband met de openbare schuld","totaal":17553.2,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null},{"ID":243,"naamCat":"Patrimonium zonder maatschappelijk doel","catA":"Algemene financiering","catB":"Algemene financiering","catC":"Patrimonium zonder maatschappelijk doel","totaal":373424.3,"inputID":null,"input":null,"icoon":null,"foto":null,"film":null,"kleur":null}];
    headCategories: Categorie [] = CATEGORIES;
    types = BestuurType;
    windowWidth = window.innerWidth;
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/2.5;
    hoveredCategory: any;

    constructor (private elementRef: ElementRef, private _begrotingService:BegrotingService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {
        this.town = injector.parent.parent.parent.parent.get(RouteParams).get('town');
        this.years = this._getYears();

        _begrotingService.getGemeenteCategorieen(2020,"Gent")
            .subscribe((finan: any) => this.data = finan,
                (err:any) => this.errorMessage = "Er zijn geen grafiekgegevens gevonden."
            );

    }

    onCircleClick: any = (id: number) => {
        //TODO: replace hardcoded id with parameter
        this._begrotingService.getActies(24)
            .subscribe((acties : any) => this.acties = acties,
                (err:any) => this.errorMessage = "Er zijn geen acties gevonden.");
    };

    onHover: any = (d:any) => {
        this.hoveredCategory = d;
    };

    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/2.5;

        }
        this.windowWidth = window.innerWidth;
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

        return filteredData[0]? filteredData[0]['icoon'] : defaultIcon;
    }

}

