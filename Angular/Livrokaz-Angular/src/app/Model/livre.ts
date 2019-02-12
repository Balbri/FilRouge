import { Langue } from './langue';
import { Editeur } from './editeur';
import { Genre } from './genre';

export class Livre {
	constructor(
		public idLivre: number,
		public isbn: number,
		public titreLivre: string,
		public imageCouverture: string,
		public sujetLivre: string,
		public descriptionLivre: string,
		public anneeParution: number,
		public prixOccas: number,
		public prixNeuf: number,
		public langue: Langue,
		public editeur: Editeur,
		public stock: number,
		public genres: Genre[]) {}
}
