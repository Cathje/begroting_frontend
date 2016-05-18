import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'add-information-container',
    template: `
    <div class="container">
    <h2>Voeg informatie toe</h2>
    <input id="file" type="file" (change)="onChange($event)"/>
    <img [src]="base64" />
    </div>
    `
})

export class AddInformationComponent {
    base64;
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

    }
    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
    }
}