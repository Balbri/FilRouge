import { Livre } from './livre';
import { Commande } from './commande';

export class LigneDeCommande {
    constructor(
        public idLigneCommande: number,
        public quantite: number,
        public livre: Livre,
        public commande: Commande
    ) {}
}
