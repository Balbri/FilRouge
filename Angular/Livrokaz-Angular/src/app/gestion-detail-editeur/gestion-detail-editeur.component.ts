import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditeursService } from '../services/editeurs.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Editeur } from '../Model/editeur';

@Component({
  selector: 'app-gestion-detail-editeur',
  templateUrl: './gestion-detail-editeur.component.html',
  styleUrls: ['./gestion-detail-editeur.component.css']
})
export class GestionDetailEditeurComponent implements OnInit {

  id: number;
  idDefault: number;
  editeurForm: FormGroup;
  nomEditeurInit = '';

  constructor(private editeursService: EditeursService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    if (this.id) {
      this.getEditeurById(this.id);
    }
    this.initForm();
  }

  initForm() {
    this.editeurForm = this.formBuilder.group({
      nomEditeur: [this.nomEditeurInit, Validators.required]
    });
  }

  getEditeurById(id: number) {
    this.editeursService.findEditeur(id).subscribe(editeur => {
      this.nomEditeurInit = editeur.nomEditeur;
    });
  }

  onSave() {
    const formValue = this.editeurForm.value;
    if (this.id) {
      this.idDefault = this.id;
    }
    const newEditeur = new Editeur(
      this.idDefault,
      formValue['nomEditeur']
    );
    if (this.id) {
      this.editeursService.updateEditeur(newEditeur);
    } else {
      this.editeursService.createEditeur(newEditeur);
    }
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}
