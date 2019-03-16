import { Component, OnInit } from '@angular/core';
import { Auteur } from '../Model/auteur';
import { LivresService } from '../services/livres.service';
import { Langue } from '../Model/langue';
import { Editeur } from '../Model/editeur';
import { Genre } from '../Model/genre';
import { Location } from '@angular/common';
import { Livre } from '../Model/livre';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguesService } from '../services/langues.service';
import { EditeursService } from '../services/editeurs.service';
import { AuteursService } from '../services/auteurs.service';
import { GenresService } from '../services/genres.service';
import { HttpClient } from '@angular/common/http';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

@Component({
  selector: 'app-gestion-detail-livre',
  templateUrl: './gestion-detail-livre.component.html',
  styleUrls: ['./gestion-detail-livre.component.css']
})
export class GestionDetailLivreComponent implements OnInit {

  id: number;
  idDefault = null;
  auteurs: Auteur[] = [];
  langues: Langue[] = [];
  editeurs: Editeur[] = [];
  genres: Genre[] = [];
  livreForm: FormGroup;
  isbnInit = '';
  titreLivreInit = '';
  imageCouvertureInit = '';
  imageCouverture = '';
  anneeParutionInit = 0;
  stockInit = 0;
  prixNeufInit = 0;
  prixOccasInit = 0;
  langueInit = null;
  editeurInit = null;
  auteursInit = [];
  genresInit = [];
  sujetLivreInit = '';
  descriptionLivreInit = '';
  dateModif = new Date();

  langueList: BehaviorSubject<Langue[]>;

  constructor(private livresService: LivresService,
              private languesService: LanguesService,
              private editeursService: EditeursService,
              private auteursService: AuteursService,
              private genresService: GenresService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    if (this.id) {
      this.getLivreById(this.id);
    } else {
      this.getAuteurs();
      this.getLangues();
      this.getEditeurs();
      this.getGenres();
      this.initForm();
    }
  }

  initForm() {
    this.livreForm = this.formBuilder.group({
      isbn: [this.isbnInit, Validators.required],
      titreLivre: [this.titreLivreInit, Validators.required],
      imageCouverture: [this.imageCouvertureInit, Validators.required],
      anneeParution: [this.anneeParutionInit, Validators.required],
      stock: [this.stockInit, Validators.required],
      prixNeuf: [this.prixNeufInit, Validators.required],
      prixOccas: [this.prixOccasInit, Validators.required],
      langue: [this.langueInit, Validators.required],
      editeur: [this.editeurInit, Validators.required],
      auteurs: this.formBuilder.array(this.auteursInit),
      genres: this.formBuilder.array(this.genresInit),
      sujetLivre: [this.sujetLivreInit, Validators.required],
      descriptionLivre: [this.descriptionLivreInit, Validators.required]
    });
  }

  getLivreById(id: number) {
    this.livresService.findLivre(id).subscribe(livre => {
      this.getAuteurs();
      this.getLangues();
      this.getEditeurs();
      this.getGenres();
      this.isbnInit = livre.isbn;
      this.titreLivreInit = livre.titreLivre;
      this.imageCouvertureInit = livre.imageCouverture;
      this.anneeParutionInit = livre.anneeParution;
      this.stockInit = livre.stock;
      this.prixNeufInit = livre.prixNeuf;
      this.prixOccasInit = livre.prixOccas;
      this.langueInit = this.langues.find(langue => langue.idLangue === livre.langue.idLangue);
      this.editeurInit = this.editeurs.find(editeur => editeur.idEditeur === livre.editeur.idEditeur);
      for (const auteur of this.auteurs) {
        for (const auteurLivre of livre.auteurs) {
          if (auteur.idAuteur === auteurLivre.idAuteur) {
            this.auteursInit.push(auteur);
          }
        }
      }
      for (const genre of this.genres) {
        for (const genreLivre of livre.genres) {
          if (genre.idGenre === genreLivre.idGenre) {
            this.genresInit.push(genre);
          }
        }
      }
      this.sujetLivreInit = livre.sujetLivre;
      this.descriptionLivreInit = livre.descriptionLivre;
      this.initForm();
    });
  }

  getLangues() {
    this.languesService.availableLangues$.subscribe(langues => this.langues = langues);
  }

  getEditeurs() {
    this.editeursService.availableEditeurs$.subscribe(editeurs => this.editeurs = editeurs);
  }

  getAuteurs() {
    this.auteursService.availableAuteurs$.subscribe(auteurs => this.auteurs = auteurs);
  }

  getGenres() {
    this.genresService.availableGenres$.subscribe(genres => this.genres = genres);
  }

  onSave() {
    const formValue = this.livreForm.value;
    if (this.id) {
      this.idDefault = this.id;
    }
    const newLivre = new Livre(
      this.idDefault,
      formValue['isbn'].toString(),
      formValue['titreLivre'],
      formValue['imageCouverture'],
      formValue['sujetLivre'],
      formValue['descriptionLivre'],
      formValue['anneeParution'],
      +formValue['prixOccas'],
      +formValue['prixNeuf'],
      formValue['langue'],
      formValue['editeur'],
      +formValue['stock'],
      this.dateModif,
      formValue['genres'] ? formValue['genres'] : [],
      formValue['auteurs'] ? formValue['auteurs'] : []
    );
    if (this.id) {
      this.livresService.updateLivre(newLivre);
    } else {
      this.livresService.createLivre(newLivre);
    }
    this.location.back();
  }

  getAuteursControl() {
    return this.livreForm.get('auteurs') as FormArray;
  }

  onAddAuteur() {
    const newAuteurControl = this.formBuilder.control('', Validators.required);
    this.getAuteursControl().push(newAuteurControl);
  }

  getGenresControl() {
    return this.livreForm.get('genres') as FormArray;
  }

  onAddGenre() {
    const newGenreControl = this.formBuilder.control('', Validators.required);
    this.getGenresControl().push(newGenreControl);
  }

  onBack() {
    this.location.back();
  }

}
