import {Town} from "./town";
export class MainTown {
    GemeenteID:number;
    naam:string;
    postCode:string;
    provincie:string;
    aantalBewoners:number;
    oppervlakte:number;
    oppervlakteMaat:string;
    isMan:number;
    isVrouw:number;
    bestuur:number;
    isKind:number;
    aanslagVoet:number;
    cluster:any;
    deelGemeenten:Town [];

    constructor(name:string, postCode: string, gemeenteId:number) {
        this.naam = name;
        this.postCode = postCode;
        this.GemeenteID = gemeenteId;
    }
}