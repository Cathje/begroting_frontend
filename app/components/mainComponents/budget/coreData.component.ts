import {Component, Injector} from 'angular2/core';
import {TownService} from './../../../services/townService.component';
import {MainTown} from "../../../models/mainTown";
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';

@Component({
    selector: 'core-data-container',
    template: `
        <div class="container">
        <p *ngIf="errorMessage" class="alert alert-danger">{{errorMessage}}</p>

        <section class="intro col-xs-12">
            <h1>De kerngegevens van {{mainTown?.naam}}</h1>
            <p>Op deze pagina vind u de belangrijkste kerngegevens van de gemeente {{mainTown?.naam}}. Indien u meer informatie wenst, aarzel niet om ons te contacteren via het mailadrres info@debegroting.be.</p>
        </section>

        <section class="demographic col-xs-12 col-sm-12">
        <h2>Demografische gegevens</h2>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                         <img class='icon' src="/app/images/icons/population.png">
                        <h4>Aantal bewoners</h4>
                        <p>{{mainTown.aantalBewoners}}</p>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class='icon' src="/app/images/icons/man.png">
                        <h4>Aantal mannen</h4>
                        <p>{{mainTown.isMan}}</p>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class='icon' src="/app/images/icons/woman.png">
                        <h4>Aantal vrouwen</h4>
                        <p>{{mainTown.isVrouw}}</p>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class='icon' src="/app/images/icons/child.png">
                        <h4>Aantal kinderen</h4>
                        <p>{{mainTown.isKind}}</p>
                    </div>
        </section>

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
    directives: [],
    providers: [ TownService],
    styles: [`

    .icon {
        max-width: 200px;
        margin: 10px;
    }

    #info-town   {
        padding: 1%;
        flex-shrink: 2;
        -webkit-flex-shrink: 2;
    }

    .demographic *:not(h2){
        text-align: center;
    }

    .geographic {
        padding: 1%;
        margin-left: 1%;
        flex: 1;
        -webkit-flex-grow: 1;
        text-align: right;
    }
    
`]
})

export class CoreDataComponent {
    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    id:number;
    imglink: string;
    errorMessage:any;

    constructor(private _townService:TownService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {

        this.mainTown = injector.parent.parent.get(RouteParams).get('town');
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(town => {
                this.mainTown = town;
                this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') +".png";
                },
                (err:any) => this.errorMessage = err
             );

    }

}

