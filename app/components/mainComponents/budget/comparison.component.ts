import {Component, Injector} from 'angular2/core';
import {TownService} from './../../../services/townService.component';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';
import {TownSelectorComponent} from './../../subComponents/input/townSelector.component';
import {EditableFieldComponent} from './../../subComponents/input/editableField.component';
import {MainTown} from "../../../models/mainTown";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component';
import {BegrotingService} from "../../../services/begrotingService";
import {Actie} from "../../../models/actie";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";



@Component({ //invoke with metadata object
    selector: 'comparison-container',
    template: `
        <div class="container">
        <section class="intro col-xs-12">
            <h1>Vergelijk 2 gemeentes</h1>
            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
        <div class="clearfix">
            <div class="graph col-xs-12 col-sm-5" (window:resize)="onResize($event)">
                <town-selector></town-selector>
                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>

            </div>
            <div class="versus col-xs-12 col-sm-2">
                VS
            </div>
            <div class="graph col-xs-12 col-sm-5">
                <town-selector></town-selector>
                <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>
            </div>
        </div>

        </section>


       </div>
`,
    directives: [TownSelectorComponent, SunburstComponent,ROUTER_DIRECTIVES],
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

    .versus {
    text-align: center;
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

    .clearfix {
    display:flex;
    align-items: center;
    justify-content: center;
    }

    .provincie {
    }
    .graph {
    padding: 40px 20px;
    text-align: left;
    margin: O auto;
    position: relative;
    }

    .graph town-selector {
    position: absolute;
border: 1px solid black;
left: 0px;
z-index: 500;
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

export class ComparisonComponent {
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
    categories: GemeenteCategorie [] =
    [{ID:"0990",naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",totaal: 22781},
{ID:"0991", naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",totaal:281},
{ID:"099",naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen", totaal:3311},
{ID:"098",naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",totaal:906}];
    categories2: GemeenteCategorie [] =
        [{ID:"0990",naamCatx:"Algemene financiering",naamCaty:"Algemene financiering",naamCatz:"Financiële aangelegenheden",totaal: 22781},
            {ID:"0991", naamCatx:"Algemene financiering", naamCaty:"Algemene financiering",naamCatz:"Patrimonium zonder maatschappelijk doel",totaal:281},
            {ID:"099",naamCaty:"Zorg en opvang", naamCatz:"Gezin en kinderen", totaal:3311},
            {ID:"098",naamCaty:"Cultuur en vrije tijd",naamCatz:"Sport",totaal:906}];
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/3.5;

    onCircleClick: any = (id: number) => {
        this.showActions = true;
        //TODO: replace hardcoded 15 with id
       this._begrotingService.getActies(24)
           .subscribe((acties : any) => this.acties = acties);
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
           .subscribe(
               (finan: any) => this.categories = finan,
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
            this.width = window.innerWidth/3.5;

        }
    }

}

