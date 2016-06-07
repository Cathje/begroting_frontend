import {Component, Injector} from 'angular2/core';
import {TownService} from './../../../services/townService.component';
import {BegrotingService} from './../../../services/begrotingService';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component'
import {SunburstCompare} from './../../subComponents/graphs/sunburstCompare.component'//SunburstCompare
import {MainTown} from "./../../../models/mainTown";
import {Observable} from 'rxjs/observable';
import {GemeenteCategorie} from "./../../../models/gemeenteCategorie";
import {rangeSlider} from './../../subComponents/input/rangeSlider.component';
import {Categorie} from "../../../models/categorie";
import {CurConvert} from "./../../../pipes/curConvertPipe";


@Component({ //invoke with metadata object
    selector: 'taxes-container',
    template: `
       <p class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</p>
       <div class="container">
		    <div class ="row" col-lg-12 col-md-12 col-sm-12 col-xs-12>
		    <h1>De belastingen in jouw stad: {{myTown.naam}}</h1>
            <p id="intro">Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
            </div>

            <div class="row">
                <div class="thisTownArea col-lg-12 col-md-12 col-sm-12 col-xs-12">
                					<div class="row">
					    <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width [isTax]=true></sunburst>
		            </div>
                    <div class="row topRow">
                        <div class="rangeArea speedSlider">
                            <!--<input type="range" name="slide" id="speedSlider" [(ngModel)]="mySalary" min="1500" max="15000" value="2000" step="50" (change)="calculateSalary()"/>  [data]=mySalary-->
                           <!-- <slider name="slide" id="speedSlider" [(data)]="mySalary" [min]=1500 [max]=15000 [value]=2000 [step]=50 (changes)="calculateSalary()"></slider>-->
                            <slider name="slide" id="speedSlider" [(data)]="mySalary" [value]="10000" [inspraakNiveau]="SLIDERFIX" (changes)="calculateSalary($event)"></slider>
                        </div>
                        <div class="labelArea col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-inline">
                          <div class="form-group">
                            <label for="exampleInputName2">Loon </label>
                            <input type="text" class="form-control" id="salaryInput" [ngModel]="mySalary | curPipe" (ngModelChange)="mySalary" readonly>
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail2">Belasting </label>
                            <input type="text" class="form-control" id="taxInput" [ngModel]="myTaxes | curPipe" (ngModelChange)="myTaxes" readonly>
                          </div>
                        </form>
                        </div>
                        
                        <!--<section id="sliderSection">
                            <span id="salLabel" class="label label-default glyphicon glyphicon-euro">{{mySalary}}</span>
			                <input type="range" name="slide" id="speedSlider" [(ngModel)]="mySalary" min="1500" max="15000" value="2000" step="50" (change)="calculateSalary()"/>
			            </section>-->
			        </div>
                </div>
                <!--<div class="otherTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                        <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width [isTax]=true></sunburst>
                    </div>
                </div>-->
			</div>
        </div>

`,
    directives: [SunburstComponent, ROUTER_DIRECTIVES, SunburstCompare, rangeSlider],
    providers: [
        TownService,BegrotingService
    ],
    pipes: [CurConvert],
    styles: [`

    .banner{
        width:100%;
    }

    .speedSlider {
     margin: 0 auto;
    }

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
   width: 50%;
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

   .topRow{
   min-height: 10em;
   text-align: center;
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
    private mySalary: number = 2000;
    private towns: MainTown [] = [];
    private myTown: MainTown = new MainTown("", "", 0,0);
    private myTaxes: number = 0;
    errorMessage:any;
    private SLIDERFIX: number = 3;
    private budgetYear: number = 2020;//hc due to limited data
    private categories: GemeenteCategorie [] = [];
   private width: number = window.innerWidth < 768 ? window.innerWidth*0.7 : window.innerWidth/4;

    constructor(private _routeParams:RouteParams, private _townService: TownService, private _begrotingService: BegrotingService, private injector:Injector)
    {
        let town = injector.parent.parent.parent.parent.get(RouteParams).get('town');
        var today = new Date();
        //this.budgetYear = today.getFullYear();

        _townService.getTown(town)
            .subscribe((town:any) =>
                    this.myTown = town,
                (err:any) => this.errorMessage = "Geen stad gevonden"
            );
        _begrotingService.getGemeenteCategorieen(this.budgetYear,"Gent")
            .subscribe((cats: any) => this.categories = cats.filter(function(g){

                return g.catB == null;

            }), (err:any) => this.errorMessage = "Geen steden gevonden.");
       /* _begrotingService.getGemeenteCategorieen(this.budgetYear,"Gent")
        .subscribe(function (cats : any){
                console.log("test");
            let total = 0;
            let tempCategories : GemeenteCategorie [] = [{ID: 0, naamCat: "", totaal: 0}];
            tempCategories.pop();
            let aanslagVoet = 0.05; //TODO: delete, data issue!
            //get town tax
            this.myTaxes = aanslagVoet * this.mySalary;
                for(var i = 0; i < cats.length; i++){
                    if(cats[i].catB == null){
                        //console.log(cats[i].totaal);
                    total += cats[i].totaal;
                    tempCategories.push(cats[i]);
                    }
                }
                for(var i = 0; i < tempCategories.length; i++){
                    let share = (cats[i].totaal/ total);
                    let taxAmount = (this.myTaxes * share);
                    tempCategories[i].totaal = taxAmount;
                    //console.log(tempCategories[i].catA);
                }
            this.categories = tempCategories;
            for(var i = 0; i < this.categories.length; i++){
                console.log(this.categories[i].catA);
            }

        }


    ,(err:any) => this.errorMessage = "Geen steden gevonden.");*/



    }

    /*//call upon initial load
    ngOnInit() {

        this.calculateSalary(true);
    }*/

    calculateSalary(){

        let total: number = 0;
        let tempCategories : GemeenteCategorie [] = [];
        this.myTown.aanslagVoet = 0.05; //TODO: delete, data issue!
        //get town tax
        this.myTaxes = this.myTown.aanslagVoet * this.mySalary;

        //set the correct tax amounts per category
        for (var i = 0; i < this.categories.length; i++) {
            total += this.categories[i].totaal;
        }

        for (var i = 0; i < this.categories.length; i++) {
            let share = (this.categories[i].totaal/ total);
            let taxAmount = (this.myTaxes * share);
            tempCategories.push({ID:this.categories[i].ID,naamCat:this.categories[i].naamCat,catA:this.categories[i].catA,totaal:taxAmount,inputID:null,input:null,icoon:null,foto:null,film:null,kleur:null});
        }
        for (var i = 0; i < this.categories.length; i++) {
            console.log(this.categories[i].totaal);
        }
        //generate new sunburst
        this.categories = tempCategories;

    }

    onCircleClick: any = (id: number) => {
        //do nothing

    };




}