import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Auteur } from '../Model/auteur';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { AuteursService } from '../services/auteurs.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-gestion-auteurs',
  templateUrl: './gestion-auteurs.component.html',
  styleUrls: ['./gestion-auteurs.component.css']
})
export class GestionAuteursComponent implements OnInit {

  displayedColumns: string[] = ['select', 'idAuteur', 'nameAuteur', 'surnameAuteur'];
  dataSource = new MatTableDataSource<Auteur>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Auteur>(false, []);

  auteursList: BehaviorSubject<Auteur[]>;

  constructor(private auteursService: AuteursService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.auteursList = this.auteursService.availableAuteurs$;
    this.auteursList.subscribe(auteurs => this.dataSource = new MatTableDataSource<Auteur>(auteurs));
    console.log(this.auteursList);
  }

  onEdit(selected: Auteur[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/auteurs/edition/' + selected[0].idAuteur]);
    }
  }

  onDelete(selected: Auteur[]) {
    if (selected.length !== 0) {
      this.auteursService.deleteAuteur(selected[0].idAuteur);
    }
  }

}
