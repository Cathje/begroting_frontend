import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownService} from "../../../services/townService.component";
import {MainTown} from "../../../models/mainTown";
import {Faq} from "../../../models/faq";
import {StyledDirective} from '../../../directives/styled';


@Component({
    selector: 'manage-town-container',
    template: `
    <p class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</p>
    <section class="container">
        <h1>Instellingen gemeente</h1>
        <section class="col-xs-12 form-inline">
            <h3>Kleuren website</h3>
            <div class="section-content">
                <div class="col-xs-12 form-group">
                    <label >Hoofdkleur</label>
                    <input class="form-control" type="text" [(ngModel)]="mainTown.kleur"/>
                    <button class="btn btn-primary" (click)="changeColor()" styled ><span class="glyphicon glyphicon-plus"></span></button>
                    <span class="small"><i>*Gelieve een hexadecimale waarde, een rgba waarde of een standaard webkleur in te voeren</i></span>
                </div>
            </div>
        </section>
        <section class="col-xs-12 form-inline">
            <h3>Logo website</h3>
            <div class="section-content">
                <div class="col-xs-12 form-group">
                    <input id="file" type="file" (change)="changeImg($event)"/>
                    <img *ngIf="afb" [src]="afb" class="logo" />                </div>
            </div>
        </section>
        <section class="col-xs-12">
            <h3>FAQ</h3>
            <div class="section-content">
                <div class="form-inline">
                <ul *ngIf="faqs" >
                   <li *ngFor="#f of faqs" >
                   <button class="btn btn-primary" (click)="verwijder(f.id)" styled><span class="glyphicon glyphicon-trash"></span></button>
                   <p>{{f.vraag}} </p>
                    </li>
                </ul>
                <p *ngIf="!faqs"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>
                </div>

                <div class="addFaq">
                    <div class="form-group">
                        <label >Vraag:</label>
                        <input type="text" [(ngModel)]="faq.vraag"/>
                    </div>
                    <div class="form-group">
                        <label >Antwoord:</label>
                        <input type="text" [(ngModel)]="faq.antwoord"/>
                    </div>
                   <button class="btn btn-primary pull-right" (click)="savefaq()" styled>Voeg toe</button>
                </div>
            </div>
        </section>

    </section>
    `,
    providers: [TownService],
    directives: [ROUTER_DIRECTIVES, StyledDirective],
    styles: [`
    ::-webkit-file-upload-button {
        background: #2ac7d2;
        box-shadow: none;
        border:none;
        color:white;
        border-radius: 5px;
        padding: 5px;
    }

    input[type=file]{
        border: none;
    }

    .addFaq {
        border-top: 1px solid lightgray;
    }

    .logo{
        width: 50%;
        border: 1px solid lightgray;
    }

    `]
})

export class ManageTownComponent {

    mainTown = new MainTown("","",0,0);
    faq = new Faq("", "");
    faqs: Faq[];

    constructor( private _routeParams: RouteParams, _townService: TownService, private _router:Router)
    {
        _townService.getTown(_routeParams.get('town'))
           .subscribe(town => this.mainTown = town
           );
    }

    ngOnInit() {

    }

    changeColor = () => {
        sessionStorage.setItem("mainColor", this.mainTown.kleur);
        location.reload();

        //TODO: + create webapi to save this in backend
    }

    changeImg = (event: any)=>{
        this.loadimage(event.target.files[0], (img: string) =>{
            this.afb =  img;
        });

        //TODO: + create webapi to save this in backend
    }

    loadimage = (img: string, cb: any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function() {
            let result = reader.result;
            cb(result);
        }
    }


}