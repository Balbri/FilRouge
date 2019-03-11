import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Commande } from '../Model/commande';
import { CommandesService } from '../services/commandes.service';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-gestion-ca',
  templateUrl: './gestion-ca.component.html',
  styleUrls: ['./gestion-ca.component.css']
})
export class GestionCaComponent implements OnInit {

  commandesList: BehaviorSubject<Commande[]>;
  CAduMois = 0;
  CAduMoisDernier = 0;
  CAduMoisDAvant = 0;
  CAduMoisMoinsTrois = 0;
  CAduMoisMoinsQuatre = 0;
  CAduMoisMoinsCinq = 0;
  moisActuel = new Date().getMonth();
  chart = [];
  mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor(private commandesService: CommandesService,
              private location: Location) { }

  ngOnInit() {
    this.commandesList = this.commandesService.availableCommandes$;
    this.commandesList.subscribe(commandes => {
      this.getCAofThisMonth(commandes);
      this.initChart();
    });
  }

  getCAofThisMonth(commandes: Commande[]) {
    for (const commande of commandes) {
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === this.moisActuel) {
        // rajouter dans la condition "si la commande a été validée"
        this.CAduMois += +commande.total;
      }
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === (this.moisActuel - 1)) {
        this.CAduMoisDernier += +commande.total;
      }
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === (this.moisActuel - 2)) {
        this.CAduMoisDAvant += +commande.total;
      }
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === (this.moisActuel - 3)) {
        this.CAduMoisMoinsTrois += +commande.total;
      }
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === (this.moisActuel - 4)) {
        this.CAduMoisMoinsQuatre += +commande.total;
      }
      if (commande.total !==  null && new Date(commande.date.toString()).getMonth() === (this.moisActuel - 5)) {
        this.CAduMoisMoinsCinq += +commande.total;
      }
    }
  }

  getMoisPrecedent(mois: number) {
    if (mois <= 0) {
      return mois + 11;
    } else {
      return mois - 1;
    }
  }

  // Création du graphique
  initChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [this.mois[this.getMoisPrecedent(this.moisActuel - 4)],
                this.mois[this.getMoisPrecedent(this.moisActuel - 3)],
                this.mois[this.getMoisPrecedent(this.moisActuel - 2)],
                this.mois[this.getMoisPrecedent(this.moisActuel - 1)],
                this.mois[this.getMoisPrecedent(this.moisActuel)],
                this.mois[this.moisActuel]],
        datasets: [
          {
          label: 'Chiffre d\'affaire',
          data: [this.CAduMoisMoinsCinq,
                this.CAduMoisMoinsQuatre,
                this.CAduMoisMoinsTrois,
                this.CAduMoisDAvant,
                this.CAduMoisDernier,
                this.CAduMois],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'black',
          fill: false,
          borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: '#000'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#000'
            }
          }]
        }
      }
    });
  }

  onBack() {
    this.location.back();
  }

}
