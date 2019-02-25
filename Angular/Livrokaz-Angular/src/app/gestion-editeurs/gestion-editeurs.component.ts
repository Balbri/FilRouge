import { Component, OnInit, ViewChild } from '@angular/core';
import { Editeur } from '../Model/editeur';
import { MatTableDataSource, MatSort, MatSnackBar, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { EditeursService } from '../services/editeurs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-editeurs',
  templateUrl: './gestion-editeurs.component.html',
  styleUrls: ['./gestion-editeurs.component.css']
})
export class GestionEditeursComponent implements OnInit {

  displayedColumns: string[] = ['select', 'idEditeur', 'nomEditeur'];
  dataSource = new MatTableDataSource<Editeur>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Editeur>(false, []);

  editeursList: BehaviorSubject<Editeur[]>;

  constructor(private editeursService: EditeursService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.editeursList = this.editeursService.availableEditeurs$;
    this.editeursList.subscribe(editeurs => this.dataSource = new MatTableDataSource<Editeur>(editeurs));
  }

  onEdit(selected: Editeur[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/editeurs/edition/' + selected[0].idEditeur]);
    }
  }

  onDelete(selected: Editeur[]) {
    if (selected.length !== 0) {
      this.editeursService.deleteEditeur(selected[0].idEditeur);
    }
  }

}
