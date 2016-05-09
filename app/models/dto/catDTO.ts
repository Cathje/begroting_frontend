export class CatDTO {
    hoofdCategorie: string;
    bedrag: number;

    constructor(categorie:string, bedrag: number) {
        this.hoofdCategorie = categorie;
        this.bedrag = bedrag;

    }
}
