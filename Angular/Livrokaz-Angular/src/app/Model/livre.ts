export class Livre{

    constructor(
    private idLivre: number,
	private isbn: number,
	private titreLivre: string,
	private imageCouverture : string,
	private sujetLivre: string,
	private descriptionLivre: string,
	private anneeParution: number,
	private prixNeuf: number,
	private prixOccas: number,
    private stock: number){}
       

}