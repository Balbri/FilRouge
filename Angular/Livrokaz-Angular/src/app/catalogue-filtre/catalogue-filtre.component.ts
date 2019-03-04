import { Component, OnInit } from '@angular/core';
import { LivresService } from '../services/livres.service';
import { BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';
import { Langue } from '../Model/langue';
import { Editeur } from '../Model/editeur';
import { Genre } from '../Model/genre';
import { Auteur } from '../Model/auteur';
@Component({
  selector: 'app-catalogue-filtre',
  templateUrl: './catalogue-filtre.component.html',
  styleUrls: ['./catalogue-filtre.component.css']
})
export class CatalogueFiltreComponent implements OnInit {

  livre: Livre;
  langues: Langue[] = [];
  editeurs: Editeur[] = [];
  genres: Genre[] = [];
  auteurs: Auteur[] = [];

  filteredBooks: BehaviorSubject<Livre[]>;

  constructor(private livresService: LivresService) {}

  ngOnInit() {
    this.filteredBooks = this.livresService.filteredBooks$;
    this.getLangues();
    this.getEditeurs();
    this.getGenres();
    this.getAuteurs();
    // console.log(this.livresList);
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