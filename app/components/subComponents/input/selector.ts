import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'selector',
    template: `
                 <div class=" styled-select slate right-align">
                    <select class="" (change)="gotoHome($event)">
                        <option>{{defaultOption}}</option>
                        <option *ngFor="#option of options" [value]="option.naam">{{option.naam}} </option>
                    </select>
                </div>
    `,
    styles:[`
.slate{
    text-align: center;
    color:black;
}

.styled-select {
    overflow: hidden;
    width: 240px;
    margin: 0 auto;
}

.styled-select select {
    background: url(./../../../../app/images/arrow_down.png) no-repeat right rgba(255,255,255, 0.6);
    background-size: 35px 35px;
    border: none;
    font-size: 14px;
    height: 29px;
    padding: 5px; /* If you add too much padding here, the options won't show in IE */
    width: 240px;
}

select::-ms-expand {
    display: none;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}

      `,]
})

export class SelectorComponent {
    @Input options: [];
    @Input navigation: [];
    @Input defaultOption: string;
    selectedOption: any;


    gotoHome(event: any) {
      this._router.navigate(['/', 'App','Budget', { town: event.target.value}]);
    }
}