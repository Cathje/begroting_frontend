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


@Component({ //invoke with metadata object
    selector: 'expenses-container',
    template: `
        <div class="container">
        <section class="intro col-xs-12">
            <h1>De uitgaven van {{mainTown?.naam}}</h1>
            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
        <div class="clearfix">
        <div class="graph col-xs-12 col-sm-8" (window:resize)="onResize($event)">
           <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>
           <button type="button" class="btn btn-primary comparebtn" [routerLink]="['Comparison']">Vergelijk 2 gemeentes</button>
           <button type="button" class="btn btn-primary proposebtn">Doe een voorstel</button>
           <button type="button" class="btn btn-primary salarybtn" [routerLink]="['Taxes']">Vergelijk met salaris</button>
           <button type="button" class="btn btn-primary propositionsbtn">Begrotingsvoorstellen</button>
        </div>
        <div class="legend col-xs-12 col-sm-4 ">
                <h3>Legende categorieën</h3>
                <ul>
                    <li *ngFor="#categorie of categories"></li>
                </ul>
        </div>

        <div class="pointer col-xs-12 ">
                <h3>Acties</h3>
                <ul>
                    <p [ngClass]="{hide: showActions}" class='noData'> U heeft nog geen categorie geselecteerd. </p>
                    <li *ngFor="#actie of acties">{{actie.actieLang}} - {{actie.bestuurtype}}</li>
                </ul>
            </div>
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

export class ExpensesComponent {
    title = 'Gemeente - home';
    imglink: string = "";
    name:string = "";
    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable = false;
    contentbutton="meer info";
    acties: Actie[];
    showActions = false;
    id:number;
    errorMessage:any;
    isEditor: boolean = false; //TODO: adapt value when signed in with special role
    categories: GemeenteCategorie [] = [];

    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/2.5;

    onCircleClick: any = (id: number) => {
        this.showActions = true;
        //TODO: replace hardcoded 15 with id

       this._begrotingService.getActies(24)
           .subscribe((acties : any) => this.acties = acties,
               (err:any) => this.errorMessage = err);

    };

    constructor(private _townService:TownService, private _begrotingService:BegrotingService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:any) => {
                this.mainTown = town;
                this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') +".png";
                },
                (err:any) => this.errorMessage = err
             );

        _begrotingService.getGemeenteCategorieen(2020,"Gent")

           .subscribe((finan: any) => this.categories = finan,
               (err:any) => this.errorMessage = err
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

