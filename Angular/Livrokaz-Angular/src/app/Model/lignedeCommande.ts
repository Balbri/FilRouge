import { Livre } from './livre';

export class LigneDeCommande {
    constructor(
        public idLigneCommande: number,
        public quantite: number,
        public livre: Livre
    ) {}
}
