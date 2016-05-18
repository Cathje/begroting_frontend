import {PipeTransform, Pipe} from "angular2/core";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value:any, args:string[]) : any {
        let keys:any = [];
        for (var enumMember in value) {
            var isValueProperty = parseInt(enumMember, 10) >= 0;
            if (isValueProperty) {
                keys.push({key: enumMember, value: value[enumMember]});
            }
        }
        return keys;
    }
}
