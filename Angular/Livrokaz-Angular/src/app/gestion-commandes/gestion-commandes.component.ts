import { Component, OnInit, ViewChild } from '@angular/core';
import { Commande } from '../Model/commande';
import { LigneDeCommande } from '../Model/lignedeCommande';
import { Livre } from '../Model/livre';
import { CommandesService } from '../services/commandes.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-commandes',
  templateUrl: './gestion-commandes.component.html',
  styleUrls: ['./gestion-commandes.component.css']
})
export class GestionCommandesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'idCommande', 'date', 'client', 'nbreArticles', 'fraisDePort', 'TVA', 'TTC', 'Total', 'valide'];
  dataSource = new MatTableDataSource<Commande>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Commande>(false, []);

  commandesList: BehaviorSubject<Commande[]>;

  constructor(private commandesService: CommandesService,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.commandesList = this.commandesService.availableCommandes$;
    this.commandesList.subscribe(commandes => {
      this.dataSource = new MatTableDataSource<Commande>(commandes);
    });
  }

  onEdit(selected: Commande[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/commandes/edition/' + selected[0].idCommande]);
    }
  }

  onDelete(selected: Commande[]) {
    if (selected.length !== 0) {
      // suppression du client
      this.commandesService.deleteCommande(selected[0].idCommande);
      this.selection = new SelectionModel<Commande>(false, []);
    }
  }

}
