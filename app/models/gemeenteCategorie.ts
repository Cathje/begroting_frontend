import {Actie} from "./actie";
/**
 * Created by nadya on 9/05/2016.
 */

export interface GemeenteCategorie
{
    ID: number;
    totaal:any;
    catA?:string;
    catB?:string;
    catC?:string;
    naamCat?:string
    inspraakNiveau?:number;
    gemcatID?:number;
    acties?:Actie [];
    childCats?:GemeenteCategorie [];
    catType?:string;
    
}
