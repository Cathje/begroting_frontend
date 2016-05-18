import {rolType} from "./rolType";

export class IngelogdeGebruiker {

    userId:string;
    naam:string;
    gemeente:string;
    rolType:rolType;

    constructor( userId:string, naam:string, gemeente:string, rolType:rolType)
    {
        this.userId = userId;
        this.naam = naam;
        this.gemeente = gemeente;
        this.rolType = rolType;
    }

}