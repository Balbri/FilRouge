import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSort, MatPaginator } from '@angular/material';
import { Livre } from '../Model/livre';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LivresService } from '../services/livres.service';

@Component({
  selector: 'app-gestion-livres',
  templateUrl: './gestion-livres.component.html',
  styleUrls: ['./gestion-livres.component.css']
})
export class GestionLivresComponent implements OnInit {

  displayedColumns: string[] = ['select', 'titre', 'annee', 'prixNeuf', 'prixOccas', 'stock'];
  dataSource = new MatTableDataSource<Livre>();
  selection = new SelectionModel<Livre>(false, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  livresList: BehaviorSubject<Livre[]>;

  constructor(private livresService: LivresService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.livresList = this.livresService.availableLivres$;
    this.livresList.subscribe(livres => this.dataSource = new MatTableDataSource<Livre>(livres));
  }

  onEdit(selected: Livre[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/livres/edition/' + selected[0].idLivre]);
    }
  }

  onDelete(selected: Livre[]) {
    if (selected.length !== 0) {
      this.livresService.deleteLivre(selected[0].idLivre);
    }
  }

}
