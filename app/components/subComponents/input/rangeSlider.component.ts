import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({ //invoke with metadata object
    selector: 'slider',
    template: `
                <input type="range" name="slide" id="speedSlider" [(ngModel)]="data" (ngModelChange)="datChange($event)" min="1500" max="15000" value="2000" step="50" (change)="emitEvent()"/>
    `,
    styles:[`

/*#speedSlider {
   width: 70%;
   margin-top: 1em;
   margin-bottom: 3em;
   !*margin-right: 10em;*!
   !*!/text-align: center;*!
   }*/

    /*Range CSS*/
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 5.3px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
  background: #2ac7d2;
  border-radius: 17.1px;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;
  border: 1px solid #3d0000;
  height: 19px;
  width: 41px;
  border-radius: 44px;
  background: rgba(36, 37, 40, 0.88);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7.9px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #97e5ea;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
  background: #2ac7d2;
  border-radius: 17.1px;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;
  border: 1px solid #3d0000;
  height: 19px;
  width: 41px;
  border-radius: 44px;
  background: rgba(36, 37, 40, 0.88);
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #145e63;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
  border-radius: 34.2px;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
}
input[type=range]::-ms-fill-upper {
  background: #2ac7d2;
  border: 2.6px solid rgba(133, 148, 132, 0.36);
  border-radius: 34.2px;
  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;
  border: 1px solid #3d0000;
  height: 19px;
  width: 41px;
  border-radius: 44px;
  background: rgba(36, 37, 40, 0.88);
  cursor: pointer;
  height: 8.4px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #2ac7d2;
}
input[type=range]:focus::-ms-fill-upper {
  background: #97e5ea;
}
/*End Range CSS*/

      `,]
})

export class rangeSlider {
    @Input() name: string;
    @Input() id: string;
    @Input() data: number;
    @Input() min: number;
    @Input() max: number;
    @Input() value: number;
    @Input() step: number;
    @Output() dataChange = new EventEmitter();
    @Output() changes = new EventEmitter();

    private datChange(newValue: any){
        this.data = newValue;
        this.dataChange.emit(this.data);
    }

    private emitEvent(){
        this.changes.emit(false);
    }








}
