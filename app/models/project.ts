import {ProjectScenario} from "./projectScenario.js";
import {InspraakCategorie} from "./dto/inspraakCategorieDTO.js";
export class Project {

    projectScenario: number;
    titel: string;
    vraag: string;
    extraInfo: string;
    bedrag: number;
    minBedrag: number;
    maxBedrag: number;

    constructor(titel:string)
    {
        this.titel = titel;
        this.projectScenario = 0;
        this.vraag = "";
        this.extraInfo="";
        this.bedrag = 1000;
        this.maxBedrag = 10;
        this.minBedrag = 10;
    }

}