import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gestion-auteurs',
  templateUrl: './gestion-auteurs.component.html',
  styleUrls: ['./gestion-auteurs.component.css']
})
export class GestionAuteursComponent implements OnInit {


idAuteur:number;
idDefault:7;
nomAuteurInit:string;
prenomAuteurInit: string;


  constructor( 
            private auteurService: DatasService,
            private location: Location,
            private route: ActivatedRoute,
            private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idAuteur = +this.route.snapshot.params.id;
    if (this.idAuteur) {
      this.getAuteurById(this.idAuteur);
    }
    this.initForm();
  }

  initForm() {
    this.auteurForm = this.formBuilder.group({
      nomAuteur: [this.nomAuteurInit, Validators.required],
      prenomAuteur: [this.prenomAuteurInit, Validators.required]
    });
  }
  getAuteurById(id: number) {
    this.auteurService.findAuteur(id).subscribe(auteur => {
     
      this.nomAuteurInit = auteur.nameAuteur;
      this.prenomAuteurInit = auteur.surnameAuteur;
    });
}
}
