import { Injectable } from '@angular/core';
import { Editeur } from '../Model/editeur';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EditeursService {

  private availableEditeurs: Editeur[];

  availableEditeurs$: BehaviorSubject<Editeur[]> = new BehaviorSubject(this.availableEditeurs);

  constructor(private httpClient: HttpClient) {}

  private getEditeurs(): Observable<Editeur[]> {
    return this.httpClient.get<Editeur[]>('http://localhost:8080/api/editeurs');
  }

  public publishEditeurs() {
    this.getEditeurs().subscribe(
      editeursList => {
        this.availableEditeurs = editeursList;
        this.availableEditeurs$.next(this.availableEditeurs);
      }
      );
  }

  /**
   * Cette fonction permet de trouver un editeur dans la liste des editeurs chargés par l'application
   * grâce à son ID.
   * @param editeurId l'id qu'il faut rechercher dans la liste.
   */
  public findEditeur(editeurId: number): Observable<Editeur> {
    if (editeurId) {
      if (!this.availableEditeurs) {
        return this.getEditeurs().pipe(map(editeurs => editeurs.find(editeur => editeur.idEditeur === editeurId)));
      }
      return of(this.availableEditeurs.find(editeur => editeur.idEditeur === editeurId));
    } else {
      return of(new Editeur(0, ''));
    }
  }

  /**
   * Fonction de création d'un nouveau editeur.
   * Elle met à jour notre liste de editeurs et notre liste observable.
   * @param newEditeur le nouveau editeur à créer
   */
  public createEditeur(newEditeur: Editeur) {
    this.httpClient.post<Editeur>('http://localhost:8080/api/editeurs', newEditeur).subscribe(
      nouveauEditeur => {
        this.availableEditeurs.push(nouveauEditeur);
        this.availableEditeurs$.next(this.availableEditeurs);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un editeur
   * @param editeur le editeur à mettre à jour
   */
  public updateEditeur(editeur: Editeur) {
    this.httpClient.put<Editeur>('http://localhost:8080/api/editeurs/' + editeur.idEditeur, editeur).subscribe(
      updatedEditeur => {
        this.availableEditeurs.splice(this.availableEditeurs.indexOf(editeur), 1, editeur);
        this.availableEditeurs$.next(this.availableEditeurs);
      }
    );
  }

  /**
   * Fonction de suppression d'un editeur
   * @param id id du editeur à supprimer
   */
  public deleteEditeur(id: number) {
    this.httpClient.delete<Editeur>('http://localhost:8080/api/editeurs/' + id).subscribe(
      deleteEditeur => {
        this.availableEditeurs.splice(this.availableEditeurs.indexOf(this.availableEditeurs.find(editeur => editeur.idEditeur === id)), 1);
        this.availableEditeurs$.next(this.availableEditeurs);
      }
    );
  }

}
