import {Component, Injector} from 'angular2/core';

@Component({
    selector: 'faq-container',
    template: `
        <div class="container">
            <section class="intro col-xs-12">
                <h1>FAQ</h1>
                <p>
                Er zijn nog geen frequently asked questions beschikbaar
                </p>
            </section>
       </div>
    `,
})

export class FaqComponent {
    //TODO: webapi to get FAQ

}


