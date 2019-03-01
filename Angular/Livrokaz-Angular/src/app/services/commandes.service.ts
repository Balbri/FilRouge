import { Injectable } from '@angular/core';
import { Commande } from '../Model/commande';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private availableCommandes: Commande[];

  availableCommandes$: BehaviorSubject<Commande[]> = new BehaviorSubject(this.availableCommandes);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  private getCommandes(): Observable<Commande[]> {
    return this.httpClient.get<Commande[]>('http://localhost:8080/api/commandes');
  }

  public publishCommandes() {
    this.getCommandes().subscribe(
      commandesList => {
        this.availableCommandes = commandesList;
        this.availableCommandes$.next(this.availableCommandes);
      }
    );
  }

  /**
   * Cette fonction permet de trouver une commande dans la liste des commandes chargées par l'application
   * grâce à son ID.
   * @param commandeId l'id qu'il faut rechercher dans la liste.
   */
  public findCommande(commandeId: number): Observable<Commande> {
    if (commandeId) {
      if (!this.availableCommandes) {
        return this.getCommandes().pipe(map(commandes => commandes.find(commande => commande.idCommande === commandeId)));
      }
      return of(this.availableCommandes.find(commande => commande.idCommande === commandeId));
    } else {
      return of(new Commande(0, new Date(), 0, 0, 0, 0, 0, 0, null, null));
    }
  }

  /**
   * Fonction de création d'une nouvelle commande.
   * Elle met à jour notre liste de commandes et notre liste observable.
   * @param newCommande la nouvelle commande à créer
   */
  public createCommande(newCommande: Commande) {
    this.httpClient.post<Commande>('http://localhost:8080/api/commandes', newCommande).subscribe(
      nouvelleCommande => {
        console.log(nouvelleCommande);
        this.availableCommandes.push(nouvelleCommande);
        this.availableCommandes$.next(this.availableCommandes);
      }
    );
  }

  /**
   * Fonction de mise à jour d'une commande
   * @param commande la commande à mettre à jour
   */
  public updateCommande(commande: Commande) {
    this.httpClient.put<Commande>('http://localhost:8080/api/commandes/' + commande.idCommande, commande).subscribe(
      updatedCommande => {
        this.availableCommandes.splice(this.availableCommandes.indexOf(commande), 1, commande);
        this.availableCommandes$.next(this.availableCommandes);
      }
    );
  }

  /**
   * Fonction de suppression d'une commande
   * @param id id de la commande à supprimer
   */
  public deleteCommande(id: number) {
    this.httpClient.delete<Commande>('http://localhost:8080/api/commandes/' + id).subscribe(
      deleteCommande => {
        this.availableCommandes.splice(this.availableCommandes.indexOf(this.availableCommandes.find(
                                                                        commande => commande.idCommande === id)), 1);
        this.availableCommandes$.next(this.availableCommandes);
        // pop-up suppression
        this.snackBar.open('Commande n° ' + id, 'Supprimé', {
          duration: 2000,
        });
      }
    );
  }

}
