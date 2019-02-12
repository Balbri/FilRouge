import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Livre } from '../Model/livre';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatasService {

  // La liste des livres de l'application
  private availableLivres: Livre[];

  // La liste observable que l'on rend visible partout dans l'application
  availableLivres$: BehaviorSubject<Livre[]> = new BehaviorSubject(this.availableLivres);

  constructor(private httpClient: HttpClient) {}

  /**
   * La fonction getLivres() est privée car elle n'a besoin d'être appellée que dans le service.
   */
  private getLivres(): Observable<Livre[]> {
    return this.httpClient.get<Livre[]>('http://localhost:8080/api/livres');
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
      return of(new Livre(0, 0, '', '', '', '', 0, 0, 0, 0));
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
      }
    );
  }

  /**
   * Fonction de mise à jour d'un livre
   * @param livre le livre à mettre à jour
   */
  public updateLivre(livre: Livre) {
    this.httpClient.put<Livre>('http://localhost:8080/api/livres', livre).subscribe(
      updatedLivre => {
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
      }
    );
  }
}
