import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'add-information-container',
    template: `
    <div class="container">
    <h2>Voeg informatie toe</h2>
    <input id="file" type="file" (change)="onChange($event)"/>
    <img src="{{base64}}" />
    <p>{{base64}}</p>
    </div>
    `
})

export class AddInformationComponent {
    base64:string;
    constructor(
        private _routeParams: RouteParams) {
    }

    onChange(event){
        console.log(event.target.files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function() {
            this.base64 = reader.result;
            console.log(this.base64);
        }
        //TODO: weet niet waarom, maar de base64 variabele wordt niet getoond in de component en blijft undefined, terwijl de console log wel werkt
    }
    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}