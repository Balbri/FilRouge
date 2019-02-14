import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Langue } from '../Model/langue';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-gestion-langues',
  templateUrl: './gestion-langues.component.html',
  styleUrls: ['./gestion-langues.component.css']
})
export class GestionLanguesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'idLangue', 'nomLangue'];
  dataSource = new MatTableDataSource<Langue>();
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Langue>(false, []);

  languesList: BehaviorSubject<Langue[]>;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  onEdit() {
  }

  onDelete() {
  }

}
