import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';

@Injectable({
  providedIn: 'root'
})
export class RecherchesService {

  private availableLivres: Livre[];

  availableLivres$: BehaviorSubject<Livre[]> = new BehaviorSubject(this.availableLivres);


  constructor(private httpClient: HttpClient) {}

   private getLivresBySearch(mot: string): Observable<Livre[]> {
    return this.httpClient.get<Livre[]>('http://localhost:8080/api/livres/search/' + mot);
  }

  public publishLivresSearch(mot: string) {
    this.getLivresBySearch(mot).subscribe(
      livresList => {
        this.availableLivres = livresList;
        this.availableLivres$.next(this.availableLivres);
      }
    );
  }
}
