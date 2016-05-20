import DateTimeFormat = Intl.DateTimeFormat;
import {BudgetWijziging} from "./bugdetWijziging";
import {IngelogdeGebruiker} from "./ingelogdeGebruiker";
import {Stem} from "./stem";
/**
 * Created by nadya on 19/05/2016.
 */


export class BegrotingsVoorstel {

    Id:number;
    aantalStemmen: number;
    totaal: number;
    samenvatting: string;
    beschrijving: string;
    budgetWijzigingen: BudgetWijziging [] = [];
  //  stemmen: Stem [] = [];
    verificatieStatus: number;
    verificatorEmail: string;
    auteurEmail: string;
    
    constructor()
    {
        
    }
}
