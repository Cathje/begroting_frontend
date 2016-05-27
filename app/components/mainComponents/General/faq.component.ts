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
                <ul >
                   <li *ngFor="#f of mainTown.FAQs" >
                   <p><strong>{{f.vraag}}</strong></p>
                   <p>{{f.antwoord}} </p>
                    </li>
                </ul>
                <p *ngIf="mainTown?.FAQs?.length < 1"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>
                </div>
            </section>
       </div>
    `,
    styles: [`
        ul {
        list-style :none;
        }
    `]
})

export class FaqComponent {
    mainTown = new MainTown("","",0,0);
    faq = new Faq("", "");
    errorMessage:string;

    constructor( private _routeParams: RouteParams, private _townService: TownService, private _router:Router, injector:Injector)
    {
        _townService.getTown(injector.parent.parent.parent.parent.get(RouteParams).get('town'))
            .subscribe(
                (town:MainTown) => this.mainTown = town,
                (err:any) => this.errorMessage = err
            );
    }

}


