import {Component, Injector} from 'angular2/core';

@Component({
    selector: 'income-container',
    template: `
        <div class="container">
            <section class="intro col-xs-12">
                <h1>De inkomsten van {{mainTown?.naam}}</h1>
                <p>
                Er is nog geen informatie beschikbaar over de inkomsten van de gemeente {{mainTown?.naam}}. Neem binnenkort terug een kijkje.
                </p>
            </section>
       </div>
    `,
})

export class IncomeComponent {}

