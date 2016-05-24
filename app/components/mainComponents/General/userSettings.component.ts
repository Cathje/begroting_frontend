import {Component, Injector} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'overview-container',
    template: `
        <div class="overview-container">
            <div class="container">
            <h1>Hoe pas ik mijn account gegevens aan?</h1>
                <p>
                Stuur een mailtje naar info@debegroting.be met de vermelding van je probleem.
                </p>
            </div>
    </div>
`,
    directives: [],
    providers: [],
    styles: [`

`]
})

export class UserSettingsComponent {
    //todo adapt user settings
}

