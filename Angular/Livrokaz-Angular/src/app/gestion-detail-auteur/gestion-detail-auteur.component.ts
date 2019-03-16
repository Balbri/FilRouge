import { Component, OnInit } from '@angular/core';
import { AuteursService } from '../services/auteurs.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auteur } from '../Model/Auteur';

@Component({
  selector: 'app-gestion-detail-auteur',
  templateUrl: './gestion-detail-auteur.component.html',
  styleUrls: ['./gestion-detail-auteur.component.css']
})
export class GestionDetailAuteurComponent implements OnInit {

  id: number;
  idDefault = null;
  auteurForm: FormGroup;
  nomAuteurInit = '';
  prenomAuteurInit = '';

  constructor(private auteursService: AuteursService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    if (this.id) {
      this.getAuteurById(this.id);
    }
    this.initForm();
  }

  initForm() {
    this.auteurForm = this.formBuilder.group({
      nameAuteur: [this.nomAuteurInit, Validators.required],
      surnameAuteur: [this.prenomAuteurInit, Validators.required]
    });
  }

  getAuteurById(id: number) {
    this.auteursService.findAuteur(id).subscribe(auteur => {
      this.nomAuteurInit = auteur.nameAuteur;
      this.prenomAuteurInit = auteur.surnameAuteur;
    });
  }

  onSave() {
    const formValue = this.auteurForm.value;
    if (this.id) {
      this.idDefault = this.id;
    }
    const newAuteur = new Auteur(
      this.idDefault,
      formValue['nameAuteur'],
      formValue['surnameAuteur']
    );
    if (this.id) {
      this.auteursService.updateAuteur(newAuteur);
    } else {
      this.auteursService.createAuteur(newAuteur);
    }
    this.location.back();
  }

  onBack() {
    this.location.back();
  }
}
