import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class Livre { //////////// à jarter !
  constructor() {}
}

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
      });
  }
}
