import { Component, OnInit } from '@angular/core';
import { Auteur } from '../Model/auteur';
import { DatasService } from '../services/datas.service';
import { Langue } from '../Model/langue';
import { Editeur } from '../Model/editeur';
import { Genre } from '../Model/genre';
import { Location } from '@angular/common';
import { Livre } from '../Model/livre';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  imageUrl = '';
  leLivre: Livre;
  livreForm: FormGroup;

  constructor(private datasService: DatasService,
              private location: Location,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAuteurs();
    this.getLangues();
    this.getEditeurs();
    this.getGenres();
    this.initForm();
  }

  initForm() {
    this.livreForm = this.formBuilder.group({
      isbn: ['', Validators.required],
      titreLivre: ['', Validators.required],
      imageCouverture: ['', Validators.required],
      anneeParution: ['', Validators.required],
      stock: ['', Validators.required],
      prixNeuf: ['', Validators.required],
      prixOccas: ['', Validators.required],
      langue: [null, Validators.required],
      editeur: [null, Validators.required],
      auteurs: this.formBuilder.array([]),
      genres: this.formBuilder.array([]),
      sujetLivre: ['', Validators.required],
      descriptionLivre: ['', Validators.required]
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
    const newLivre = new Livre(
      5,
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
    this.datasService.createLivre(newLivre);
    console.log(newLivre);
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
