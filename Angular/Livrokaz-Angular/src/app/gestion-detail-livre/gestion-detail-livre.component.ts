import { Component, OnInit } from '@angular/core';
import { Auteur } from '../Model/auteur';
import { DatasService } from '../services/datas.service';
import { Langue } from '../Model/langue';
import { Editeur } from '../Model/editeur';
import { Genre } from '../Model/genre';

@Component({
  selector: 'app-gestion-detail-livre',
  templateUrl: './gestion-detail-livre.component.html',
  styleUrls: ['./gestion-detail-livre.component.css']
})
export class GestionDetailLivreComponent implements OnInit {

  auteurs: Auteur[] = [];
  langues: Langue[] = [];
  editeurs: Editeur[] = [];
  genres: Genre[] = [];

  constructor(private datasService: DatasService) { }

  ngOnInit() {
    this.getAuteurs();
    this.getLangues();
    this.getEditeurs();
    this.getGenres();
  }

  getLangues() {
    this.datasService.getLangues().subscribe(langues => this.langues = langues);
  }

  getEditeurs() {
    this.datasService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);
  }

  getAuteurs() {
    this.datasService.getAuteurs().subscribe(auteurs => this.auteurs = auteurs);
  }

  getGenres() {
    this.datasService.getGenres().subscribe(genres => this.genres = genres);
  }

}
