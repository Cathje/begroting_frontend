
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