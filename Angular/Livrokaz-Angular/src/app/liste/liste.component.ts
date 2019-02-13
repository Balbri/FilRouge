import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';
import { Langue } from '../Model/langue';
import { Editeur } from '../Model/editeur';
import { Genre } from '../Model/genre';
import { Auteur } from '../Model/auteur';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  livre: Livre;
  langues: Langue[] = [];
  editeurs: Editeur[] = [];
  genres: Genre[] = [];
  auteurs: Auteur[] = [];

  livresList: BehaviorSubject<Livre[]>;

  constructor(private datasService: DatasService) { }

  ngOnInit() {
    this.livresList = this.datasService.availableLivres$;
    this.getLangues();
    this.getEditeurs();
    this.getGenres();
    this.getAuteurs();
    // console.log(this.livresList);
  }

  getLangues() {
    this.datasService.getLangues().subscribe(langues => this.langues = langues);
  }

  getEditeurs() {
    this.datasService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);
  }

  getGenres() {
    this.datasService.getGenres().subscribe(genres => this.genres = genres);
  }

  getAuteurs() {
    this.datasService.getAuteurs().subscribe(auteurs => this.auteurs = auteurs);
  }

  onSave() {
    this.livre = new Livre(1, 666, 'Germinal', 'https://images-na.ssl-images-amazon.com/images/I/51V6YDH84BL.jpg',
                      'sujet', 'description', 2000,
                      11, 15.59, this.langues[0], this.editeurs[0], 21, [this.genres[0], this.genres[1]], [this.auteurs[0]]);
    this.datasService.createLivre(this.livre);
  }

  onDelete() {
    const idLivre: number = this.livresList.getValue()[this.livresList.getValue().length - 1].idLivre;
    this.datasService.deleteLivre(idLivre);
  }

  onUpdate() {
    const idLivre: number = this.livresList.getValue()[this.livresList.getValue().length - 1].idLivre;
    this.livre = new Livre(idLivre, 666, 'Toto',
          'https://ec56229aec51f1baff1d-185c3068e22352c56024573e929788ff.ssl.cf1.rackcdn.com/attachments/large/3/8/9/003758389.jpg',
          'sujet', 'description', 2000,
                      8, 10, this.langues[0], this.editeurs[0], 21, [this.genres[0]], [this.auteurs[0]]);
    this.datasService.updateLivre(this.livre);
  }

}
