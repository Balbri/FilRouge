import { Component, OnInit } from '@angular/core';
import { LivresService } from '../services/livres.service';
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

  constructor(private livresService: LivresService) {}

  ngOnInit() {
    this.livresList = this.livresService.availableLivres$;
    this.getLangues();
    this.getEditeurs();
    this.getGenres();
    this.getAuteurs();
  }

  getLangues() {
    this.livresService.getLangues().subscribe(langues => this.langues = langues);
  }

  getEditeurs() {
    this.livresService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);
  }

  getGenres() {
    this.livresService.getGenres().subscribe(genres => this.genres = genres);
  }

  getAuteurs() {
    this.livresService.getAuteurs().subscribe(auteurs => this.auteurs = auteurs);
  }

}
