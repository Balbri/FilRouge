import { Component, OnInit, Input } from '@angular/core';
import { Livre } from '../Model/livre';
import { RecherchesService } from '../services/recherches.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {

  tableauLivre: Livre[] = [];

  constructor(private rechercheService: RecherchesService,
              private location: Location) { }

  ngOnInit() {
    this.rechercheService.availableLivres$.subscribe(livres => {
      this.tableauLivre = livres;
    });
  }

  onBack() {
    this.location.back();
  }

}
