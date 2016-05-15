import {Component, Injector} from 'angular2/core';
import {TownService} from './../../../services/townService.component.js';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';
import {TownSelectorComponent} from './../../subComponents/input/townSelector.component.js';
import {EditableFieldComponent} from './../../subComponents/input/editableField.component.js';
import {MainTown} from "../../../models/mainTown.js";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component.js';
import {BegrotingService} from "../../../services/begrotingService.js";
import {Actie} from "../../../models/actie.js";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie.js";
import {PoliticusType} from "../../../models/politicusType.js";


@Component({ //invoke with metadata object
    selector: 'core-data-container',
    template: `
        <div class="container">
        <section class="intro col-xs-12">
            <h1>De kerngegevens van {{mainTown?.naam}}</h1>
            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
        </section>

        <section class="demographic col-xs-12 col-sm-12">
        <h2>Demografische gegevens</h2>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                         <img class='icon' src="/app/images/icons/population.png">
                        <h4>Aantal bewoners</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.aantalBewoners"></editable-field>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class='icon' src="/app/images/icons/man.png">
                        <h4>Aantal mannen</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.isMan"></editable-field>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class='icon' src="/app/images/icons/woman.png">
                        <h4>Aantal vrouwen</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.isVrouw"></editable-field>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class='icon' src="/app/images/icons/child.png">
                        <h4>Aantal kinderen</h4>
                        <editable-field [isEditable]="isEditor" [data]="mainTown.isKind"></editable-field>
                    </div>
        </section>


         <!-- HIER KOMEN DE ACTIES DIE BINNEN EEN BEPAALDE CATEGORIE ZITTEN-->
        <section id="geographic" class="col-xs-12 col-sm-12">
        <h2>Geografische gegevens</h2>
                    <div class='col-xs-6 col-md-6'>
                      <img src={{imglink}} class="provincie">
                     </div>
                     <div class='col-xs-6 col-md-6'>
                     <h4>Provincie:</h4>
                     <span>{{mainTown.provincie}}</span>

                     <h4>Oppervlakte:</h4>
                        <span>{{mainTown.oppervlakte}}{{mainTown.oppervlakteMaat}}</span>
                    <h4>Deelgemeenten: </h4>
                        <ul *ngIf="mainTown?.deelGemeenten" >
                            <li *ngFor="#town of mainTown.deelGemeenten"><span>{{town.naam}} - {{town.postCode}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.deelGemeenten"><i>Er zijn geen deelgemeentes</i></p>
                    <h4>Bestuur: </h4>
                        <ul *ngIf="mainTown?.bestuur" >
                            <li *ngFor="#b of mainTown.bestuur"><span>{{b.naam}} - {{types[b.type]}}</span></li>
                        </ul>
                        <p *ngIf="!mainTown.bestuur"><i>Er zijn geen gegevens over het bestuur</i></p>
                    </div>
        </section>

       </div>
`,
    directives: [TownSelectorComponent, EditableFieldComponent, SunburstComponent,ROUTER_DIRECTIVES],
    providers: [ BegrotingService,
        TownService,  //routing
    ],
    styles: [`

    .icon {
    max-width: 200px;
    margin: 10px;
    }

    h2 {
    text-align: left;
    margin: 20px 0;
    }

    h3 {
    margin: 0;
    padding-bottom: 1%;
    font-size: 3rem;
    color: white;
    }


    h4{
    margin-bottom: 0;
    }

    .container {
    max-width: 1200px;
    }

    .noData {
    font-size: 1.3em;
    margin-top: 150px;
    text-align: center;
    }
    .comparebtn {
    position: absolute;
    top: 20px;
    left: 0px;
    }

    .salarybtn {
    position: absolute;
    top: 100px;
    left: 0px;
    }

    .propositionsbtn {
    position: absolute;
    top: 60px;
    left: 0px;
    }

    .proposebtn {
    position: absolute;
    top: 140px;
    left: 0;
    }

    #info-town   {
    padding: 1%;
    flex-shrink: 2; 
    -webkit-flex-shrink: 2;
    }

    .intro {
    padding: 20px;
    }

    .clearfix:after {
    content: " ";
   display: block;
   height: 0;
   clear: both;
    }

    .provincie {
    }
    .graph {
    padding: 40px 20px;
    text-align: center;
    margin: O auto;
    position: relative;
    }

    .pointer p{
     display: inline-block;
    }

    .pointer h3 {
    color:black;
    }

    .pointer {
    margin-top: 20px;
    }

    .pointer ul {
    overflow: scroll;
    height: 400px;
    border: 1px dashed black;
    padding:20px;
    }

    .pointer li {
    padding: 5px;
    }

    .demographic{
    text-align: center;
    }

    .geographic {
    padding: 1%;
    margin-left: 1%;
    flex: 1;
    -webkit-flex-grow: 1;
    text-align: right;
    }
        
    #actions   {
    padding: 1%;
    margin-left: 1%;
    flex: 1; 
    -webkit-flex-grow: 1;

    }


    label {
    display:block;
    }
    
    .showInfo{
        float: right;
        background: #3498db;
         background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
         background-image: -moz-linear-gradient(top, #3498db, #2980b9);
         background-image: -ms-linear-gradient(top, #3498db, #2980b9);
         background-image: -o-linear-gradient(top, #3498db, #2980b9);
         background-image: linear-gradient(to bottom, #3498db, #2980b9);
         width: 55%;
         color: #ffffff;
         text-decoration: none;
         font-size: 0.8em;
    }

    
`]
})

export class CoreDataComponent {
    title = 'Gemeente - home';
    imglink: string = "";
    name:string = "";
    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable = false;
    contentbutton="meer info";
    acties: Actie[];
    showActions = false;
    types = PoliticusType;
    id:number;
    isEditor: boolean = false; //TODO: adapt value when signed in with special role
    categories: GemeenteCategorie [] =
    [{ID:24,naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",totaal: 22781},
{ID:24, naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",totaal:281},
{ID:24,naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen", totaal:3311},
{ID:24,naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",totaal:906}];
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/2.5;

    onCircleClick: any = (id: number) => {
        this.showActions = true;
        //TODO: replace hardcoded 15 with id
       this._begrotingService.getActies(15)
           .subscribe((acties : any) => this.acties = acties);
    };

    constructor(private _townService:TownService, private _begrotingService:BegrotingService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(town => {
                this.mainTown = town;
                this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') +".png";
                }
             );

        _begrotingService.getGemeenteCategorieen(2020,"Gent")
           .subscribe((finan: any) => this.categories = finan
            );

    }

    ngOnInit() {
        /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
        EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
        //this.name = this._routeParams.get('town');
    }


    public toggle(): void
    {
        this.isVisable = !this.isVisable;
    }


    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/2.5;

        }
    }

}

