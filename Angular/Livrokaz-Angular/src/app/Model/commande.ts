export class Commande {

    constructor(
    private idCommande: number,
    private date: string,
	private fraisDePort: number,
	private tva: number,
	private ttc: number,
	private valide: number
    ){}
}