import { Component, OnInit, ViewChild } from '@angular/core';
import { Genre } from '../Model/genre';
import { MatTableDataSource, MatSort, MatSnackBar, MatPaginator } from '@angular/material';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Genre>(false, []);

  genresList: BehaviorSubject<Genre[]>;

  constructor(private genresService: GenresService,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
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
    }
  }

}
