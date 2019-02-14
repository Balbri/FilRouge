import { Injectable } from '@angular/core';
import { Langue } from '../Model/langue';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
