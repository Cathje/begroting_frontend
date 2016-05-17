import {ProjectScenario} from "./projectScenario.js";
import {GemeenteCategorie} from "./gemeenteCategorie.js";
export class Project {

    projectScenario: number;
    titel: string;
    vraag: string;
    extraInfo: string;
    bedrag: number;
    minBedrag: number;
    maxBedrag: number;
    gemeente:string;
    boekjaar: number;
    categorieen: GemeenteCategorie[];
    afbeeldingen: string [];
    isActief : boolean;

    constructor(titel:string)
    {
        this.titel = titel;
    }

}