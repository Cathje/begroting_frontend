import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({ //invoke with metadata object
    selector: 'slider',
    template: `
                <!--TODO: ipv (click) (change) event????!!! maar niet steeds getriggerd!!!!-->
                <input *ngIf="inspraakNiveau != 3" disabled type="range" name="{{name}}" id="{{id}}" [(ngModel)]="data" (ngModelChange)="datChange($event)" min="{{MIN}}" max="{{max}}" step="{{step}}" (click)="emitEvent($event)"/>
                <input *ngIf="inspraakNiveau == 3" type="range" name="{{name}}" id="{{id}}" [(ngModel)]="data" (ngModelChange)="datChange($event)" min="{{MIN}}" max="{{max}}" step="{{step}}" (click)="emitEvent($event)"/>
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
    /*@Input() min: number;
    @Input() max: number;*/
    @Input() value: number;
    /*@Input() step: number;*/
    @Input() itemID: number;
    @Input() propositionParent: boolean = false;
    @Input() inspraakNiveau: number;
    @Output() dataChange = new EventEmitter();
    @Output() changes = new EventEmitter();

    private MIN: number = 0;
    private max: number;
    private step: number;
    ngOnInit() { /*TODO: limieten op max en min voor acties???*/
        this.max = (this.value*2);
        if (this.value <= 3000){
            this.step = 10;
        }
        else if (this.value <= 10000){
            this.step= 100
        }
        else {
            this.step = 1000;
        }
    }
    
    private datChange(newValue: any){
        this.data = newValue;
        this.dataChange.emit(this.data);
    }

    private emitEvent(event: any){
        if(!this.propositionParent)
        {
            this.changes.emit(false);
        }
        else{
            this.changes.emit({event:event, id: this.itemID});
        }
        
    }








}
