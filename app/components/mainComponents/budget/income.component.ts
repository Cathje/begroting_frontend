import {Component, Injector} from 'angular2/core';

@Component({
    selector: 'income-container',
    template: `
        <div class="container">
            <section class="intro col-xs-12">
                <h1>De inkomsten</h1>
                <p>
                Er is nog geen informatie beschikbaar over de inkomsten van uw gemeente. Neem binnenkort terug een kijkje.
                </p>
            </section>
       </div>
    `,
})

export class IncomeComponent {}


