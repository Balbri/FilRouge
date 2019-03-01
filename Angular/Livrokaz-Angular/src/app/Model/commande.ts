import { LigneDeCommande } from './lignedeCommande';
import { Client } from './client';

export class Commande {

    constructor(
        public idCommande: number,
        public date: Date,
        public fraisDePort: number,
        public tva: number,
        public ttc: number,
        public total: number,
        public nbreArticles: number,
        public valide: number,
        public client: Client,
        public ligneDeCommandes: LigneDeCommande[]
    ) {}
}
