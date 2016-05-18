import {ProjectScenario} from "./projectScenario";
import {GemeenteCategorie} from "./gemeenteCategorie";
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

    constructor(titel:string)
    {
        this.titel = titel;
    }

}