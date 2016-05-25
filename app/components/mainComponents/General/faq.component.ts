import {Component, Injector} from 'angular2/core';
import {RouteParams} from "angular2/router";
import {Faq} from "../../../models/faq";
import {MainTown} from "../../../models/mainTown";
import {TownService} from "../../../services/townService.component";
import {Router} from "angular2/router";

@Component({
    selector: 'faq-container',
    template: `
        <div class="container">
            <section class="intro col-xs-12">
                <h1>FAQ</h1>
                <div class="form-inline">
                <ul *ngIf="mainTown?.FAQs" >
                   <li *ngFor="#f of mainTown.FAQs" >
                   <p><bold>{{f.vraag}}</bold></p>
                   <p>{{f.antwoord}} </p>
                    </li>
                </ul>
                <p *ngIf="!mainTown?.faqs"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>
                </div>
            </section>
       </div>
    `,
})

export class FaqComponent {
    //TODO: webapi to get FAQ
    mainTown = new MainTown("","",0,0);
    faq = new Faq("", "");
    errorMessage:string;

    constructor( private _routeParams: RouteParams, private _townService: TownService, private _router:Router, injector:Injector)
    {
        _townService.getTown(injector.parent.parent.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:any) => this.mainTown = town,
                (err:any) => this.errorMessage = err
            );
    }

}


