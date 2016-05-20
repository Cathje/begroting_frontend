import {Component, Injector} from 'angular2/core';
import {TownService} from './../../../services/townService.component';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';
import {TownSelectorComponent} from './../../subComponents/input/townSelector.component';
import {SelectorComponent} from './../../subComponents/input/selector.component';
import {MainTown} from "../../../models/mainTown";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component';
import {BegrotingService} from "../../../services/begrotingService";
import {Actie} from "../../../models/actie";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";

@Component({ //invoke with metadata object
    selector: 'comparison-container',
    template: `
        <div class="container">
            <h1>Vergelijk 2 gemeentes</h1>
            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
        <div class="comparison-content">
            <div (window:resize)="onResize($event)">
                <selector defaultOption="Kies een gemeente" [options]="towns" (change)="onSelectTown($event, '2')"></selector>
                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>
            </div>
            <div class="vs">
                VS
            </div>
            <div >
                <selector defaultOption="Kies een gemeente" [options]="towns" (change)="onSelectTown($event, '2')"></selector>
                <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>
            </div>
        </div>

       </div>
`,
    directives: [SelectorComponent, TownSelectorComponent, SunburstComponent,ROUTER_DIRECTIVES],
    providers: [ BegrotingService, TownService],
    styles: [`
        .comparison-content {
            display:flex;
            align-items: center;
            justify-content: center;
        }

        .vs {
            padding: 20px;
        }

        select {
            border: 1px solid lightgray;
            margin: 20px;
        }

        @media screen and (max-width: 768px) {
        .comparison-content {
            flex-direction: column;
        }
        }

`]
})

export class ComparisonComponent {
    title = 'Gemeente - home';
    towns = ["Berchem", "Gent", "Brussel"];
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
    categories2: GemeenteCategorie [] = [];
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

    onSelectTown = (event, graphNumber) => {
        console.log(event.target.value);
        this._begrotingService.getGemeenteCategorieen(2020,"Gent")
            .subscribe(
                (finan: any) => {
                    if(graphNumber === "1"){
                        this.categories = finan;
                    }else {
                        this.categories2 = finan;
                    }
                },
                (err:any) => this.errorMessage = err

            );
    }

    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/3.5;

        }
    }

}

