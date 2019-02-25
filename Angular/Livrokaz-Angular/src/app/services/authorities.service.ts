import { Injectable } from '@angular/core';
import { Authorities } from '../Model/authorities';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesService {

  private availableAuthorities: Authorities[];

  availableAuthorities$: BehaviorSubject<Authorities[]> = new BehaviorSubject(this.availableAuthorities);

  constructor(private httpClient: HttpClient) {}

  public getAuthorities(): Observable<Authorities[]> {
    return this.httpClient.get<Authorities[]>('http://localhost:8080/api/admin/auths');
  }

  public publishAuthorities() {
    this.getAuthorities().subscribe(
      authoritiesList => {
        this.availableAuthorities = authoritiesList;
        this.availableAuthorities$.next(this.availableAuthorities);
      }
    );
  }

  /**
   * Cette fonction permet de trouver un role dans la liste des authorities chargés par l'application
   * grâce à son ID.
   * @param authorityId l'id qu'il faut rechercher dans la liste.
   */
  public findAuthority(authorityid: number): Observable<Authorities> {
    if (authorityid) {
      if (!this.availableAuthorities) {
        return this.getAuthorities().pipe(map(authorities => authorities.find(authority => authority.idAuth === authorityid)));
      }
      return of(this.availableAuthorities.find(authority => authority.idAuth === authorityid));
    } else {
      return of(new Authorities(0, '', ''));
    }
  }

  /**
   * Cette fonction permet de trouver un role dans la liste des authorities chargés par l'application
   * grâce au username associé.
   * @param username le username qu'il faut rechercher dans la liste.
   */
  public findAuthorityByUsername(username: string): Observable<Authorities> {
    if (username) {
      if (!this.availableAuthorities) {
        return this.getAuthorities().pipe(map(authorities => authorities.find(authority => authority.username === username)));
      }
      return of(this.availableAuthorities.find(authority => authority.username === username));
    } else {
      return of(new Authorities(0, '', ''));
    }
  }

  /**
   * Fonction de création d'un nouveau authority.
   * Elle met à jour notre liste de authorities et notre liste observable.
   * @param newAuthorities le nouveau authority à créer
   */
  public createAuthority(newAuthority: Authorities) {
    this.httpClient.post<Authorities>('http://localhost:8080/api/admin/auths', newAuthority).subscribe(
      nouveauAuthority => {
        this.availableAuthorities.push(nouveauAuthority);
        this.availableAuthorities$.next(this.availableAuthorities);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un authority
   * @param authority le authority à mettre à jour
   */
  public updateAuthority(authority: Authorities) {
    this.httpClient.put<Authorities>('http://localhost:8080/api/admin/auths/' + authority.idAuth, authority).subscribe(
      updatedAuthority => {
        this.availableAuthorities.splice(this.availableAuthorities.indexOf(authority), 1, authority);
        this.availableAuthorities$.next(this.availableAuthorities);
      }
    );
  }

  /**
   * Fonction de suppression d'un authority
   * @param id id du authority à supprimer
   */
  public deleteAuthority(authorityid: number) {
    this.httpClient.delete<Authorities>('http://localhost:8080/api/admin/auths/' + authorityid).subscribe(
      deleteAuthority => {
        this.availableAuthorities.splice(this.availableAuthorities.indexOf(
                                        this.availableAuthorities.find(authority => authority.idAuth === authorityid)), 1);
        this.availableAuthorities$.next(this.availableAuthorities);
      }
    );
  }
}
