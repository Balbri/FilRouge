import { Component, OnInit, ViewChild } from '@angular/core';
import { Genre } from '../Model/genre';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { GenresService } from '../services/genres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-genres',
  templateUrl: './gestion-genres.component.html',
  styleUrls: ['./gestion-genres.component.css']
})
export class GestionGenresComponent implements OnInit {

  displayedColumns: string[] = ['select', 'idGenre', 'nomGenre'];
  dataSource = new MatTableDataSource<Genre>();
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Genre>(false, []);

  genresList: BehaviorSubject<Genre[]>;

  constructor(private genresService: GenresService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.genresList = this.genresService.availableGenres$;
    this.genresList.subscribe(genres => this.dataSource = new MatTableDataSource<Genre>(genres));
  }

  onEdit(selected: Genre[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/genres/edition/' + selected[0].idGenre]);
    }
  }

  onDelete(selected: Genre[]) {
    if (selected.length !== 0) {
      this.genresService.deleteGenre(selected[0].idGenre);
      // popu-up suppression
      this.snackBar.open(selected[0].nomGenre, 'Supprimé', {
        duration: 2000,
      });
    }
  }

}
