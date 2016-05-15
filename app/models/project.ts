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

    constructor(titel:string)
    {
        this.titel = titel;
        this.projectScenario = 0;
        this.vraag = "";
        this.extraInfo="";
        this.bedrag = 1000;
        this.maxBedrag = 10;
        this.minBedrag = 10;
        this.boekjaar =2020;
        this.gemeente="Gent"
    }

}