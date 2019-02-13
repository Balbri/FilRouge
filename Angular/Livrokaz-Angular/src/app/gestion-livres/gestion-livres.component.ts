import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Livre } from '../Model/livre';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { DatasService } from '../services/datas.service';

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

  constructor(private datasService: DatasService) { }

  ngOnInit() {
    this.livresList = this.datasService.availableLivres$;
    this.livresList.subscribe(livres => this.dataSource = new MatTableDataSource<Livre>(livres));
    console.log(this.livresList);
  }

  onEdit() {
  }

  onDelete() {
  }

}
