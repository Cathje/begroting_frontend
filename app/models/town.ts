export class Town {
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
    parent:any;

    constructor(name:string, postCode: string) {
        this.naam = name;
        this.postCode = postCode;
    }
}