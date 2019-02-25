import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
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

  livresList: BehaviorSubject<Livre[]>;

  constructor(private livresService: LivresService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.livresList = this.livresService.availableLivres$;
    this.livresList.subscribe(livres => this.dataSource = new MatTableDataSource<Livre>(livres));
    console.log(this.livresList);
  }

  onEdit(selected: Livre[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/livres/edition/' + selected[0].idLivre]);
    }
  }

  onDelete(selected: Livre[]) {
    if (selected.length !== 0) {
      this.livresService.deleteLivre(selected[0].idLivre);
      // popu-up suppression
      this.snackBar.open(selected[0].titreLivre, 'Supprimé', {
        duration: 2000,
      });
    }
  }

}
