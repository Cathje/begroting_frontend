import {Town} from "./town";
export class MainTown {
    GemeenteID:string;
    naam:string;
    postCode:string;
    provincie:string;
    aantalBewoners:number;
    oppervlakte:number;
    oppervlakteMaat:string;
    isMan:any;
    isVrouw:any;
    bestuur:any;
    isKind:any;
    aanslagVoet:any;
    cluster:any;
    deelGemeenten:Town [];

    constructor(name:string, postCode: string) {
        this.naam = name;
        this.postCode = postCode;
    }
}