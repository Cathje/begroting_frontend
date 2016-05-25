import {Component, Input,Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';

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
    @Input() options: String[];
    @Input() callbackFunction: any;
    @Input() defaultOption: string;
    @Output() changeRequest = new EventEmitter();

    onChange(event: any){
        this.changeRequest.emit("");
    }
}