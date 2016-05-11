import {GemeenteCategorie} from "../gemeenteCategorie.js";
import {InspraakNiveau} from "../inspraakNiveau.js";
/**
 * Created by nadya on 10/05/2016.
 */

export class InspraakCategorie implements GemeenteCategorie
{
    ID: string;
    totaal:any;
    naamCatz:string;
    inspraakNiveau:number;
}