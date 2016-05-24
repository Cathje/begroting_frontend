import {Component, Injector} from 'angular2/core';
import {TownService} from "../../../services/townService.component";
import {MainTown} from "../../../models/mainTown";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component';
import {BegrotingService} from "../../../services/begrotingService";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";

@Component({ //invoke with metadata object
    selector: 'comparison-container',
    template: `
        <div class="container">
            <p *ngIf="errorMessage" class="alert alert-danger">{{errorMessage}}</p>
            <h1>Vergelijk 2 gemeentes</h1>
            <p>Hieronder kan u 2 gemeentes vergelijken op basis van de gemeente en het jaartal.</p>
        <div class="comparison-content">
            <div (window:resize)="onResize($event)">
                <div class="selectors">
                    <div>
                        <div class=" styled-select">
                            <select  (change)="onSelectYear($event,'1')">
                                <option value="0">Kies een jaar</option>
                                <option *ngFor="#o of years" [value]="o">{{o}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class=" styled-select">
                            <select (change)="onSelectTown($event,'1')">
                                <option value="">Kies een gemeente</option>
                                <option *ngFor="#o of towns" [value]="o.naam">{{o.naam}}</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" (click)="onChangeGraph(selectedYear1, selectedTown1, '1')">
                            <span class="glyphicon glyphicon-ok"></span>
                    </button>

                 </div>
                 <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>
            </div>
            <div class="vs">
                VS
            </div>
            <div >
                <div class="selectors">
                    <div>
                        <div class=" styled-select">
                            <select (change)="onSelectYear($event,'2')">
                                <option value="0">Kies een jaar</option>
                                <option *ngFor="#o of years" [value]="o">{{o}}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class=" styled-select">
                            <select (change)="onSelectTown($event,'2')">
                                <option value="">Kies een gemeente</option>
                                <option *ngFor="#o of towns" [value]="o.naam">{{o.naam}}</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" (click)="onChangeGraph(selectedYear2, selectedTown2, '2')">
                            <span class="glyphicon glyphicon-ok"></span>
                    </button>
                </div>
                <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>

            </div>
        </div>


            <h1>Vergelijk 2 clusters</h1>
            <p>Hieronder kan u 2 gemeentes vergelijken op basis van hun cluster en het jaartal.</p>
            <div class="comparison-content">
                <div (window:resize)="onResize($event)">
                    <div class="selectors">
                        <div>
                            <div class=" styled-select">
                                <select  (change)="onSelectYear($event,'3')">
                                    <option value="0">Kies een jaar</option>
                                    <option *ngFor="#o of years" [value]="o">{{o}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class=" styled-select">
                                <select (change)="onSelectTown($event,'3')">
                                    <option value="">Kies een gemeente</option>
                                    <option *ngFor="#o of towns" [value]="o.naam">{{o.naam}}</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" (click)="onChangeCluster(selectedYear4, selectedTown4, '4')">
                                <span class="glyphicon glyphicon-ok"></span>
                        </button>

                     </div>
                     <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>
                </div>
                <div class="vs">
                    VS
                </div>
                <div >
                    <div class="selectors">
                        <div>
                            <div class=" styled-select">
                                <select (change)="onSelectYear($event,'4')">
                                    <option value="0">Kies een jaar</option>
                                    <option *ngFor="#o of years" [value]="o">{{o}}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class=" styled-select">
                                <select (change)="onSelectTown($event,'4')">
                                    <option value="">Kies een gemeente</option>
                                    <option *ngFor="#o of towns" [value]="o.naam">{{o.naam}}</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" (click)="onChangeCluster(selectedYear4, selectedTown4, '4')">
                                <span class="glyphicon glyphicon-ok"></span>
                        </button>
                    </div>
                    <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>

                </div>
            </div>
       </div>
`,
    directives: [SunburstComponent],
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

        .styled-select{
            flex: 0 1 auto !important;
        }

        .selectors{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 30px;
        }

        @media screen and (max-width: 768px) {
            .comparison-content {
                flex-direction: column;
            }
        }

`]
})

export class ComparisonComponent {
    towns = [{naam: "Berchem"},{naam:  "Gent"}];
    errorMessage:string;
    years: number[];
    categories: GemeenteCategorie [] = [];
    categories2: GemeenteCategorie [] = [];
    categories3: GemeenteCategorie [] = [];
    categories4: GemeenteCategorie [] = [];
    selectedYear1: number = 0;
    selectedYear2: number = 0;
    selectedYear3: number = 0;
    selectedYear4: number = 0;
    selectedTown1: string = "";
    selectedTown2: string = "";
    selectedTown3: string = "";
    selectedTown4: string = "";
    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/3.5;

    constructor(private _begrotingService:BegrotingService, private _townService: TownService)
    {
        this.years = this._getYears();

        _townService.getTowns()
            .subscribe((towns:MainTown[]) => this.towns = towns.sort(function(a, b){
                const nameA=a.naam.toLowerCase(),
                    nameB=b.naam.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            }), (err:any) => this.errorMessage = err);
    }

    onChangeGraph = (year: number, town: string, graphNumber: string) => {
        console.log(year, town);
        console.log('555', this.selectedTown1, this.selectedYear1);
        if(year === 0 || town === ""){
            this.errorMessage= "Gelieve een jaartal en een gemeente te selecteren";
        }else {
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
    }

    onChangeCluster = (year: number, town: string, graphNumber: string) => {
        console.log(year, town);
        console.log('555', this.selectedTown1, this.selectedYear1);
        if(year === 0 || town === ""){
            this.errorMessage= "Gelieve een jaartal en een gemeente te selecteren";
        }else {
            //TODO: replace with new backend function
            this._begrotingService.getGemeenteCategorieen(2020,"Gent")
                .subscribe(
                    (finan: any) => {
                        if(graphNumber === "1"){
                            this.categories3 = finan;
                        }else {
                            this.categories4 = finan;
                        }
                    },
                    (err:any) => this.errorMessage = err

                );
        }
    }

    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/3.5;

        }
    };

    _getYears = () => {
        const currentYear: number = new Date().getFullYear();
        const years: number[] = [];
        for(let i=0; i < 5; i++){
            years.push(currentYear + i)
        }
        return years;
    }

    onSelectYear = (event,graphNumber) => {
        switch(graphNumber){
            case "1": this.selectedYear1 = event.target.value; break;
            case "2":  this.selectedYear2 = event.target.value; break;
            case "3":  this.selectedYear3 = event.target.value; break;
            case "4":  this.selectedYear2 = event.target.value; break;
        }
    }

    onSelectTown = (event,graphNumber) => {

        switch(graphNumber){
            case "1": this.selectedTown1 = event.target.value; break;
            case "2":  this.selectedTown2 = event.target.value; break;
            case "3":  this.selectedTown3 = event.target.value; break;
            case "4":  this.selectedTown2 = event.target.value; break;
        }
    }

}

