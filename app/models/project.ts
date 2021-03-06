import {ProjectScenario} from "./projectScenario";
import {GemeenteCategorie} from "./gemeenteCategorie";
import {BudgetWijziging} from "./bugdetWijziging";
import {BegrotingsVoorstel} from "./begrotingsVoorstel";
export class Project {

    id:number;
    projectScenario: number;
    titel: string;
    vraag: string;
    extraInfo: string;
    bedrag: number;
    minBedrag: number;
    maxBedrag: number;
    gemeente:string;
    boekjaar: number;
    cats: GemeenteCategorie[] = [];
    afbeelding: string;
    isActief : boolean;
    voorstellen: BegrotingsVoorstel [] = [];
    emailBeheerder:string;

    constructor(titel:string)
    {
        this.titel = titel;
    }

}