import {Component, ChangeDetectorRef} from 'angular2/core';
import {TownService} from './../../../services/townService.component.js';
import {BegrotingService} from './../../../services/begrotingService.js';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component.js'
import {SunburstCompare} from './../../subComponents/graphs/sunburstCompare.component.js'//SunburstCompare
import {MainTown} from "./../../../models/mainTown.js";
import {totalmem} from "os";
import {Observable} from 'rxjs/observable';
import {GemeenteCategorie} from "./../../../models/gemeenteCategorie.js";
import {rangeSlider} from './../../subComponents/input/rangeSlider.component.js';


@Component({ //invoke with metadata object
    selector: 'taxes-container',
    template: `
       <div class="container">
		    <div class ="row" col-lg-12 col-md-12 col-sm-12 col-xs-12>
		    <h1>De belastingen in jouw stad: {{myTown.naam}}</h1>
            <p id="intro">Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
            </div>
            <div class="row">
                <div class="thisTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row topRow">
                        <!--<div class="labelArea col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <span id="salLabel" class="label label-default glyphicon glyphicon-euro">{{mySalary}}</span>
                            <span id="salLabel" class="label label-default glyphicon glyphicon-euro">{{my}}</span>
                        </div>
                        <div class="rangeArea col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <input type="range" name="slide" id="speedSlider" [(ngModel)]="mySalary" min="1500" max="15000" value="2000" step="50" (change)="calculateSalary()"/>
                        </div>-->
                        <div class="rangeArea col-lg-12 col-md-12 col-sm-12 col-xs-12 speedSlider">
                            <!--<input type="range" name="slide" id="speedSlider" [(ngModel)]="mySalary" min="1500" max="15000" value="2000" step="50" (change)="calculateSalary()"/>  [data]=mySalary-->
                            <slider name="slide" id="speedSlider" [(data)]="mySalary" [min]=1500 [max]=15000 [value]=2000 [step]=50 (changes)="calculateSalary()"></slider>
                        </div>
                        <div class="labelArea col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-inline">
                          <div class="form-group">
                            <label for="exampleInputName2">Loon </label>
                            <input type="text" class="form-control" id="salaryInput" [(ngModel)]="mySalary" readonly>
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail2">Belasting </label>
                            <input type="email" class="form-control" id="taxInput" [(ngModel)]="myTaxes" readonly>
                          </div>
                        </form>
                        </div>
                        
                        <!--<section id="sliderSection">
                            <span id="salLabel" class="label label-default glyphicon glyphicon-euro">{{mySalary}}</span>
			                <input type="range" name="slide" id="speedSlider" [(ngModel)]="mySalary" min="1500" max="15000" value="2000" step="50" (change)="calculateSalary()"/>
			            </section>-->
			        </div>
					<div class="row">
					    <sunburstCompare [data]=categories width=500 height=600></sunburstCompare>
		            </div>
                </div>
                <div class="otherTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="row topRow">
                        <div class="">
                            <div class=" styled-select slate">
                                <select id="select2" class="" (change)="getNewTown($event)">
                                    <option>Selecteer een gemeente</option>
                                    <option *ngFor="#town of towns" [value]="town.naam">{{town.naam}} </option>
                                </select>
                            </div>
                        </div>
                    </div>
					<div class="row">
                        <sunburstCompare [data]=categories2 width=500 height=600></sunburstCompare>
                    </div>
                </div>
			</div>
        </div>








`,
    directives: [SunburstComponent, ROUTER_DIRECTIVES, SunburstCompare, rangeSlider],
    providers: [
        TownService,BegrotingService
    ],
    styles: [`

   .thisTownArea{
   /*background-color: #00b3ee;*/
   }
   .otherTownArea{
   /*background-color: #9c0033;*/
   }
   /*.labelArea{
   background-color: #00b3ee;
   }
   .rangeArea{
   background-color: #9c0033;
   }*/
   
   .speedSlider {
   width: 70%;
   margin-top: 1em;
   margin-bottom: 3em;
   /*margin-right: 10em;*/
   /*!/text-align: center;*/
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
   #intro{
   margin-bottom: 5em;
   }
   .topRow{
   min-height: 10em;
   }
   
 
   .label{
   display: block;
   margin: 0 auto;
   width: 4.5em;
   height: 1.5em;
   //margin-bottom: 2em;
   background-color: #2ac7d2;
   font-size: 2em;
   color: #000;
   }
   
  /* output { 
  position: absolute;
  background-image: linear-gradient(top, #444444, #999999);
  width: 40px; 
  height: 30px; 
  text-align: center; 
  color: white; 
  border-radius: 10px; 
  display: inline-block; 
  font: bold 15px/30px Georgia;
  bottom: 175%;
  left: 0;
  margin-left: -1%;
}*/


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



/*dropdown CSS*/
/*.slate{
    text-align: center;
    color:black;
}

.styled-select {
    overflow: hidden;
    width: 240px;
    margin: 0 auto;
}*/

.styled-select select {
    background: url(./../../../../app/images/arrow_down.png) no-repeat right rgba(255,255,255, 0.6);
    background-size: 35px 35px;
    border: none;
    font-size: 14px;
    /*height: 29px;*/
    height: 3em;
    padding: 5px; /* If you add too much padding here, the options won't show in IE */
    width: 240px;
    background-color: #2ac7d2;
    border-radius: 3px;
    text-align:center;
}

select::-ms-expand {
    display: none;
}

#select2 {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    display: block;
    margin: 0 auto;
    
}
/*End dropdown CSS*/




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
    private service: TownService;
    private budgetService: BegrotingService;
    private myTaxes: number = 0;
    errorMessage:any;

    /*private categories: [{naamCatz : string, uitgave : number}] = [{"naamCatz" : "", "uitgave" : 0}];
    private categories2: [{naamCatz : string, uitgave : number}] = [{"naamCatz" : "", "uitgave" : 0}];*/

    private categories: GemeenteCategorie [] = [{"naamCatz" : "", "totaal" : 0}];
    private categories2: GemeenteCategorie [] = [{"naamCatz" : "", "totaal" : 0}];


    categories3: GemeenteCategorie [] =
        [{catCode:"0990",naamCatz:"Financiële aangelegenheden",totaal: 22781},
            {catCode:"0991", naamCatz:"Patrimonium zonder maatschappelijk doel",totaal:281},
            {catCode:"099", naamCatz:"Gezin en kinderen",totaal:3311},
            {catCode:"098",naamCatz:"Sport",totaal:906}];


    constructor(private _routeParams:RouteParams, private _townService: TownService, private _budgetService: BegrotingService)
    {
        this.routeParams = _routeParams;
        this.service = _townService;
        this.budgetService = _budgetService;

        this.towns = _townService.getTownsHC();//TODO: delete

        _townService.getTowns()//TODO: service implementation
            .subscribe((towns:any) => this.towns = towns,
                (err:any) => this.errorMessage = err);

        this.myTown = _townService.getTownHC("Antwerpen");//TODO: delete
        //default stad is Antwerpen
        this.compareTown = _townService.getTownHC("Antwerpen");//TODO: delete and service implementation

        _townService.getTown(this._routeParams.get('town'))//TODO: deep routing
            .subscribe((town:any) => this.myTown = town,
                (err:any) => this.errorMessage = err
            );

    }

    //call upon initial load
    ngOnInit() {
        /*TODO: nieuwe deep routing params*/
        this.param = this.routeParams.get('town');

        //load graph for provided town in current year
        var today = new Date();
        var year = today.getFullYear;
        let tempCategories: GemeenteCategorie [] = this.budgetService.getCategorieHC(year, this.param);
        this.categories.pop();/*TODO: andere manier vinden voor deze omweg (counter?)*/
        /*TODO: use real service observable*/
        for (var i = 0; i < tempCategories.length; i++) {

            if (tempCategories[i].naamCaty == null){
                this.categories.push(tempCategories[i]);
            }

        }
        this.calculateSalary(true);
    }

    getNewTown(event: any) {
        let total: number = 0;
        let compCategories : GemeenteCategorie [] = [{"naamCatz" : "", "totaal" : 0}];
        //get town to compare and tax
        this.compareTown = this.service.getTownHC(event.target.value);//TODO: replace by service
        let myTax = this.compareTown.aanslagVoet * this.mySalary;

        //get cat data for chosen town
        var today = new Date();
        var year = today.getFullYear;
        let tempCategories: GemeenteCategorie [] = this.budgetService.getCategorieHC(year, this.compareTown.naam);
        compCategories.pop();/*TODO: andere manier vinden voor deze omweg (counter?)*/
        /*TODO: use real service observable*/
        for (var i = 0; i < tempCategories.length; i++) {

            if (tempCategories[i].naamCaty == null){
                compCategories.push(tempCategories[i]);
            }

        }
        //set the correct tax amounts per category
        for (var i = 0; i < compCategories.length; i++) {
            total += compCategories[i].totaal;
        }

        for (var i = 0; i < compCategories.length; i++) {
            let share = (compCategories[i].totaal/ total);
            let taxAmount = (myTax * share);
            compCategories[i] = {"naamCatz" : compCategories[i].naamCatz, "totaal" : taxAmount};
        }
        this.categories2 = compCategories;

        for (var i = 0; i < this.categories2.length; i++) {
            console.log("cat " + this.categories2[i].naamCatz + " belasting " + this.categories[i].totaal);
        }
    }

    calculateSalary(init: boolean){
        console.log("salaris update: " + this.mySalary);
        let total: number = 0;
        let tempCategories : GemeenteCategorie [] = [{"naamCatz" : "", "totaal" : 0}];

        //get town tax
        this.myTaxes = this.myTown.aanslagVoet * this.mySalary;

        //set the correct tax amounts per category
        for (var i = 0; i < this.categories.length; i++) {
            total += this.categories[i].totaal;
        }

        for (var i = 0; i < this.categories.length; i++) {
            let share = (this.categories[i].totaal/ total);
            let taxAmount = (this.myTaxes * share);
            tempCategories[i] = {"naamCatz" : this.categories[i].naamCatz, "totaal" : taxAmount};
        }

        //generate new sunburst
        this.categories = tempCategories;

        if(init){
            this.categories2 = this.categories;
        }




    }






}