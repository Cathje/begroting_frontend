
/**
 * Created by nadya on 30/04/2016.
 */
export class Faq {
    ID:number;
    vraag:string;
    antwoord:string;

    constructor(vraag:string, antwoord: string)
    {
        this.vraag = vraag;
        this.antwoord = antwoord;
    }
}