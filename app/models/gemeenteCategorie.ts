import {Actie} from "./actie.js";
/**
 * Created by nadya on 9/05/2016.
 */

export interface GemeenteCategorie
{
    ID: number;
    totaal:any;
    naamCatx?:string;
    naamCaty?:string;
    naamCatz?:string;
    inspraakNiveau?:number;
    gemcatId?:number;
    acties?:Actie [];
    
}
