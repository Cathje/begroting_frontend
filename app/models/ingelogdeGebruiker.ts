/**
 * Created by nadya on 11/05/2016.
 */
import {rolType} from "./rolType";
/**
 * Created by kevin on 08/05/2016.
 */
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