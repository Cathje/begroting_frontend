import {Component, Input} from 'angular2/core';

@Component({ //invoke with metadata object
    selector: 'editable-field',
    template: `
                <div class="field" [ngClass]="{active: !isEditable}">
                   {{data}}
                </div>
                <div class="field" [ngClass]="{active: isEditable}">
                   <input type="number"  [(ngModel)]="data" step="any" />
                </div>
    `,
    styles:[`

    .field {
        font-size: 3em;
        display:none;
        text-align: center;
        width: 100%;
        color: lightgray;
    }

    .active {
        display:block;
    }

      `,]
})

export class EditableFieldComponent {
    @Input() isEditable: boolean;
    @Input() data: string;
}