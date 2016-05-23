import {Component, Injector} from 'angular2/core';
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
        <h1>Instellingen gemeente {{mainTown?.naam}}</h1>
        <section class="col-xs-12 form-inline">
            <h3>Kleuren website</h3>
            <div class="section-content">
                <div class="col-xs-12 form-group">
                    <label >Hoofdkleur</label>
                    <input class="form-control" type="text" [(ngModel)]="mainTown.hoofdkleur"/>
                    <button class="btn btn-primary" (click)="changeColor()" styled ><span class="glyphicon glyphicon-plus"></span></button>
                    <span class="small"><i>*Gelieve een hexadecimale waarde, een rgba waarde of een standaard webkleur in te voeren</i></span>
                </div>
            </div>
        </section>
        <section class="col-xs-12 form-inline">
            <h3>Logo website</h3>
            <div class="section-content">
            <div class="section-content">
                <div class="col-xs-12 form-group">
                    <input id="file" type="file" (change)="changeImg($event)"/>
                    <img *ngIf="afb" [src]="afb" class="logo" />                </div>
            </div>
            </div>
        </section>
      <section class="col-xs-12">
            <h3>FAQ</h3>
            <div class="section-content">
                <div class="form-inline">
                <ul *ngIf="mainTown?.faqs" >
                   <li *ngFor="#f of mainTown.faqs" >
                   <button class="btn btn-primary" (click)="verwijder(f)" ><span class="glyphicon glyphicon-trash"></span></button>
                   <p>{{f.vraag}} </p>
                   <p>{{f.antwoord}} </p>
                    </li>
                </ul>
                <p *ngIf="!mainTown?.faqs"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>
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
                   <button class="btn btn-primary pull-right" (click)="voegToe()" styled>Voeg vraag toe</button>
                </div>
            </div>
        </section>
        <button class="btn btn-primary pull-right" (click)="submit()" styled>opslaan</button>
    </section>
    `,
    providers: [TownService],
    directives: [ROUTER_DIRECTIVES, StyledDirective],
    styles: [`
    ::-webkit-file-upload-button {
        background: gray;
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

    section .section-content {
        border: 1px solid lightgray;
        margin-bottom: 20px;
        padding: 20px;
        overflow: auto;
    }

    `]
})

export class ManageTownComponent {

    mainTown = new MainTown("","",0,0);
    faq = new Faq("", "");
    afb: string;
    id:number;
    errorMessage:string;

    constructor( private _routeParams: RouteParams, private _townService: TownService, private _router:Router, injector:Injector)
    {
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:any) => this.mainTown = town,
                (err:any) => this.errorMessage = err
            );
    }

    ngOnInit() {

    }

    changeColor = () => {
        sessionStorage.setItem("mainColor", this.mainTown.hoofdkleur);
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

    verwijder( f: Faq)
    {
        //@TODO geeft in code een error maar werkt --> ??
        this.mainTown.faqs.pop(f);
        if(f.ID != 0)
        {
            this._townService.deleteFAQ(f.ID).subscribe(
                (d:any) => this.id = d,
                (err:any) => this.errorMessage = err
            );
        }

    }
    submit()
    {
        this._townService.putTownInput(this.mainTown).subscribe(
            (d:any) => this.id = d,
            (id:any) => this.errorMessage = id);
    }

    voegToe()
    {
        if(this.mainTown.faqs == null)
        {
            this.mainTown.faqs = [];
        }
        this.mainTown.faqs.push(new Faq(this.faq.vraag, this.faq.antwoord));
    }
}