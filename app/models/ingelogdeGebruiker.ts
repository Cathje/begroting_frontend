/**
 * Created by nadya on 11/05/2016.
 */
/**
 * Created by kevin on 08/05/2016.
 */
export class IngelogdeGebruiker {

    Naam:string;
    Password:string;
    bevestigPaswoord:string;
    email:string;
    gemeente:string;

    constructor( Naam:string, Password:string, bevestigPaswoord:string, email:string, gemeente:string)
    {
        this.Naam = Naam;
        this.Password = Password;
        this.bevestigPaswoord = bevestigPaswoord;
        this.email = email;
        this.gemeente = gemeente;
    }

}