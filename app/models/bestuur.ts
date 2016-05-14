import {PoliticusType} from "./politicusType.js";
/**
 * Created by nadya on 10/05/2016.
 */

export class Bestuur{

    PoliticusId:number;
    naam:string;
    type:PoliticusType;
    
    constructor(naam: string, type:PoliticusType)
    {
        this.PoliticusId= 0;
        this.naam = naam;
        this.type= type;
    }
}