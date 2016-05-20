import {Component, Input,Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {EventEmitter} from "../../../../node_modules/angular2/ts/src/facade/async";

@Component({ //invoke with metadata object
    selector: 'selector',
    template: `
                 <div class=" styled-select slate right-align">
                    <select class="" (change)="onChange($event)">
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
    @Output changeRequest = new EventEmitter();

    onChange(event: any){
        this.changeRequest.emit("");
    }
}