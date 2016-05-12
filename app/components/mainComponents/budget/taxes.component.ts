import {Component, ChangeDetectorRef} from 'angular2/core';
import {TownService} from './../../../services/townService.component.js';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component.js'
import {SunburstCompare} from './../../subComponents/graphs/sunburstCompare.component.js'//SunburstCompare
import {MainTown} from "./../../../models/mainTown.js";
import {CatDTO} from "../../../models/dto/catDTO.js";
import {totalmem} from "os";
import {Observable} from 'rxjs/observable';


@Component({ //invoke with metadata object
    selector: 'taxes-container',
    template: `
		<div class="container">
		        <h1>{{title}} en parameter: {{param}}</h1>

            <div class="row">
                <div class="thisTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row">
                        <section id="sliderSection">
			                <input type="range" id="speedSlider" [(ngModel)]="mySalary" min="1500" max="15000" value="2000" step="50" (change)="calculateSalary()"/>
		                </section>
                    </div>
					<div class="row">
					    <sunburst [data]=categories width=500 height=600></sunburst>
		            </div>
                </div>
                <div class="otherTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row">
                        <div class="">
                            <select class="selectClass" (change)="getNewTown($event)">
                                <option>Selecteer een gemeente</option>
                                <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option>
                            </select>
                        </div>
                    </div>
					<div class="row">
                        <sunburstCompare [data]=categories2 width=500 height=600></sunburstCompare>
                    </div>
                </div>
			</div>
        </div>








`,
    directives: [SunburstComponent, ROUTER_DIRECTIVES, SunburstCompare],
    providers: [
        TownService,
    ],
    styles: [`

   .thisTownArea{
   //background-color: #00b3ee;
   }
   .otherTownArea{
   //background-color: #9c0033;
   }
   #speedSlider {
   width: 50%;
   margin: auto;
   }
   #sunburstSection{
   padding: 1%;
   margin-left: 1%;
   flex: 3;
   -webkit-flex-grow: 3;

   }
   .selectClass{
   display: block;
   margin: 0 auto;

   }


/*Range CSS*/
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 5.3px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
  background: #2ac7d2;
  border-radius: 17.1px;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;
  border: 1px solid #3d0000;
  height: 19px;
  width: 41px;
  border-radius: 44px;
  background: rgba(36, 37, 40, 0.88);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7.9px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #97e5ea;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
  background: #2ac7d2;
  border-radius: 17.1px;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;
  border: 1px solid #3d0000;
  height: 19px;
  width: 41px;
  border-radius: 44px;
  background: rgba(36, 37, 40, 0.88);
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #145e63;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
  border-radius: 34.2px;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
}
input[type=range]::-ms-fill-upper {
  background: #2ac7d2;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
  border-radius: 34.2px;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;
  border: 1px solid #3d0000;
  height: 19px;
  width: 41px;
  border-radius: 44px;
  background: rgba(36, 37, 40, 0.88);
  cursor: pointer;
  height: 8.4px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #2ac7d2;
}
input[type=range]:focus::-ms-fill-upper {
  background: #97e5ea;
}
/*End Range CSS*/




`]
})

export class TaxesComponent {
    private title = 'Gemeente - Salarisvoorstel';
    private param : string = ""; //not required
    private routeParams:RouteParams;
    private mySalary: number = 2000;
    private towns: MainTown [];
    private myTown: MainTown;
    private compareTown: MainTown;
    private myTownCats: CatDTO [];
    private compareTownCats: CatDTO [];
    private service: TownService;

    categories: [[string, string]] =
        [["Algemene financiering ", "22781"],
            ["Zorg en opvang ", "281"],
            ["Wonen en ruimtelijke ordening ", "3311"],
            ["Veiligheidszorg ", "906"],
            ["Cultuur en vrije tijd ", "5324"],
            ["Leren en onderwijs ", "4512"],
            ["Zich verplaatsen en mobiliteit ", "1203"],
            ["Algemeen bestuur ", "7854"],
            ["Natuur en milieubeheer ", "6325"],
            ["Ondernemen en werken ", "1002"]];

    categories2: [[string, string]] =
        [["Algemene financiering ", "22781"],
            ["Zorg en opvang ", "281"],
            ["Wonen en ruimtelijke ordening ", "3311"],
            ["Veiligheidszorg ", "906"],
            ["Cultuur en vrije tijd ", "5324"],
            ["Leren en onderwijs ", "4512"],
            ["Zich verplaatsen en mobiliteit ", "1203"],
            ["Algemeen bestuur ", "7854"],
            ["Natuur en milieubeheer ", "6325"],
            ["Ondernemen en werken ", "1002"]];
    //categories2: [[string, string]] = null;
    //categories2: Observable<[ [string, string]]>;



    constructor(private _routeParams:RouteParams, private _townService: TownService, private ref: ChangeDetectorRef)
    {
        this.routeParams = _routeParams;
        this.service = _townService;

        this.towns = _townService.getTownsHC();//TODO: delete

        _townService.getTowns()
            .subscribe(towns => this.towns = towns);

        this.myTown = _townService.getTownHC(this._routeParams.get('town'));//TODO: delete

        _townService.getTown(this._routeParams.get('town'))
            .subscribe(town => this.myTown = town
            );
        //test merge

    }

    //call upon initial load
    ngOnInit() {
        this.param = this.routeParams.get('town');


    }

    getNewTown(event: any) {
        let total: number = 0;
        let tempCategories: [[string, string]] = [["", ""]];
        //TODO: get data of chosen town and generate new Sunburst
        console.log("te vergelijken gemeente: " + event.target.value);

        this.compareTown = this.service.getTownHC(event.target.value);//TODO: replace by service
        //get town tax
        let myTax = this.compareTown.aanslagVoet * this.mySalary;

        this.compareTownCats = this._townService.getCatDataHC(); //TODO: implement correct call in service
        //set the correct tax amounts per category
        for (var i = 0; i < this.compareTownCats.length; i++) {
            total += this.compareTownCats[i].bedrag;
        }

        for (var i = 0; i < this.compareTownCats.length; i++) {
            let share = (this.compareTownCats[i].bedrag/ total);
            let taxAmount = (myTax * share);
            tempCategories[i] = [this.compareTownCats[i].hoofdCategorie, taxAmount.toString()];
        }

        //TODO: generate new sunburst!!!???
        this.categories2 = tempCategories;

        for (var i = 0; i < this.categories.length; i++) {
            console.log(this.categories2[i])
        }

    }

    calculateSalary(){
        let total: number = 0;
        let tempCategories: [[string, string]] = [["", ""]];

        //TODO: calculate tax percentages of provided salary and generate new Sunburst
        console.log("mijn salaris: " + this.mySalary);

        //get town tax
        let myTax = this.myTown.aanslagVoet * this.mySalary;
        console.log("ik betaal " + myTax + " belasting ");

        //get category data
        this.myTownCats = this._townService.getCatDataHC(); //TODO: implement correct call in service

        //set the correct tax amounts per category
        for (var i = 0; i < this.myTownCats.length; i++) {
            total += this.myTownCats[i].bedrag;
        }

        for (var i = 0; i < this.myTownCats.length; i++) {
            let share = (this.myTownCats[i].bedrag/ total);
            let taxAmount = (myTax * share);
            tempCategories[i] = [this.myTownCats[i].hoofdCategorie, taxAmount.toString()];
        }

        //TODO: generate new sunburst!!!???
        this.categories2 = tempCategories;

        for (var i = 0; i < this.categories.length; i++) {
            console.log(this.categories2[i])
        }


    }






}