import {Town} from "./town";
export class MainTown {
    GemeenteID:string;
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

    constructor(name:string, postCode: string) {
        this.naam = name;
        this.postCode = postCode;
    }
}