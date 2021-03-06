import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar, PageEvent, MatPaginator, Sort } from '@angular/material';
import { Langue } from '../Model/langue';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { LanguesService } from '../services/langues.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-langues',
  templateUrl: './gestion-langues.component.html',
  styleUrls: ['./gestion-langues.component.css']
})
export class GestionLanguesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'idLangue', 'nomLangue'];
  dataSource = new MatTableDataSource<Langue>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Langue>(false, []);

  languesList: BehaviorSubject<Langue[]>;

  constructor(private languesService: LanguesService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.languesList = this.languesService.availableLangues$;
    this.languesList.subscribe(langues => this.dataSource = new MatTableDataSource<Langue>(langues));
  }

  onEdit(selected: Langue[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/langues/edition/' + selected[0].idLangue]);
    }
  }

  onDelete(selected: Langue[]) {
    if (selected.length !== 0) {
      this.languesService.deleteLangue(selected[0].idLangue);
    }
  }

}
