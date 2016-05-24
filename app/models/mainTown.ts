import {Town} from "./town";
import {Bestuur} from "./bestuur";
import {Faq} from "./faq";
export class MainTown {
    HoofdGemeenteID:number;
    naam:string;
    postCode:string;
    provincie:string;
    aantalBewoners:number;
    oppervlakte:number;
    oppervlakteMaat:string;
    isMan:number;
    isVrouw:number;
    bestuur:Bestuur [];
    isKind:number;
    aanslagVoet:number;
    cluster:any;
    deelGemeenten:Town [];
    FAQs: Faq [];
    hoofdkleur: string;
    logo: string;


    constructor(name:string, postCode: string, gemeenteId:number, belasting: number) {
        this.naam = name;
        this.postCode = postCode;
        this.GemeenteID = gemeenteId;
        this.aanslagVoet = belasting;

    }
}