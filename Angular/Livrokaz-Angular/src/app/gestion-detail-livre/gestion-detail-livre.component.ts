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

@Component({
  selector: 'app-gestion-detail-livre',
  templateUrl: './gestion-detail-livre.component.html',
  styleUrls: ['./gestion-detail-livre.component.css']
})
export class GestionDetailLivreComponent implements OnInit {

  id: number;
  idDefault = 7;
  auteurs: Auteur[] = [];
  langues: Langue[] = [];
  editeurs: Editeur[] = [];
  genres: Genre[] = [];
  livreForm: FormGroup;
  isbnInit = '';
  titreLivreInit = '';
  imageCouvertureInit = '';
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

  constructor(private datasService: LivresService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.getAuteurs();
    this.getLangues();
    this.getEditeurs();
    this.getGenres();
    if (this.id) {
      this.getLivreById(this.id);
    }
    this.initForm();
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
    this.datasService.findLivre(id).subscribe(livre => {
      this.isbnInit = livre.isbn;
      this.titreLivreInit = livre.titreLivre;
      this.imageCouvertureInit = livre.imageCouverture;
      this.anneeParutionInit = livre.anneeParution;
      this.stockInit = livre.stock;
      this.prixNeufInit = livre.prixNeuf;
      this.prixOccasInit = livre.prixOccas;
      this.langueInit = livre.langue;
      this.editeurInit = livre.editeur;
      this.auteursInit = livre.auteurs;
      this.genresInit = livre.genres;
      this.sujetLivreInit = livre.sujetLivre;
      this.descriptionLivreInit = livre.descriptionLivre;
    });
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
      formValue['genres'] ? formValue['genres'] : [],
      formValue['auteurs'] ? formValue['auteurs'] : []
    );
    if (this.id) {
      this.datasService.updateLivre(newLivre);
    } else {
      this.datasService.createLivre(newLivre);
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
