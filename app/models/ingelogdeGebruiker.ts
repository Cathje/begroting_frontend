import {rolType} from "./rolType";

export class IngelogdeGebruiker {

    userId:string;
    naam:string;
    gemeente:string;
    rolType:rolType;
    isActief:boolean;

    constructor( userId:string, naam:string, gemeente:string, rolType:rolType, isActief:boolean)
    {
        this.userId = userId;
        this.naam = naam;
        this.gemeente = gemeente;
        this.rolType = rolType;
        this.isActief = isActief;
    }

}