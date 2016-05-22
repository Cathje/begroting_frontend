/**
 * Created by nadya on 22/05/2016.
 */

export class ReactieOpVoorstel {

    reactieDatum:string;
    beschrijving:string;
    email:string;
    constructor(besch:string, email:string)
    {
        this.beschrijving = besch;
        this.email=email;
    }
}