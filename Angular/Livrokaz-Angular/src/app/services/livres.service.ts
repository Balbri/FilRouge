import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Livre } from '../Model/livre';
import { map } from 'rxjs/operators';
import { Langue } from '../Model/langue';
import { Editeur } from '../Model/editeur';
import { Genre } from '../Model/genre';
import { Auteur } from '../Model/auteur';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class LivresService {

  // La liste des livres de l'application
  private availableLivres: Livre[];
  private searchText ="";
  private filteredBooks: Livre[];
  

  // La liste observable que l'on rend visible partout dans l'application
  availableLivres$: BehaviorSubject<Livre[]> = new BehaviorSubject(this.availableLivres);
  filteredBooks$: BehaviorSubject<Livre[]> = new BehaviorSubject(this.filteredBooks);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  getLangues(): Observable<Langue[]> {
    return this.httpClient.get<Langue[]>('http://localhost:8080/api/langues');
  }

  getEditeurs(): Observable<Editeur[]> {
    return this.httpClient.get<Editeur[]>('http://localhost:8080/api/editeurs');
  }

  getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>('http://localhost:8080/api/genres');
  }

  getAuteurs(): Observable<Auteur[]> {
    return this.httpClient.get<Auteur[]>('http://localhost:8080/api/auteurs');
  }

  /**
   * La fonction getLivres() est privée car elle n'a besoin d'être appellée que dans le service.
   */
  private getLivres(): Observable<Livre[]> {
    return this.httpClient.get<Livre[]>('http://localhost:8080/api/livres');
  }

  /**
   * La fonction getFilteredLivres() est privée et permet d'obtenir une liste filtrée par l'utilisateur (par genre, titre, et auteur)
   */
  private getFilteredLivres(): Observable<Livre[]> {
    return this.httpClient.get<Livre[]>('http://localhost:8080/api/livres/search/'+ this.searchText);
  }

  /**
   * La fonction publishLivres() est chargée une fois au démarrage de l'application.
   * Elle récupère la liste des livres depuis la base de données et met à jour la liste et la liste observable.
   */
  public publishLivres() {
    this.getLivres().subscribe(
      livresList => {
        this.availableLivres = livresList;
        this.availableLivres$.next(this.availableLivres);
      }
    );
  }

  /**
   * La fonction getFilteredLivres() récupère la liste des livres correspondant à la recherche effectuée par l'utilisateur via le champs de recherche
   */
  public publishFilteredLivres() {
    this.getFilteredLivres().subscribe(
      filteredList => {
      this.filteredBooks = filteredList;
      this.filteredBooks$.next(this.filteredBooks);
    }
    );
  }

  /**
   * Cette fonction permet de trouver un livre dans la liste des livres chargés par l'application
   * grâce à son ID.
   * @param livreId l'id qu'il faut rechercher dans la liste.
   */
  public findLivre(livreId: number): Observable<Livre> {
    if (livreId) {
      if (!this.availableLivres) {
        return this.getLivres().pipe(map(livres => livres.find(livre => livre.idLivre === livreId)));
      }
      return of(this.availableLivres.find(livre => livre.idLivre === livreId));
    } else {
      return of(new Livre(0, '', '', '', '', '', 0, 0, 0, null, null, 0, null, null, null));
    }
  }

  /**
   * Fonction de création d'un nouveau livre.
   * Elle met à jour notre liste de livres et notre liste observable.
   * @param newLivre le nouveau livre à créer
   */
  public createLivre(newLivre: Livre) {
    this.httpClient.post<Livre>('http://localhost:8080/api/livres', newLivre).subscribe(
      nouveauLivre => {
        this.availableLivres.push(nouveauLivre);
        this.availableLivres$.next(this.availableLivres);
      },
      error => {
        // popu-up erreur
        this.snackBar.open('Le livre n\'a pas pu être créé', 'ERREUR', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Fonction de mise à jour d'un livre
   * @param livre le livre à mettre à jour
   */
  public updateLivre(livre: Livre) {
    this.httpClient.put<Livre>('http://localhost:8080/api/livres/' + livre.idLivre, livre).subscribe(
      updatedLivre => {
        this.availableLivres.splice(this.availableLivres.indexOf(livre), 1, livre);
        this.availableLivres$.next(this.availableLivres);
      }
    );
  }

  /**
   * Fonction de suppression d'un livre
   * @param id id du livre à supprimer
   */
  public deleteLivre(id: number) {
    this.httpClient.delete<Livre>('http://localhost:8080/api/livres/' + id).subscribe(
      deleteLivre => {
        this.availableLivres.splice(this.availableLivres.indexOf(this.availableLivres.find(livre => livre.idLivre === id)), 1);
        this.availableLivres$.next(this.availableLivres);
        // pop-up suppression
        this.snackBar.open(deleteLivre.titreLivre, 'Supprimé', {
          duration: 2000,
        });
      }
    );
  }
}
