import {PipeTransform, Pipe} from "angular2/core";

@Pipe({name: 'curPipe'})
export class CurConvert implements PipeTransform {
    transform(value:any, args:string[]) : any {
        /*console.log(value);*/
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "€"+parts[0];


        
    }
}
