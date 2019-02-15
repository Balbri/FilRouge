import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
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
nomAuteur:string;
prenomAuteur: string;


  constructor( 
            private auteurService: DatasService,
            private location: Location,
            private route: ActivatedRoute,
            private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idAuteur = +this.route.snapshot.params.id;
  }

}
