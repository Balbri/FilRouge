import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommandesService } from '../services/commandes.service';
import { LoginService } from '../services/login.service';
import { Commande } from '../Model/commande';
import { LignesDeCommandeService } from '../services/lignes-de-commande.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LigneDeCommande } from '../Model/lignedeCommande';
import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  userName: BehaviorSubject<string>;
  panier: Commande;

  displayedColumns: string[] = ['select', 'livre', 'quantite', 'prix', 'total'];
  dataSource = new MatTableDataSource<LigneDeCommande>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<LigneDeCommande>(false, []);

  lignesCommandesList: BehaviorSubject<LigneDeCommande[]>;
  commandeList: BehaviorSubject<Commande[]>;

  constructor(private commandeService: CommandesService,
              private loginService: LoginService,
              private lignesDeCommandeService: LignesDeCommandeService,
              private location: Location,
              private router: Router) {}

  ngOnInit() {
    this.userName = this.loginService.userName;
    // mise à jour automagique du texte du panier
    this.commandeList = this.commandeService.availableCommandes$;
    this.commandeList.subscribe(commandes => {
      this.panier = commandes.filter(commands => commands.client.users.username === this.userName.value)
                              .find(commande => commande.valide === 0);
    });
    // mise à jour automagique du tableau
    this.lignesCommandesList = this.lignesDeCommandeService.availableLigneDeCommandes$;
    this.lignesCommandesList.subscribe(ldcs => {
      this.dataSource = new MatTableDataSource<LigneDeCommande>(ldcs.filter(ldc => ldc.commande.idCommande === this.panier.idCommande));
    });
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  onDelete(selected: LigneDeCommande[]) {
    if (selected.length !== 0) {
      this.lignesDeCommandeService.deleteLigneDeCommande(selected[0].idLigneCommande);
    }
  }

  onBuy() {
    this.router.navigate(['panier/achat/' + this.panier.idCommande]);
  }

  onBack() {
    this.location.back();
  }

}
