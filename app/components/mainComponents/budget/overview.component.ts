import {Component, Injector} from 'angular2/core';
import {TownService} from './../../../services/townService.component.js';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';
import {TownSelectorComponent} from './../../subComponents/input/townSelector.component.js';
import {EditableFieldComponent} from './../../subComponents/input/editableField.component.js';
import {MainTown} from "../../../models/mainTown.js";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component.js';
import {BegrotingService} from "../../../services/begrotingService.js";
import {ActieService} from "../../../services/ActieService.js";
import {Actie} from "../../../models/actie.js";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie.js";
import {TownService} from "../../../services/townService.component.js";
import {Actie} from "../../../models/actie.js";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";


@Component({ //invoke with metadata object
    selector: 'overview-container',
    template: `
        <div class="overview-container">
        <div class="container">
        <div class="intro col-xs-12">
            <h1>Dashboard {{mainTown?.naam}}</h1>
            <p>Welkom op het online platform van {{mainTown?.naam}}. Hieronder vind u een overzicht met de belangrijkste informatie over de gemeente {{mainTown?.naam}}. Klik op een widget van uw keuze om meer informatie te verkrijgen rond een specifiek onderwerp.</p>
        </div>

        <section class="col-xs-12 col-sm-5">
            <h4> Kerngegevens</h4>
                                    <img class='icon' src="/app/images/icons/population.png">

         <button type="button" class="btn btn-primary comparebtn" [routerLink]="['CoreData']">Meer info</button>
        </section>


        <section class="col-xs-12 col-sm-5">
           <h4> Uitgaves</h4>
                      <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>

           <button type="button" class="btn btn-primary proposebtn" [routerLink]="['Expenses']">Meer info</button>

        </section>

                <section class="col-xs-12 col-sm-5">
                 <h4> Openstaande projecten</h4>

                 <button type="button" class="btn btn-primary salarybtn" [routerLink]="['Taxes']">Meer info</button>

        </section>


        <section class="col-xs-12 col-sm-5">
                    <h4> Plannen</h4>

           <button type="button" class="btn btn-primary propositionsbtn" >Meer info</button>

        </section>

       </div>
       </div>
`,
    directives: [TownSelectorComponent, EditableFieldComponent, SunburstComponent,ROUTER_DIRECTIVES],
    providers: [ BegrotingService,ActieService,
        TownService,  //routing
    ],
    styles: [`

    .overview-container {
       background-color: #f2f3f8;
    }

    .container {
    }

    .icon {
    max-width: 300px;
    margin: 0 auto;
    display: block;
    }

    h2 {
    text-align: left;
    margin: 20px 0;
    }

    h3 {
    margin: 0;
    padding-bottom: 1%;
    font-size: 3rem;
    }


    h4{
    margin-bottom: 20px;
    }

    .container {
    max-width: 1200px;
    }

    .noData {
    font-size: 1.3em;
    margin-top: 150px;
    text-align: center;
    }
    .comparebtn, .salarybtn , .propositionsbtn, .proposebtn {
    position: absolute;
    margin: 20px;
    bottom: 0;
    right: 0px;
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

    section {
        height: 400px;
        margin: 20px;
        background-color: white;
        box-shadow: 3px 3px 3px lightgray;
    }

    
`]
})

export class OverviewComponent {
    title = 'Gemeente - home';
    imglink: string = "";
    name:string = "";
    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable = false;
    contentbutton="meer info";
    acties: Actie[];
    showActions = false;
    id:number;
    isEditor: boolean = false; //TODO: adapt value when signed in with special role
    categories: GemeenteCategorie [] =
    [{ID:24,naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",totaal: 22781},
{ID:24, naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",totaal:281},
{ID:24,naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen", totaal:3311},
{ID:24,naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",totaal:906}];
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/4;
    _actieService: ActieService;

    onCircleClick: any = (id: number) => {
        this.showActions = true;
        //TODO: replace hardcoded 15 with id
       this._begrotingService.getActies(24)
           .subscribe((acties : any) => this.acties = acties);
    };

    constructor(private _townService:TownService, private _begrotingService:BegrotingService,_actieService: ActieService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(town => {
                this.mainTown = town;
                this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') +".png";
                }
             );

     //   _begrotingService.getGemeenteCategorieen(2020,"Gent")
     //      .subscribe((finan: any) => this.categories = finan
     //       );

        this._actieService = _actieService;
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
            this.width = window.innerWidth/4;

        }
    }

}

