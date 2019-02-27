import { Injectable } from '@angular/core';
import { Client } from '../Model/client';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private availableClients: Client[];

  availableClients$: BehaviorSubject<Client[]> = new BehaviorSubject(this.availableClients);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  private getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>('http://localhost:8080/api/admin/clients');
  }

  public publishClients() {
    this.getClients().subscribe(
      clientsList => {
        this.availableClients = clientsList;
        this.availableClients$.next(this.availableClients);
      }
    );
  }

  /**
   * Cette fonction permet de trouver un client dans la liste des clients chargés par l'application
   * grâce à son ID.
   * @param clientId l'id qu'il faut rechercher dans la liste.
   */
  public findClient(clientId: number): Observable<Client> {
    if (clientId) {
      if (!this.availableClients) {
        return this.getClients().pipe(map(clients => clients.find(client => client.idClient === clientId)));
      }
      return of(this.availableClients.find(client => client.idClient === clientId));
    } else {
      return of(new Client(0, '', '', 0, '', '', 0, '', 0, '', '', 0, '', '', null));
    }
  }

  /**
   * Fonction de création d'un nouveau client.
   * Elle met à jour notre liste de clients et notre liste observable.
   * @param newClients le nouveau client à créer
   */
  public createClient(newClient: Client) {
    this.httpClient.post<Client>('http://localhost:8080/api/admin/clients', newClient).subscribe(
      nouveauClient => {
        this.availableClients.push(nouveauClient);
        this.availableClients$.next(this.availableClients);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un client
   * @param client le client à mettre à jour
   */
  public updateClient(client: Client) {
    this.httpClient.put<Client>('http://localhost:8080/api/admin/clients/' + client.idClient, client).subscribe(
      updatedClient => {
        this.availableClients.splice(this.availableClients.indexOf(client), 1, updatedClient);
        this.availableClients$.next(this.availableClients);
      },
      error => {
        // popu-up erreur
        this.snackBar.open('Le client n\'a pas pu être mis à jour', 'ERREUR', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Fonction de suppression d'un client
   * @param id id du client à supprimer
   */
  public deleteClient(idClient: number) {
    this.httpClient.delete<Client>('http://localhost:8080/api/admin/clients/' + idClient).subscribe(
      deleteClient => {
        this.availableClients.splice(this.availableClients.indexOf(this.availableClients.find(client => client.idClient === idClient)), 1);
        this.availableClients$.next(this.availableClients);
        // pop-up suppression
        this.snackBar.open(deleteClient.nomClient, 'Supprimé', {
          duration: 2000,
        });
      }
    );
  }
}
