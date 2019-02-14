import { Component, OnInit } from '@angular/core';
import { LanguesService } from '../services/langues.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Langue } from '../Model/langue';

@Component({
  selector: 'app-gestion-detail-langue',
  templateUrl: './gestion-detail-langue.component.html',
  styleUrls: ['./gestion-detail-langue.component.css']
})
export class GestionDetailLangueComponent implements OnInit {

  id: number;
  idDefault = 7;
  langueForm: FormGroup;
  nomLangueInit = '';

  constructor(private languesService: LanguesService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    if (this.id) {
      this.getLangueById(this.id);
    }
    this.initForm();
  }

  initForm() {
    this.langueForm = this.formBuilder.group({
      nomLangue: [this.nomLangueInit, Validators.required]
    });
  }

  getLangueById(id: number) {
    this.languesService.findLangue(id).subscribe(langue => {
      this.nomLangueInit = langue.nomLangue;
    });
  }

  onSave() {
    const formValue = this.langueForm.value;
    if (this.id) {
      this.idDefault = this.id;
    }
    const newLangue = new Langue(
      this.idDefault,
      formValue['nomLangue']
    );
    if (this.id) {
      this.languesService.updateLangue(newLangue);
    } else {
      this.languesService.createLangue(newLangue);
    }
    this.location.back();
  }

  onBack() {
    this.location.back();
  }
}
