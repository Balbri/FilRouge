import { Injectable } from '@angular/core';
import { Langue } from '../Model/langue';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguesService {

  private availableLangues: Langue[];

  availableLangues$: BehaviorSubject<Langue[]> = new BehaviorSubject(this.availableLangues);

  constructor(private httpClient: HttpClient) {}

  private getLangues(): Observable<Langue[]> {
    return this.httpClient.get<Langue[]>('http://localhost:8080/api/langues');
  }

  public publishLangues() {
    this.getLangues().subscribe(
      languesList => {
        this.availableLangues = languesList;
        this.availableLangues$.next(this.availableLangues);
      }
    );
  }

  /**
   * Cette fonction permet de trouver une langue dans la liste des langues chargées par l'application
   * grâce à son ID.
   * @param langueId l'id qu'il faut rechercher dans la liste.
   */
  public findLangue(langueId: number): Observable<Langue> {
    if (langueId) {
      if (!this.availableLangues) {
        return this.getLangues().pipe(map(langues => langues.find(langue => langue.idLangue === langueId)));
      }
      return of(this.availableLangues.find(langue => langue.idLangue === langueId));
    } else {
      return of(new Langue(0, ''));
    }
  }

  /**
   * Fonction de création d'une nouvelle langue.
   * Elle met à jour notre liste de langues et notre liste observable.
   * @param newLangue la nouvelle langue à créer
   */
  public createLangue(newLangue: Langue) {
    this.httpClient.post<Langue>('http://localhost:8080/api/langues', newLangue).subscribe(
      nouvelleLangue => {
        this.availableLangues.push(nouvelleLangue);
        this.availableLangues$.next(this.availableLangues);
      }
    );
  }

  /**
   * Fonction de mise à jour d'une langue
   * @param langue la langue à mettre à jour
   */
  public updateLangue(langue: Langue) {
    this.httpClient.put<Langue>('http://localhost:8080/api/langues/' + langue.idLangue, langue).subscribe(
      updatedLangue => {
        this.availableLangues.splice(this.availableLangues.indexOf(langue), 1, langue);
        this.availableLangues$.next(this.availableLangues);
      }
    );
  }

  /**
   * Fonction de suppression d'une langue
   * @param id id de la langue à supprimer
   */
  public deleteLangue(id: number) {
    this.httpClient.delete<Langue>('http://localhost:8080/api/langues/' + id).subscribe(
      deleteLangue => {
        this.availableLangues.splice(this.availableLangues.indexOf(this.availableLangues.find(langue => langue.idLangue === id)), 1);
        this.availableLangues$.next(this.availableLangues);
      }
    );
  }

}
