import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LigneDeCommande } from '../Model/lignedeCommande';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CommandesService } from './commandes.service';

@Injectable({
  providedIn: 'root'
})
export class LignesDeCommandeService {

  private availableLigneDeCommandes: LigneDeCommande[];

  availableLigneDeCommandes$: BehaviorSubject<LigneDeCommande[]> = new BehaviorSubject(this.availableLigneDeCommandes);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
              private commandesService: CommandesService) {}

  private getLigneDeCommandes(): Observable<LigneDeCommande[]> {
    return this.httpClient.get<LigneDeCommande[]>('http://localhost:8080/api/ldc');
  }

  public publishLigneDeCommandes() {
    this.getLigneDeCommandes().subscribe(
      ligneDeCommandesList => {
        this.availableLigneDeCommandes = ligneDeCommandesList;
        this.availableLigneDeCommandes$.next(this.availableLigneDeCommandes);
      }
    );
  }

  /**
   * Cette fonction permet de trouver une ligneDeCommande dans la liste des ligneDeCommandes chargées par l'application
   * grâce à son ID.
   * @param ligneDeCommandeId l'id qu'il faut rechercher dans la liste.
   */
  public findLigneDeCommande(ligneDeCommandeId: number): Observable<LigneDeCommande> {
    if (ligneDeCommandeId) {
      if (!this.availableLigneDeCommandes) {
        return this.getLigneDeCommandes().pipe(map(ligneDeCommandes => ligneDeCommandes.find(
                                              ligneDeCommande => ligneDeCommande.idLigneCommande === ligneDeCommandeId)));
      }
      return of(this.availableLigneDeCommandes.find(ligneDeCommande => ligneDeCommande.idLigneCommande === ligneDeCommandeId));
    } else {
      return of(new LigneDeCommande(0, 0, null, null));
    }
  }

   /**
   * Cette fonction permet de trouver les lignesDeCommande dans la liste des ligneDeCommandes chargées par l'application
   * grâce à l'ID de la commande.
   * @param CommandeId l'id qu'il faut rechercher dans la liste.
   */
  public findLdcByIdCommande(CommandeId: number): Observable<LigneDeCommande[]> {
    if (CommandeId) {
      if (!this.availableLigneDeCommandes) {
        return this.getLigneDeCommandes().pipe(map(ligneDeCommandes => ligneDeCommandes.filter(
                                              ligneDeCommande => ligneDeCommande.commande.idCommande === CommandeId)));
      }
      return of(this.availableLigneDeCommandes.filter(ligneDeCommande => ligneDeCommande.commande.idCommande === CommandeId));
    } else {
      return of([new LigneDeCommande(0, 0, null, null)]);
    }
  }

  /**
   * Fonction de création d'une nouvelle ligneDeCommande.
   * Elle met à jour notre liste de ligneDeCommandes et notre liste observable.
   * @param newLigneDeCommande la nouvelle ligneDeCommande à créer
   */
  public createLdc(newLigneDeCommande: LigneDeCommande) {
    this.httpClient.post<LigneDeCommande>('http://localhost:8080/api/ldc', newLigneDeCommande).subscribe(
      nouvelleLigneDeCommande => {
        this.availableLigneDeCommandes.push(nouvelleLigneDeCommande);
        this.availableLigneDeCommandes$.next(this.availableLigneDeCommandes);
        // mise à jour de la commande
        this.commandesService.updateCommande(newLigneDeCommande.commande);
      }
    );
  }

  /**
   * Fonction de mise à jour d'une ligneDeCommande
   * @param ligneDeCommande la ligneDeCommande à mettre à jour
   */
  public updateLigneDeCommande(ligneDeCommande: LigneDeCommande) {
    this.httpClient.put<LigneDeCommande>('http://localhost:8080/api/ldc/' + ligneDeCommande.idLigneCommande, ligneDeCommande).subscribe(
      updatedLigneDeCommande => {
        this.availableLigneDeCommandes.splice(this.availableLigneDeCommandes.indexOf(ligneDeCommande), 1, updatedLigneDeCommande);
        this.availableLigneDeCommandes$.next(this.availableLigneDeCommandes);
        // mise à jour de la commande
        this.commandesService.updateCommande(updatedLigneDeCommande.commande);
      }
    );
  }

  /**
   * Fonction de suppression d'une ligneDeCommande
   * @param id id de la ligneDeCommande à supprimer
   */
  public deleteLigneDeCommande(id: number) {
    this.httpClient.delete<LigneDeCommande>('http://localhost:8080/api/ldc/' + id).subscribe(
      deleteLigneDeCommande => {
        this.availableLigneDeCommandes.splice(this.availableLigneDeCommandes.indexOf(this.availableLigneDeCommandes.find(
                                                ligneDeCommande => ligneDeCommande.idLigneCommande === id)), 1);
        this.availableLigneDeCommandes$.next(this.availableLigneDeCommandes);
        // mise à jour de la commande
        this.commandesService.updateCommande(deleteLigneDeCommande.commande);
        // pop-up suppression
        this.snackBar.open('Ligne de commande', 'Supprimé', {
          duration: 2000,
        });
      }
    );
  }

}
