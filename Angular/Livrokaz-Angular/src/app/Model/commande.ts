export class Commande {

    constructor(
        public idCommande: number,
        public date: string,
        public fraisDePort: number,
        public tva: number,
        public ttc: number,
        public valide: number
    ) {}
}
