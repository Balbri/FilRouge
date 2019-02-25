import { Injectable } from '@angular/core';
import { Auteur } from '../Model/auteur';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuteursService {

  private availableAuteurs: Auteur[];

  availableAuteurs$: BehaviorSubject<Auteur[]> = new BehaviorSubject(this.availableAuteurs);

  constructor(private httpClient: HttpClient) {}

  private getAuteurs(): Observable<Auteur[]> {
    return this.httpClient.get<Auteur[]>('http://localhost:8080/api/auteurs');
   
  }

  public publishAuteurs() {
    this.getAuteurs().subscribe(
        auteursList => {
        this.availableAuteurs = auteursList;
        this.availableAuteurs$.next(this.availableAuteurs);
      }
    );
  }

  /**
   * Cette fonction permet de trouver un Auteur dans la liste des auteurs chargées par l'application
   * grâce à son ID.
   * @param auteurId l'id qu'il faut rechercher dans la liste.
   */
  public findAuteur(auteurId: number): Observable<Auteur> {
    if (auteurId) {
      if (!this.availableAuteurs) {
        return this.getAuteurs().pipe(map(auteurs => auteurs.find(auteurs => auteurs.idAuteur === auteurId)));
      }
      return of(this.availableAuteurs.find(auteur => auteur.idAuteur === auteurId));
    } else {
      return of(new Auteur(0, '', ''));
    }
  }

  /**
   * Fonction de création d'un nouvel auteur.
   * Elle met à jour notre liste d'auteurs' et notre liste observable.
   * @param newAuteur le nouvel auteur à créer
   */
  public createAuteur(newAuteur: Auteur) {
    this.httpClient.post<Auteur>('http://localhost:8080/api/auteurs', newAuteur).subscribe(
      nouvelAuteur => {
        this.availableAuteurs.push(nouvelAuteur);
        this.availableAuteurs$.next(this.availableAuteurs);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un auteur
   * @param auteur l'auteur à mettre à jour
   */
  public updateAuteur(auteur: Auteur) {
    this.httpClient.put<Auteur>('http://localhost:8080/api/auteurs/' + auteur.idAuteur, auteur).subscribe(
      updatedAuteur => {
        this.availableAuteurs.splice(this.availableAuteurs.indexOf(auteur), 1, auteur);
        this.availableAuteurs$.next(this.availableAuteurs);
      }
    );
  }

  /**
   * Fonction de suppression d'un Auteur
   * @param id id de l'auteur' à supprimer
   */
  public deleteAuteur(id: number) {
    this.httpClient.delete<Auteur>('http://localhost:8080/api/auteurs/' + id).subscribe(
      deleteAuteur => {
        this.availableAuteurs.splice(this.availableAuteurs.indexOf(this.availableAuteurs.find(auteur => auteur.idAuteur === id)), 1);
        this.availableAuteurs$.next(this.availableAuteurs);
      }
    );
  }

}
