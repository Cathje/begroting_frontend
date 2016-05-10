import {PoliticusType} from "./politicusType";
/**
 * Created by nadya on 10/05/2016.
 */

export class Bestuur{

    PoliticusId:number;
    naam:string;
    type:PoliticusType;
    
    constructor(naam:string)
    {
        this.naam = naam;
        this.type= PoliticusType.Schepen;
    }
}