/**
 * Created by nadya on 19/05/2016.
 */

export class BudgetWijziging {

    bedrag: number;
    beschrijving: string;
    inspraakItemId: number;
    inspraakItem: string;
    
    constructor(id:number, bedrag: number, beschrijving: string)
    {
        this.inspraakItemId = id;
        this.beschrijving = beschrijving;
        this.bedrag = bedrag;
    }

    
}