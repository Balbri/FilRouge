import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenresService } from '../services/genres.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../Model/genre';

@Component({
  selector: 'app-gestion-detail-genre',
  templateUrl: './gestion-detail-genre.component.html',
  styleUrls: ['./gestion-detail-genre.component.css']
})
export class GestionDetailGenreComponent implements OnInit {

  id: number;
  idDefault: number = null;
  genreForm: FormGroup;
  nomGenreInit = '';

  constructor(private genresService: GenresService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    if (this.id) {
      this.getGenreById(this.id);
    }
    this.initForm();
  }

  initForm() {
    this.genreForm = this.formBuilder.group({
      nomGenre: [this.nomGenreInit, Validators.required]
    });
  }

  getGenreById(id: number) {
    this.genresService.findGenre(id).subscribe(genre => {
      this.nomGenreInit = genre.nomGenre;
    });
  }

  onSave() {
    const formValue = this.genreForm.value;
    if (this.id) {
      this.idDefault = this.id;
    }
    const newGenre = new Genre(
      this.idDefault,
      formValue['nomGenre']
    );
    if (this.id) {
      this.genresService.updateGenre(newGenre);
    } else {
      this.genresService.createGenre(newGenre);
    }
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}
