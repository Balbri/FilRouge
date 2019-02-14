import { Component, OnInit } from '@angular/core';
import { Livre } from '../Model/livre';
import { ActivatedRoute } from '@angular/router';
import { DatasService } from '../services/datas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-livre-detail',
  templateUrl: './livre-detail.component.html',
  styleUrls: ['./livre-detail.component.css']
})
export class LivreDetailComponent implements OnInit {

  id: number;
  titre = '"Détails de "+{{Livre.titreLivre}}';
  displayedLivre: Livre;
  etatStock = "Moins de 10 articles en stock, dépêchez-vous !"

  constructor(
    private route: ActivatedRoute,
    private dataService: DatasService,
    private location: Location) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.getLivreById(this.id);
  }

  getLivreById(id: number): void {
    this.dataService.findLivre(id).subscribe(livre => this.displayedLivre = livre);
    if(this.displayedLivre.stock>10){
      this.etatStock = "Disponible";
    }
  }

  onBack() {
    this.location.back();
  }

}
