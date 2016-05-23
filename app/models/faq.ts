
/**
 * Created by nadya on 30/04/2016.
 */
export class Faq {
    id:number;
    vraag:string;
    antwoord:string;

    constructor(vraag:string, antwoord: string)
    {
        this.id=0;
        this.vraag = vraag;
        this.antwoord = antwoord;
    }
}