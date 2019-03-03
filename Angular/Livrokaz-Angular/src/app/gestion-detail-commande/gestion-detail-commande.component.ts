import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandesService } from '../services/commandes.service';
import { Client } from '../Model/client';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { LigneDeCommande } from '../Model/lignedeCommande';
import { Location } from '@angular/common';
import { LignesDeCommandeService } from '../services/lignes-de-commande.service';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../Model/commande';

@Component({
  selector: 'app-gestion-detail-commande',
  templateUrl: './gestion-detail-commande.component.html',
  styleUrls: ['./gestion-detail-commande.component.css']
})
export class GestionDetailCommandeComponent implements OnInit {

  id: number;
  commande: Commande = new Commande(0, new Date(), 0, 0, 0, 0, 0, 0, new Client(0, '', '', 0, '', '', 0, '', 0, '', '', 0, '', '', null));

  displayedColumns: string[] = ['select', 'livre', 'quantite', 'prix', 'total'];
  dataSource = new MatTableDataSource<LigneDeCommande>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<LigneDeCommande>(false, []);

  lignesCommandesList: BehaviorSubject<LigneDeCommande[]>;
  commandeList: BehaviorSubject<Commande[]>;

  constructor(private route: ActivatedRoute,
              private lignesDeCommandeService: LignesDeCommandeService,
              private commandeService: CommandesService,
              private location: Location,
              private router: Router) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.getCommandeById(this.id);
    this.getLdcByIdCommande(this.id);
    // mise à jour automagique du texte de la commande
    this.commandeList = this.commandeService.availableCommandes$;
    this.commandeList.subscribe(commandes => {
      this.commande = commandes.find(commande => commande.idCommande === this.id);
    });
    // mise à jour automagique du tableau
    this.lignesCommandesList = this.lignesDeCommandeService.availableLigneDeCommandes$;
    this.lignesCommandesList.subscribe(ldcs => {
      this.dataSource = new MatTableDataSource<LigneDeCommande>(ldcs.filter(ldc => ldc.commande.idCommande === this.id));
    });
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  getCommandeById(id: number) {
    this.commandeService.findCommande(id).subscribe(commande => {
      this.commande = commande;
    });
  }

  getLdcByIdCommande(idCommande: number) {
    this.lignesDeCommandeService.findLdcByIdCommande(idCommande).subscribe(lignes => {
      this.dataSource = new MatTableDataSource<LigneDeCommande>(lignes);
    });
  }

  onEdit(selected: LigneDeCommande[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/ligneDeCommande/edition/' + selected[0].idLigneCommande]);
    }
  }

  onDelete(selected: LigneDeCommande[]) {
    if (selected.length !== 0) {
      this.lignesDeCommandeService.deleteLigneDeCommande(selected[0].idLigneCommande);
    }
  }

  onBack() {
    this.location.back();
  }

}
