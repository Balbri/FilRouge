import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../Model/commande';
import { CommandesService } from '../services/commandes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-ca',
  templateUrl: './gestion-ca.component.html',
  styleUrls: ['./gestion-ca.component.css']
})
export class GestionCaComponent implements OnInit {

  commandesList: BehaviorSubject<Commande[]>;
  CA = 0;
  dateDuJour = new Date();

  constructor(private commandesService: CommandesService,
              private location: Location) { }

  ngOnInit() {
    this.commandesList = this.commandesService.availableCommandes$;
    this.commandesList.subscribe(commandes => {
      this.getCAofThisMonth(commandes);
    });
  }

  getCAofThisMonth(commandes: Commande[]) {
    for (const commande of commandes) {
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === new Date().getMonth()) {
        this.CA += +commande.total;
      }
    }
  }

  onBack() {
    this.location.back();
  }

}
