import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'selector',
    template: `
                 <div class=" styled-select slate right-align">
                    <select class="" (change)="callbackFunction($event)">
                        <option>{{defaultOption}}</option>
                        <option *ngFor="#option of options" [value]="option">{{option}} </option>
                    </select>
                </div>
    `,
    styles:[`

      `,]
})

export class SelectorComponent {
    @Input() options: [];
    @Input() callbackFunction: any;
    @Input() defaultOption: string;
}