import {Component, Injector} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {TownService} from "../../../services/townService.component";
import {MainTown} from "../../../models/mainTown";
import {Faq} from "../../../models/faq";
import {StyledDirective} from '../../../directives/styled';
import {BegrotingService} from "../../../services/begrotingService";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";

declare var jQuery: any;
//@TODO LOGO 
@Component({
    selector: 'manage-town-container',
    template: `
        <img src="/app/images/backgrounds/voeten.jpg" class="banner"/>
    <section class="container">
        <p class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</p>
        <h1>Instellingen gemeente {{mainTown?.naam}}</h1>
        <section class="col-xs-12 form-inline">
            <h3>Kleuren website</h3>
            <div class="section-content">
                <div class="col-xs-12 form-group">
                    <label >Hoofdkleur</label>
                    <input class="form-control" type="text" [(ngModel)]="mainTown.hoofdKleur"/>
                    <button class="btn btn-primary" (click)="changeColor()" styled ><span class="glyphicon glyphicon-eye-open"></span></button>
                    <span class="small"><i>*Klik op het oogje om het resultaat te bekijken. U kan dit nadien onderaan opslaan.</i></span>
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
                <ul *ngIf="mainTown?.FAQs" >
                   <li *ngFor="#f of mainTown.FAQs" >
                   <p>
                    <button class="btn btn-primary" (click)="verwijder(f)" styled><span class="glyphicon glyphicon-trash"></span></button>
                   <strong>{{f.vraag}}</strong> {{f.antwoord}} </p>
                    </li>
                </ul>
                <p *ngIf="mainTown?.FAQs?.length < 1"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>
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
    providers: [TownService, BegrotingService],
    directives: [ROUTER_DIRECTIVES, StyledDirective, ],
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

    ul {
        list-style: none;
    }

    `]
})

export class ManageTownComponent {

    mainTown = new MainTown("", "", 0, 0);
    faq = new Faq("", "");
    afb:string;
    id:number;
    errorMessage:string;
    gemeenteCategorieen:GemeenteCategorie[] = [];


    constructor(private _begrotingService:BegrotingService, private _routeParams:RouteParams, private _townService:TownService, private _router:Router, injector:Injector) {
        _townService.getTown(injector.parent.parent.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:MainTown) => this.mainTown = town,
                (err:any) => this.errorMessage = "Geen stad gevonden"
            );

        _begrotingService.getGemeenteCategorieen(2020, "Gent")
            .subscribe((finan:any) => this.gemeenteCategorieen = finan,
                (err:any) => this.errorMessage = "Er zijn geen grafiekgegevens gevonden."
            );
    }

    ngOnInit() {

    }

    changeColor = () => {
        sessionStorage.setItem("mainColor", this.mainTown.hoofdKleur);
        location.reload();
    }

    changeImg = (event:any)=> {
        this.loadimage(event.target.files[0], (img:string) => {
            this.afb = img;
            this.mainTown.logo = img;
        });
    }

    loadimage = (img:any, cb:any)=> {
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
            let result = reader.result;
            cb(result);
        }
    }

    verwijder(f:Faq) {
        this.mainTown.FAQs.pop(f);
        if (f.id != 0) {
            this._townService.deleteFAQ(f.id).subscribe(
                (d:number) => this.id = d,
                (err:any) => this.errorMessage = err
            );
        }

    }

    submit() {
        this._townService.putTownInput(this.mainTown).subscribe(
            (d:number) => this.id = d,
            (err:any) => this.errorMessage = err);
        this._router.navigate(['/', 'App',{town: this.mainTown.naam}, 'Budget']);
    }

    voegToe() {
        this.mainTown.FAQs.push(new Faq(this.faq.vraag, this.faq.antwoord));
        this.faq.vraag = "";
        this.faq.antwoord="";
    }


}