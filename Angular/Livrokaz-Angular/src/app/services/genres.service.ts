import { Injectable } from '@angular/core';
import { Genre } from '../Model/genre';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private availableGenres: Genre[];

  availableGenres$: BehaviorSubject<Genre[]> = new BehaviorSubject(this.availableGenres);

  constructor(private httpClient: HttpClient) {}

  private getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>('http://localhost:8080/api/genres');
  }

  public publishGenres() {
    this.getGenres().subscribe(
      genresList => {
        this.availableGenres = genresList;
        this.availableGenres$.next(this.availableGenres);
      }
    );
  }

  /**
   * Cette fonction permet de trouver un genre dans la liste des genres chargés par l'application
   * grâce à son ID.
   * @param genreId l'id qu'il faut rechercher dans la liste.
   */
  public findGenre(genreId: number): Observable<Genre> {
    if (genreId) {
      if (!this.availableGenres) {
        return this.getGenres().pipe(map(genres => genres.find(genre => genre.idGenre === genreId)));
      }
      return of(this.availableGenres.find(genre => genre.idGenre === genreId));
    } else {
      return of(new Genre(0, ''));
    }
  }

  /**
   * Fonction de création d'un nouveau genre.
   * Elle met à jour notre liste de genres et notre liste observable.
   * @param newGenre le nouveau genre à créer
   */
  public createGenre(newGenre: Genre) {
    this.httpClient.post<Genre>('http://localhost:8080/api/genres', newGenre).subscribe(
      nouveauGenre => {
        this.availableGenres.push(nouveauGenre);
        this.availableGenres$.next(this.availableGenres);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un genre
   * @param genre le genre à mettre à jour
   */
  public updateGenre(genre: Genre) {
    this.httpClient.put<Genre>('http://localhost:8080/api/genres/' + genre.idGenre, genre).subscribe(
      updatedGenre => {
        this.availableGenres.splice(this.availableGenres.indexOf(genre), 1, genre);
        this.availableGenres$.next(this.availableGenres);
      }
    );
  }

  /**
   * Fonction de suppression d'un genre
   * @param id id du genre à supprimer
   */
  public deleteGenre(id: number) {
    this.httpClient.delete<Genre>('http://localhost:8080/api/genres/' + id).subscribe(
      deleteGenre => {
        this.availableGenres.splice(this.availableGenres.indexOf(this.availableGenres.find(genre => genre.idGenre === id)), 1);
        this.availableGenres$.next(this.availableGenres);
      }
    );
  }

}
